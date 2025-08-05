import { parser } from "@lezer/javascript";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

const banglaKeywords = ["ধরি", "ধ্রুবক", "চলক", "সংখ্যা", "হাছামিছা", "দড়ি", "বিন্যাস", "যদি", "নয়তোযদি", "নয়তো", "কাঠামো", "ফেরত", "জন্য", "যতক্ষণ", "প্রত্যেকেরজন্য", "শ্রেণী", "নির্মাতা", "নতুন", "দেখাও"];

// Dynamically create the styleTags mapping
const keywordMapping = {};
banglaKeywords.forEach(keyword => {
  keywordMapping[keyword] = t.keyword;
});

const banglaParser = parser.configure({
  props: [
    styleTags({
      "let": t.keyword,
      "const": t.keyword,
      "var": t.keyword,
      "if": t.keyword,
      "else if": t.keyword,
      "else": t.keyword,
      "function": t.keyword,
      "return": t.keyword,
      "for": t.keyword,
      "while": t.keyword,
      "forEach": t.keyword,
      "class": t.keyword,
      "constructor": t.keyword,
      "new": t.keyword,
      "console.log": t.keyword,
      ...keywordMapping, // Spread the dynamically created mapping here
      "VariableDefinition": t.variableName, // Common practice
      "String": t.string,
      "Number": t.number,
      "LineComment": t.lineComment,
      "BlockComment": t.blockComment,
    })
  ]
});

export const banglascriptLanguage = LRLanguage.define({
  parser: banglaParser,
  languageData: {
    commentTokens: { line: "//" },
    indentOnInput: /^\s*}$/,
    wordChars: "a-zA-Z0-9_\u0980-\u09FF"
  }
});

export function banglascript() {
  return new LanguageSupport(banglascriptLanguage);
}