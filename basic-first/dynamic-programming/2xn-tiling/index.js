const input = Number(
  require('fs').readFileSync('input2.txt').toString().trim(),
);

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
