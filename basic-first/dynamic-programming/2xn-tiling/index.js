const input = Number(
  require('fs').readFileSync('input2.txt').toString().trim(),
);

// 1. 마지막에 1x2 타일을 붙이는 경우의 수는 2 x (n - 1)이다.
// e.g.) 마지막에 1x2을 붙이는 경우를 보면 항상 마지막 끝에
// 세로 한줄 붙이게 되는데, 세로 한줄을 빼면 2 x (n - 1)이 됨
// 2xn == (==|), 2x(n-1) == (==)

// 2. 마지막에 2x1 타일을 붙이는 경우의 수는 2 x (n - 2)이다.
// e.g) 마지막에 2x1을 붙이는 경우 항상 마지막 끝에 가로 두줄을
// 붙이게 되는데, 2x1 타일을 하나만 빼면 미완성이므로
// 이 전에 있던 2x1 타일도 하나 빼야 다시 완성된 경우의 수이며,
// 그러면 경우의 수는 2 x (n - 2)가 됨.
// 2xn == (|==)
// 2x(n-2) == (|=)

// 3. 마지막에 붙일 수 있는 타일의 종류는 2x1과 1x2밖에 없음
// 즉, 2x(n - 1) + 2x(n -2)가 현재 구하고자 하는 2xn의 개수와 일치

// 4. prev2에 n === 1일때 경우의 수, prev1에 n === 2일때 경우의 수 케이스를 저장해둠.
// 5. 3부터 순회를 돌면서 현재 값을 prev1과 prev2를 더한 값으로 결정함.
// 6. current를 결정하면 prev2는 prev1으로 바꾸고, prev1은 current로 바꾸고 순회 종료
// 7. 계속 반복하면 최종적으로 input의 타일 조합을 구할 수 있게 됨.

// Modulo (나머지 연산 %)를 의미
const MOD = 10_007;

if (input === 1) {
  console.log(1);
  return;
}

let prev2 = 1;
let prev1 = 2;
let current;

for (let i = 3; i <= input; i++) {
  current = (prev1 + prev2) % MOD;
  prev2 = prev1;
  prev1 = current;
}

console.log(prev1);
