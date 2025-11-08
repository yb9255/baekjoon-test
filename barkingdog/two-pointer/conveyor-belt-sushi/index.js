/** https://www.acmicpc.net/problem/2531 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * Pseudo Code
 * 1. 각 번호의 초밥을 지금 몇번 먹었는지 기록하는 sushiEatingCount 배열을 생성
 * sushiEatingCount[i] = 2는 i번 초밥을 2번 먹었다는 뜻
 *
 * 2. kindCount는 현재 초밥 조합에서 서로 다른 초밥이 몇 종류가 되는지를 의미
 *
 * 3. sushiEatingCount에서 쿠폰에 해당하는 C 인덱스에 1을 추가하고, 조합에 C번째 초밥이 추가되는 순간이므로
 * kindCount를 1 늘려줌
 *
 * 4. addKind 함수를 생성, addKind 함수는 인자로 받은 초밥 번호의 sushiEatingCount를 1 늘려주고, 만약 처음 먹는거면
 * 조합 숫자를 1 늘려주는 함수
 *
 * 5. removeKind 함수를 생성, removeKind 함수는 인자로 받은 초밥 번호의 sushiEatingCount를 1 줄이고, 만약 남은
 * 먹은 초밥 갯수가 0이라면 조합 숫자를 1 줄이는 함수
 *
 * 6. 우선 dishes[0] ~ dishes[K - 1]까지 초밥을 addKind 함수를 실행해 조합에 추가한다.
 * 7. result의 값을 Math.max(result, kindCount) 초기화하여 시작 result값을 지정한다.
 * 8. 0 ~ N - 1까지 순회하면서 맨 앞의 값을 제거하고 (i + K) % N 값을 추가하는 원형 슬라이드 윈도우를 적용한다.
 * 9. 8의 과정에서 kindCount가 result보다 커지면 kindCount를 result로 갱신한다.
 * 10. result를 로그한다.
 */

/** 접시 수, 초밥 가짓수, 연속 수, 쿠폰 번호 */
const [N, D, K, C] = input[0].split(' ').map(Number);
const dishes = input.slice(1).map(Number);

const sushiEatingCount = Array(D + 1).fill(0);
let kindCount = 0;

let result = 0;

sushiEatingCount[C] = 1;
kindCount = 1;

const addKind = (sushi) => {
  if (sushiEatingCount[sushi] === 0) {
    kindCount++;
  }

  sushiEatingCount[sushi]++;
};

const removeKind = (sushi) => {
  sushiEatingCount[sushi]--;

  if (sushiEatingCount[sushi] === 0) {
    kindCount--;
  }
};

for (let i = 0; i < K; i++) {
  addKind(dishes[i % N]);
}

result = Math.max(result, kindCount);

for (let i = 0; i < N; i++) {
  removeKind(dishes[i % N]);
  addKind(dishes[(K + i) % N]);

  if (kindCount > result) {
    result = kindCount;
  }
}

console.log(result);
