import banglascript_parser from './banglascript_parser.mjs';

export function parse(input: string): any {
  try {
    return (banglascript_parser as any).parse(input);
  } catch (err: any) {
    if (err.hash && err.hash.loc) {
      const { first_line, last_line, first_column, last_column } = err.hash.loc;
      const message = err.message.split('\n').slice(2).join('\n'); // Clean up the error message
      throw new Error(`ভুল, লাইন নংঃ ${first_line} 
 ${message} 
 অনুগ্রহ করে কোড পরীক্ষা করুন।`);
    }
    throw err;
  }
}