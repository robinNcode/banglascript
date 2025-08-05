// @ts-ignore
import banglascript_parser from './banglascript_parser.mjs';

export function parse(input: string): any {
    return (banglascript_parser as any).parse(input);
}