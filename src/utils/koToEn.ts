const HANGUL_TO_ENG: Record<string, string> = {
  ㅃ: 'Q',
  ㅉ: 'W',
  ㄸ: 'E',
  ㄲ: 'R',
  ㅆ: 'T',
  ㅒ: 'O',
  ㅖ: 'P',
  ㅂ: 'q',
  ㅈ: 'w',
  ㄷ: 'e',
  ㄱ: 'r',
  ㅅ: 't',
  ㅛ: 'y',
  ㅕ: 'u',
  ㅑ: 'i',
  ㅐ: 'o',
  ㅔ: 'p',
  ㅁ: 'a',
  ㄴ: 's',
  ㅇ: 'd',
  ㄹ: 'f',
  ㅎ: 'g',
  ㅗ: 'h',
  ㅓ: 'j',
  ㅏ: 'k',
  ㅣ: 'l',
  ㅋ: 'z',
  ㅌ: 'x',
  ㅊ: 'c',
  ㅍ: 'v',
  ㅠ: 'b',
  ㅜ: 'n',
  ㅡ: 'm',
  ㄳ: 'rt',
  ㅄ: 'qt',
  ㄼ: 'fq',
  ㄺ: 'fr',
  ㄻ: 'fa',
  ㅀ: 'fg',
  ㄾ: 'fx',
  ㄿ: 'fv',
};

function decomposeHangul(syllable: string): string[] {
  const CHO = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
  const JONG = [
    '',
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const code = syllable.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return [syllable];
  const uni = code - 0xac00;
  const cho = Math.floor(uni / (21 * 28));
  const jung = Math.floor((uni % (21 * 28)) / 28);
  const jong = uni % 28;
  return [CHO[cho], JUNG[jung], JONG[jong]];
}

export function koToEn(input: string): string {
  let result = '';
  for (let char of input) {
    if (/[\uAC00-\uD7A3]/.test(char)) {
      const [cho, jung, jong] = decomposeHangul(char);
      [cho, jung, jong].forEach(jamo => {
        if (!jamo) return;
        result += HANGUL_TO_ENG[jamo] || jamo;
      });
    } else if (HANGUL_TO_ENG[char]) {
      result += HANGUL_TO_ENG[char];
    } else {
      result += char;
    }
  }
  return result;
}
