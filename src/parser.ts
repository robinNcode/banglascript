import * as ohm from 'ohm-js';
import { transliterateBangla } from './utils/transliterate';

// Define the BanglaScript grammar
const banglaGrammar = `
  BanglaScript {
    Program = Statement*
    Statement = PrintStatement | VariableDeclaration

    PrintStatement = "দেখাও" "(" outputString ")" ";"
    VariableDeclaration = VarKeyword VarType (Identifier | BengaliIdentifier) "=" Expression ";"

    VarKeyword = "ধরি" | "ধ্রুবক" | "চলক"
    VarType = "সংখ্যা" | "হাছামিছা" | "দড়ি" | "বিন্যাস" | "সংখ্যা_বিন্যাস" | "দড়ি_বিন্যাস"
    Expression = String | Number | Boolean | Identifier | BengaliIdentifier

    String = "\\"" (~"\\"" any)* "\\""
    Number = digit+ ("." digit+)?  -- withDecimal
           | digit+                -- withoutDecimal
    Boolean = "সত্য" | "মিথ্যা"

    outputString = String | Identifier | BengaliIdentifier
    Identifier = letter (letter | digit)*
    BengaliIdentifier = bengaliLetters (bengaliLetters | bengaliDigit | "_")*

    bengaliLetters = "অ" | "আ" | "ই" | "ঈ" | "উ" | "ঊ" | "ঋ" | "এ" | "ঐ" | "ও" | "ঔ" | "ক" | "খ" | "গ" | "ঘ" | "ঙ" | "চ" | "ছ" | "জ" | "ঝ" | "ঞ" 
                   | "ট" | "ঠ" | "ড" | "ঢ" | "ণ" | "ত" | "থ" | "দ" | "ধ" | "ন" | "প" | "ফ" | "ব" | "ভ" | "ম" | "য" | "র" | "ল" | "শ" | "ষ" 
                   | "স" | "হ" | "ক্ষ" | "ড়" | "ঢ়" | "য়" | "ৄ" | "ৢ" | "ৣ" | "ৎ" | "ং" | "ঃ" | "ঁ" | "ঽ" | "অঁ"
    bengaliDigit = "০" | "১" | "২" | "৩" | "৪" | "৫" | "৬" | "৭" | "৮" | "৯"

    space := " " | "\\t" | "\\n" | "\\r"
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

  PrintStatement(_write, _openParen, str, _closeParen, _semicolon) {
    return `console.log(${str.toTS()});`;
  },

  VariableDeclaration(varKeyword, varType, id, _eq, expr, _semicolon) {
    const jsKeyword = {
      "ধরি": "let",
      "ধ্রুবক": "const",
      "চলক": "var"
    }[varKeyword.sourceString];

    const jsType = {
      "সংখ্যা": "number",
      "হাছামিছা": "boolean",
      "দড়ি": "string",
      "বিন্যাস": "any[]",
      "সংখ্যা_বিন্যাস": "number[]",
      "দড়ি_বিন্যাস": "string[]"
    }[varType.sourceString];

    // Check if the identifier is Bengali or not
    const tsVarName = transliterateBangla(id.sourceString);
    const tsExpr = expr.toTS();

    return `${jsKeyword} ${tsVarName}: ${jsType} = ${tsExpr};`;
  },

  StringLiteral(_openQuote, chars, _closeQuote) {
    return `"${chars.sourceString}"`; // Preserve quotes for string literals
  },

  Identifier(firstChar, restChars) {
    return transliterateBangla(firstChar.sourceString + restChars.sourceString);
  },

  BengaliIdentifier(firstChar, restChars) {
    return transliterateBangla(firstChar.sourceString + restChars.sourceString);
  },

  Number_withDecimal(intPart, _dot, decimalPart) {
    return intPart.sourceString + "." + decimalPart.sourceString;
  },

  Number_withoutDecimal(intPart) {
    return intPart.sourceString;
  },

  Boolean(bool) {
    return bool.sourceString === "সত্য" ? "true" : "false";
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
