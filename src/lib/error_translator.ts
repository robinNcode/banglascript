export function translateErrorToBengali(message: string): string {
  // Translation dictionary
  const dictionary: Record<string, string> = {
    'is not defined': 'সংজ্ঞায়িত করা হয়নি',
    'Unexpected token': 'অপ্রত্যাশিত টোকেন',
    'Syntax error': 'সিনট্যাক্স ত্রুটি',
    'Unknown node type': 'অজানা নোড টাইপ',
  };

  // Check for variable not defined error
  const notDefinedMatch = message.match(/(.*) is not defined/);
  if (notDefinedMatch) {
    const varName = notDefinedMatch[1];
    return `ভুলঃ "${varName}" ${dictionary['is not defined']}`;
  }

  // Check for other general errors
  for (const key in dictionary) {
    if (message.includes(key)) {
      return `ভুলঃ ${dictionary[key]}`;
    }
  }

  // Fallback for Jison parser errors (which are pre-formatted)
  if (message.startsWith('ভুল, লাইন নংঃ')) {
    return message;
  }

  // Fallback for other untranslated errors
  return `একটি অজানা ত্রুটি ঘটেছেঃ ${message}`;
}