const identifierMap = {};

export function transliterateBangla(text: string) {
  const transliterationMap = {
    "অ": "a", "আ": "aa", "ই": "i", "ঈ": "ii", "উ": "u", "ঊ": "uu",
    "ঋ": "ri", "এ": "e", "ঐ": "oi", "ও": "o", "ঔ": "ou",
    "ক": "k", "খ": "kh", "গ": "g", "ঘ": "gh", "ঙ": "ng",
    "চ": "ch", "ছ": "chh", "জ": "j", "ঝ": "jh", "ঞ": "ny",
    "ট": "t", "ঠ": "th", "ড": "d", "ঢ": "dh", "ণ": "n",
    "ত": "t", "থ": "th", "দ": "d", "ধ": "dh", "ন": "n",
    "প": "p", "ফ": "ph", "ব": "b", "ভ": "bh", "ম": "m",
    "য": "j", "র": "r", "ল": "l", "শ": "sh", "ষ": "s",
    "স": "s", "হ": "h", "ড়": "r", "ঢ়": "rh", "য়": "y",
    "ৎ": "t", "ং": "ng", "ঃ": "h"
  };

  let transliterated = text
    .split("")
    .map(char => transliterationMap[char] || char)
    .join("")
    .replace(/[^a-zA-Z0-9_]/g, ""); // Remove invalid characters

  // Ensure uniqueness
  if (!identifierMap[transliterated]) {
    identifierMap[transliterated] = 1;
  } else {
    identifierMap[transliterated]++;
    transliterated += identifierMap[transliterated];
  }

  return transliterated;
}