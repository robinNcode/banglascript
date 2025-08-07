/* Lexical Grammar */
%lex
%options no-case-insensitive

%%
\s+             /* skip whitespace */

"দেখাও"        return 'PRINT'
"ধরি"           return 'VAR_LET'
"ধ্রুবক"        return 'VAR_CONST'
"চলক"           return 'VAR_VAR'
"সংখ্যা"        return 'TYPE_NUMBER'
"হাছামিছা"      return 'TYPE_BOOLEAN'
"দড়ি"          return 'TYPE_STRING'
"বিন্যাস"       return 'TYPE_ARRAY'
"সংখ্যা_বিন্যাস" return 'TYPE_NUMBER_ARRAY'
"দড়ি_বিন্যাস"   return 'TYPE_STRING_ARRAY'

"যদি"          return 'IF'
"নয়তোযদি"     return 'ELSEIF'
"নয়তো"        return 'ELSE'

"কাঠামো"        return 'FUNCTION'
"ফেরত"         return 'RETURN'

"জন্য"          return 'FOR'
"যতক্ষণ"        return 'WHILE'
"প্রত্যেকেরজন্য" return 'FOREACH'

"শ্রেণী"        return 'CLASS'
"নির্মাতা"      return 'CONSTRUCTOR'
"নতুন"          return 'NEW'

[0-9\u09E6-\u09EF]+(\.[0-9\u09E6-\u09EF]+)?    return 'NUMBER'
\"[^\"]*\"          return 'STRING_LITERAL'
"সত্য"         return 'TRUE'
"মিথ্যা"       return 'FALSE'

[a-zA-Z0-9_\u0980-\u09FF]+(\.[a-zA-Z0-9_\u0980-\u09FF]+)* return 'IDENTIFIER'

"("             return 'LPAREN'
")"             return 'RPAREN'
"{"             return 'LBRACE'
"}"             return 'RBRACE'
"["             return 'LBRACKET'
"]"             return 'RBRACKET'
";"             return 'SEMICOLON'
","             return 'COMMA'
"."             return 'DOT'

"="             return 'ASSIGN'
"+"             return 'PLUS'
"-"             return 'MINUS'
"*"             return 'MULTIPLY'
"/"             return 'DIVIDE'
"=="            return 'EQUALS'
"!="            return 'NOT_EQUALS'
"<"             return 'LT'
">"             return 'GT'
"<="            return 'LTE'
">="            return 'GTE'
"&&"            return 'AND'
"||"            return 'OR'
"!"             return 'NOT'

<<EOF>>         return 'EOF'
/lex

/* Syntax Grammar */
%start program

%%

program
    : statement_list EOF
        { return { type: 'Program', body: $1 }; }
    ;

statement_list
    : statement_list statement
        { $1.push($2); }
    | statement
        { $$ = [$1]; }
    ;

statement
    : variable_declaration SEMICOLON
        { $$ = $1; }
    | print_statement SEMICOLON /* NEW: A rule for the 'দেখাও' statement */
        { $$ = $1; }
    | expression SEMICOLON
        { $$ = { type: 'ExpressionStatement', expression: $1 }; }
    | typed_variable_declaration SEMICOLON

    | array_literal
        { $$ = $1; }
    | if_statement optional_semicolon
        { $$ = $1; }
    | loop_statement optional_semicolon
        { $$ = $1; }
    | function_declaration optional_semicolon
        { $$ = $1; }
    | class_declaration optional_semicolon
        { $$ = $1; }
    | assignment_statement SEMICOLON
        { $$ = $1; }
    ;

/* NEW: Definition of the 'print_statement' */
optional_semicolon
    : SEMICOLON
        { $$ = ';'; }
    | /* empty */
        { $$ = null; }
    ;

assignment_statement
    : IDENTIFIER ASSIGN expression
        { $$ = { type: 'AssignmentExpression', operator: '=', left: { type: 'Identifier', name: $1 }, right: $3 }; }
    ;
    
print_statement
    : PRINT LPAREN expression RPAREN
        { $$ = { type: 'PrintStatement', arguments: [$3] }; }
    ;

variable_declaration
    : var_keyword identifier_and_type_list ASSIGN expression
        { $$ = { type: 'VariableDeclaration', kind: $1, declarations: [{ id: $2, init: $4 }] }; }
    ;

var_keyword
    : VAR_LET { $$ = 'let'; }
    | VAR_CONST { $$ = 'const'; }
    | VAR_VAR { $$ = 'var'; }
    ;

identifier_and_type_list
    : IDENTIFIER
        { $$ = { name: $1 }; }
    | IDENTIFIER type_annotation
        { $$ = { name: $1, type: $2 }; }
    ;

type_annotation
    : ':' type
        { $$ = $2; }
    ;

type
    : TYPE_NUMBER
        { $$ = 'number'; }
    | TYPE_BOOLEAN
        { $$ = 'boolean'; }
    | TYPE_STRING
        { $$ = 'string'; }
    | TYPE_ARRAY
        { $$ = 'array'; }
    | TYPE_NUMBER_ARRAY
        { $$ = 'number[]'; }
    | TYPE_STRING_ARRAY
        { $$ = 'string[]'; }
    ;

typed_variable_declaration
    : type IDENTIFIER ASSIGN expression
        { $$ = { type: 'VariableDeclaration', kind: 'let', declarations: [{ id: { name: $2, type: $1 }, init: $4 }] }; }
    ;

if_statement
    : IF LPAREN expression RPAREN block else_if_clauses else_clause
        { $$ = { type: 'IfStatement', test: $3, consequent: $5, elseIfs: $6, alternate: $7 }; }
    ;

