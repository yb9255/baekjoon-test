/** https://www.acmicpc.net/problem/1182 */

const [[N, S], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * 1. 현재 방문중인 인덱스를 표시하는 idx과 누적 합 acc를 인자로 받는 sum 함수 만듦.
 * 2. 끝 인덱스에 도달했을 때 합이 S와 일치하면 count를 1 올림
 *
 * 3. 끝 인덱스에 도달하지 않았다면, 현재 인덱스 값을 포함한 재귀와 그렇지 않은 재귀를 두 개 돌림
 * 3-1. [1,2,3,4]에서 1번 인덱스 재귀중일때 현재 인덱스 값 2를 포함하는 재귀를 돌리면, 현재까지 부분 수열은
 * [1,2]가 됨
 * 3-2. [1,2,3,4]에서 1번 인덱스 재귀중일때 현재 인덱스 값 2를 포함하지 않는 재귀를 돌리면, 현재까지 부분 수열은
 * [1]이 됨. 이후 모든 값을 포함시키기로 한다면 최종 완성되는 부분수열은 [1,3,4]가 됨.
 *
 * 4. S가 0일 경우 acc에 아무런 값을 더하거나 빼지 않은, 즉 부분수열 전체가 S가 되지 않은 케이스에도 count가 무조건
 * 1 올라가므로(공집합) 1을 빼줌.
 *
 * 5. count를 리턴
 */

let count = 0;

const sum = (idx, acc) => {
  if (idx === N) {
    if (acc === S) count++;
    return;
  }

  sum(idx + 1, acc + sequence[idx]);
  sum(idx + 1, acc);
};

sum(0, 0);
if (S === 0) count--;

console.log(count);
