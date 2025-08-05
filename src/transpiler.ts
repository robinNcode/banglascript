/**
 * Transpiles an AST node from BanglaScript to JavaScript
 * @param node - The AST node to transpile
 * @returns JavaScript source code string
 */

const declaredVariables = new Set<string>();

export function transpile(node: any): string {
    if (!node || typeof node !== 'object') {
        throw new Error(`Invalid node: ${JSON.stringify(node)}`);
    }

    console.log(`[DEBUG] Transpiling node: ${node.type}`);

    switch (node.type) {
        case 'Program':
            return node.body.map(transpile).join('\n');

        case 'VariableDeclaration':
            const kind = node.kind || 'let';
            const decl = node.declarations[0];
            const varName = decl.id.name;

            // Track declaration
            declaredVariables.add(varName);

            return `${kind} ${varName} = ${transpile(decl.init)};`;

        case 'AssignmentExpression':
            const varAssignName = node.left.name;

            // Throw error if variable is not declared
            if (!declaredVariables.has(varAssignName)) {
                throw new Error(`ত্রুটিঃ অঘোষিত চলক "${varAssignName}"`);
            }

            return `${varAssignName} ${node.operator} ${transpile(node.right)};`;

        case 'PrintStatement':
            return `console.log(${node.arguments.map(transpile).join(', ')});`;

        case 'Literal':
            return typeof node.value === 'string'
                ? `"${node.value}"`
                : String(node.value);

        case 'Identifier':
            return node.name;

        case 'BinaryExpression':
            return `(${transpile(node.left)} ${node.operator} ${transpile(node.right)})`;

        case 'UnaryExpression':
            return `(${node.operator}${transpile(node.argument)})`;

        case 'IfStatement':
            let output = `if (${transpile(node.test)}) ${transpile(node.consequent)}`;
            if (node.elseIfs && node.elseIfs.length > 0) {
                for (const elseif of node.elseIfs) {
                    output += ` else if (${transpile(elseif.test)}) ${transpile(elseif.consequent)}`;
                }
            }
            if (node.alternate) {
                output += ` else ${transpile(node.alternate)}`;
            }
            return output;

        case 'BlockStatement':
            return `{\n${node.body.map(transpile).join('\n')}\n}`;

        case 'ForLoop':
            return `for (${transpile(node.init)} ${transpile(node.test)}; ${transpile(node.update)}) ${transpile(node.body)}`;

        case 'WhileLoop':
            return `while (${transpile(node.test)}) ${transpile(node.body)}`;

        case 'FunctionDeclaration':
            const funcParams = node.params.map((p: { name: any; }) => p.name).join(', ');
            return `function ${node.id.name}(${funcParams}) ${transpile(node.body)}`;

        case 'CallExpression':
            return `${transpile(node.callee)}(${node.arguments.map(transpile).join(', ')})`;

        case 'ForEachLoop':
            return `for (const ${node.iterator} of ${transpile(node.iterable)}) ${transpile(node.body)}`;

        case 'ClassDeclaration':
            return `class ${node.id.name} ${transpile(node.body)}`;

        case 'ClassBody':
            return `{\n${node.body.map(transpile).join('\n')}\n}`;

        case 'ConstructorMethod':
            const ctorParams = node.params.map((p: { name: any; }) => p.name).join(', ');
            return `constructor(${ctorParams}) ${transpile(node.body)}`;

        case 'ClassMethod':
            const methodParams = node.params.map((p: { name: any; }) => p.name).join(', ');
            return `${node.id.name}(${methodParams}) ${transpile(node.body)}`;

        default:
            throw new Error(`Unknown node type: ${node.type}`);
    }
}