else_if_clauses
    : else_if_clauses ELSEIF LPAREN expression RPAREN block
        { $1.push({ test: $4, consequent: $6 }); }
    | /* empty */
        { $$ = []; }
    ;

else_clause
    : ELSE block
        { $$ = $2; }
    | /* empty */
        { $$ = null; }
    ;

loop_statement
    : for_loop
        { $$ = $1; }
    | while_loop
        { $$ = $1; }
    | foreach_loop
        { $$ = $1; }
    ;

for_loop
    : FOR LPAREN expression SEMICOLON expression SEMICOLON expression RPAREN block
        { $$ = { type: 'ForLoop', init: $3, test: $5, update: $7, body: $9 }; }
    ;

while_loop
    : WHILE LPAREN expression RPAREN block
        { $$ = { type: 'WhileLoop', test: $3, body: $5 }; }
    ;

foreach_loop
    : FOREACH LPAREN IDENTIFIER IN expression RPAREN block
        { $$ = { type: 'ForEachLoop', iterator: $3, iterable: $5, body: $7 }; }
    ;

function_declaration
    : FUNCTION IDENTIFIER LPAREN parameters RPAREN block
        { $$ = { type: 'FunctionDeclaration', id: { name: $2 }, params: $4, body: $6 }; }
    ;

parameters
    : identifier_and_type_list COMMA parameters
        { $$ = [$1, ...$3]; }
    | identifier_and_type_list
        { $$ = [$1]; }
    | /* empty */
        { $$ = []; }
    ;

block
    : LBRACE statement_list RBRACE
        { $$ = { type: 'BlockStatement', body: $2 }; }
    | LBRACE RBRACE
        { $$ = { type: 'BlockStatement', body: [] }; }
    ;

class_declaration
    : CLASS IDENTIFIER class_body
        { $$ = { type: 'ClassDeclaration', id: { name: $2 }, body: $3 }; }
    ;

class_body
    : LBRACE method_list RBRACE
        { $$ = { type: 'ClassBody', body: $2 }; }
    | LBRACE RBRACE
        { $$ = { type: 'ClassBody', body: [] }; }
    ;

method_list
    : method_list method_definition
        { $1.push($2); }
    | method_definition
        { $$ = [$1]; }
    ;

method_definition
    : CONSTRUCTOR LPAREN parameters RPAREN block
        { $$ = { type: 'ConstructorMethod', params: $3, body: $5 }; }
    | IDENTIFIER LPAREN parameters RPAREN block
        { $$ = { type: 'ClassMethod', id: { name: $1 }, params: $3, body: $5 }; }
    ;

expression
    : expression AND expression
        { $$ = { type: 'LogicalExpression', operator: '&&', left: $1, right: $3 }; }
    | expression OR expression
        { $$ = { type: 'LogicalExpression', operator: '||', left: $1, right: $3 }; }
    | expression EQUALS expression
        { $$ = { type: 'BinaryExpression', operator: '==', left: $1, right: $3 }; }
    | expression NOT_EQUALS expression
        { $$ = { type: 'BinaryExpression', operator: '!=', left: $1, right: $3 }; }
    | expression LT expression
        { $$ = { type: 'BinaryExpression', operator: '<', left: $1, right: $3 }; }
    | expression GT expression
        { $$ = { type: 'BinaryExpression', operator: '>', left: $1, right: $3 }; }
    | expression LTE expression
        { $$ = { type: 'BinaryExpression', operator: '<=', left: $1, right: $3 }; }
    | expression GTE expression
        { $$ = { type: 'BinaryExpression', operator: '>=', left: $1, right: $3 }; }
    | expression PLUS expression
        { $$ = { type: 'BinaryExpression', operator: '+', left: $1, right: $3 }; }
    | expression MINUS expression
        { $$ = { type: 'BinaryExpression', operator: '-', left: $1, right: $3 }; }
    | expression MULTIPLY expression
        { $$ = { type: 'BinaryExpression', operator: '*', left: $1, right: $3 }; }
    | expression DIVIDE expression
        { $$ = { type: 'BinaryExpression', operator: '/', left: $1, right: $3 }; }
    | unary_expression
        { $$ = $1; }
    ;

unary_expression
    : MINUS expression
        { $$ = { type: 'UnaryExpression', operator: '-', argument: $2 }; }
    | NOT expression
        { $$ = { type: 'UnaryExpression', operator: '!', argument: $2 }; }
    | call_expression
        { $$ = $1; }
    ;

call_expression
    : IDENTIFIER LPAREN arguments RPAREN
        { $$ = { type: 'CallExpression', callee: { type: 'Identifier', name: $1 }, arguments: $3 }; }
    | primary_expression
        { $$ = $1; }
    ;

arguments
    : expression COMMA arguments
        { $$ = [$1, ...$3]; }
    | expression
        { $$ = [$1]; }
    | /* empty */
        { $$ = []; }
    ;

primary_expression
    : IDENTIFIER
        { $$ = { type: 'Identifier', name: $1 }; }
    | NUMBER
        { $$ = { type: 'Literal', value: parseFloat(yytext) }; }
    | STRING_LITERAL
        { $$ = { type: 'Literal', value: yytext.slice(1, -1) }; }
    | TRUE
        { $$ = { type: 'Literal', value: true }; }
    | FALSE
        { $$ = { type: 'Literal', value: false }; }
    | LPAREN expression RPAREN
        { $$ = $2; }
    | array_literal
        { $$ = $1; }
    ;

array_literal
    : LBRACKET arguments RBRACKET
        { $$ = { type: 'ArrayExpression', elements: $2 }; }
    ;
