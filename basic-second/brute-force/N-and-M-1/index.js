const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/**
 * Pseudo Code
 *
 * - 1부터 N까지의 수 중에서 중복 없이 M개를 고르는 모든 순열을 구한다.
 * - getSequence(depth, total): 현재 선택한 개수(depth)와 누적된 문자열(total)을 인자로 받는다.
 * - depth가 M이 되면 total을 answer에 추가한다.
 * - 각 단계마다 1부터 N까지 순회하면서 아직 선택하지 않은 숫자를 고른다.
 * - 숫자 i를 선택한 경우 checked[i]를 true로 설정하고,
 *   다음 단계로 재귀 호출하면서 total에 i + ' '를 덧붙인다.
 * - 재귀 호출이 끝나면 checked[i]를 다시 false로 바꾸어 백트래킹한다.
 */

const checked = Array(N + 1).fill(false);
const answer = [];

const getSequence = (depth, total) => {
  if (depth === M) {
    answer.push(total.trim());
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (checked[i]) continue;
    checked[i] = true;
    getSequence(depth + 1, total + i + ' ');
    checked[i] = false;
  }
};

getSequence(0, '');

console.log(answer.join('\n'));
