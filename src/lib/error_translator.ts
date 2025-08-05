export function translateErrorToBengali(message: string): string {
  const dictionary: Record<string, string> = {
    'Unknown node type': 'অজানা নোড টাইপ',
    'ত্রুটিঃ অঘোষিত চলক': 'ত্রুটিঃ অঘোষিত চলক',
    'Unexpected token': 'অপ্রত্যাশিত টোকেন',
    'Syntax error': 'সিনট্যাক্স ত্রুটি',
  };

  for (const key in dictionary) {
    if (message.includes(key)) {
      return dictionary[key];
    }
  }
  return 'অজানা ত্রুটি ঘটেছে, অনুগ্রহ করে কোড পরীক্ষা করুন: \n' + message;
}
