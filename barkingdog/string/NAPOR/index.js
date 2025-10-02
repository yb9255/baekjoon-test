/** https://www.acmicpc.net/problem/2870 */

const [N, ...words] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 현재 문자가 숫자일 경우 numChar에 저장
 *
 * 2. 현재 문자가 숫자가 아닐 경우 숫자 연속이 끝난거므로 answer에 push해야 한다.
 * 이 때 Number 객체로 해결하면 큰 숫자에서 문제가 발생하므로, regex로 0 prefix를 제거하고
 * prefix를 전부 제거했을때 빈 문자열이면 0으로 간주해서 push한다.
 *
 * 3. answer 문자열을 sorting해야 하므로 우선 length로 sort하고, 같은 length의 경우 localeCompare로
 * sort한다.
 *
 * 4. sorting한 answer 배열을 로그한다.
 */

const answer = [];

for (let i = 0; i < +N; i++) {
  const word = words[i];

  let numChar = '';

  for (const char of word) {
    if (!Number.isNaN(Number(char))) {
      numChar += char;
    } else {
      if (numChar.length > 0) {
        const normalized = numChar.replace(/^0+/, '') || '0';
        answer.push(normalized);
      }

      numChar = '';
    }
  }

  if (numChar.length > 0) {
    const normalized = numChar.replace(/^0+/, '') || '0';
    answer.push(normalized);
  }
}

console.log(
  answer
    .sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length;
      return a.localeCompare(b);
    })
    .join('\n')
);
