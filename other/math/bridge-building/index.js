/** https://www.acmicpc.net/problem/1010 */

const [[T], ...spots] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. N개의 스팟이 M개의 스팟과 연결되는 순열 수는
 * 1-1. 첫번쨰 스팟은 M개를 고를 수 있다.
 * 1-2. 두번째 스팟은 M - 1 개를 고를 수 있다.
 * 1-3. N번째 스팟은 M - (N + 1) 개를 고를 수 있다.
 * 1-4. 즉, M * M - 1 * .... M - (N + 1)을 하면 순열을 구할 수 있다.
 *
 * 2. 문제는 조합을 요구하고 있다.
 * 2-1. 순열에서 첫번째 스팟은 경우의 수 N개만큼 중복이 발생한다.
 * 2-2. 순열에서 두번째 스팟은 경우의 수 N - 1개만큼 중복이 발생한다.
 * 2-3. 순열에서 N번째 스팟은 경우의 수가 하나밖에 남지 않아 1개의 중복이 발생한다.
 * 2-4. 즉, 1-4 / (N * N - 1 * N - 2 * .... * 1)을 하면 중복이 사라지고 조합 개수가 된다.
 */

const answer = [];

for (let t = 0; t < T; t++) {
  const [N, M] = spots[t];

  let sum = 1;

  for (let n = 1; n <= N; n++) {
    sum *= M - n + 1;
    sum /= n;
  }

  answer.push(sum);
}

console.log(answer.join('\n'));
