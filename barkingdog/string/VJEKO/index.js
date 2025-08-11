/** https://www.acmicpc.net/problem/9996 */

const [N, pattern, ...words] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. *를 기준으로 pattern을 분리해서 prefix, suffix를 구함
 * 2. 만약 단어의 길이가 prefix + suffix의 길이보다 짧으면 answer에 NE push.
 * 3. 단어가 prefix로 시작하고 suffix로 끝나면 answer에 DA push, 그렇지 않으면 NE push.
 */

const [prefix, suffix] = pattern.split('*');
const answer = [];

for (let i = 0; i < +N; i++) {
  const word = words[i];

  if (word.length < prefix.length + suffix.length) {
    answer.push('NE');
    continue;
  }

  if (word.startsWith(prefix) && word.endsWith(suffix)) {
    answer.push('DA');
  } else {
    answer.push('NE');
  }
}

console.log(answer.join('\n'));
