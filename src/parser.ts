import * as ohm from 'ohm-js';

// Define the BanglaScript grammar
const banglaGrammar = `
  BanglaScript {
    Program = Statement*
    Statement = PrintStatement | VariableDeclaration | AssignmentStatement

    PrintStatement = "দেখাও" "(" outputString ")" ";"
    VariableDeclaration = VarKeyword VarType identifier "=" Expression ";"
    AssignmentStatement = identifier "=" Expression ";"

    VarKeyword = "ধরি" | "ধ্রুবক" | "চলক"
    VarType = "সংখ্যা" | "হাছামিছা" | "দড়ি" | "বিন্যাস" | "সংখ্যা_বিন্যাস" | "দড়ি_বিন্যাস"

    Expression = String | Number | Boolean | identifier
    String = "\\"" chars "\\""
    chars = (~"\\"" any)*
    Number = digit+ ("." digit+)?  -- withDecimal
       | digit+                -- withoutDecimal

    Boolean = "সত্য" | "মিথ্যা"

    identifier = letter (letter | digit)*
    outputString = "\\"" chars "\\"" -- string 
      | letter (letter | digit)* -- identifier
  }
`;

// Create the grammar and semantics
const BanglaScript = ohm.grammar(banglaGrammar);
const semantics = BanglaScript.createSemantics();

// Define the semantics of the grammar
semantics.addOperation('toTS()', {
  Program(statements) {
    return statements.children.map((s) => s.toTS()).join("\n");
  },

  Statement(stmt) {
    return stmt.toTS();
  },

  // PrintStatement now handles the outputString rule properly
  PrintStatement(_write, _openParen, str, _closeParen, _semicolon) {
    return `console.log(${str.toTS()});`;
  },

  // Handle outputString as either a string literal or an identifier
  outputString_string(_openQuote, chars, _closeQuote) {
    return `"${chars.sourceString}"`; // Preserve quotes for string output
  },
  outputString_identifier(firstChar, restChars) {
    return firstChar.sourceString + restChars.sourceString;
  },

  // String handling (keeping as it is)
  String(_open, chars, _close) {
    // Manually handling escaping here
    return `"${chars.sourceString.replace(/\\"/g, '"')}"`;
  },

  // Number with decimal
  Number_withDecimal(intPart, _dot, decimalPart) {
    return intPart.sourceString + "." + decimalPart.sourceString;
  },

  // Number without decimal
  Number_withoutDecimal(intPart) {
    return intPart.sourceString;
  },

  // Boolean handling
  Boolean(bool) {
    return bool.sourceString === "সত্য" ? "true" : "false";
  },

  // Identifier handling
  identifier(firstChar, restChars) {
    return firstChar.sourceString + restChars.sourceString;
  },

  // Handling characters in strings
  chars(chars) {
    return chars.sourceString;
  }
});

// Function to transpile BanglaScript to TypeScript
export default function transpileBanglaScript(code: string): string {
  const matchResult = BanglaScript.match(code);
  if (matchResult.failed()) {
    throw new Error("Syntax Error: " + matchResult.message);
  }
  return semantics(matchResult).toTS();
}
