const input = Number(
  require('fs').readFileSync('input2.txt').toString().trim(),
);

// 세로x가로
// 1. 2x1을 마지막에 붙여야 할 때 타일의 경우의 수는 2 x (n-1)
// 2. 1x2를 마지막에 붙여야 할 때 타일의 경우의 수는 2 x (n-2)
// 3. 2x2를 마지막에 붙여야 할 때 타일의 경우의 수는 2 x (n-2)

// 점화식 -> 2 x n == ((2 x (n - 2)) x 2 + 2 x (n - 1))

if (input === 1) {
  console.log(1);
  return;
}

const MOD = 10_007;

let prev2 = 1;
let prev1 = 3;
let current;

for (let i = 3; i <= input; i++) {
  current = (prev2 * 2 + prev1) % MOD;
  prev2 = prev1;
  prev1 = current;
}

console.log(prev1);
