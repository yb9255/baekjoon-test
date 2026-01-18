/** https://www.acmicpc.net/problem/1309 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const MOD = 9901;

let noLionEndCount = 1;
let leftLionEndCount = 1;
let rightLionEndCount = 1;

for (let i = 2; i <= N; i++) {
  const prevNoLionEndCount = noLionEndCount;
  const prevLeftLionEndCount = leftLionEndCount;
  const prevRightLionEndCount = rightLionEndCount;

  noLionEndCount =
    (prevNoLionEndCount + prevLeftLionEndCount + prevRightLionEndCount) % MOD;
  leftLionEndCount = (prevNoLionEndCount + prevRightLionEndCount) % MOD;
  rightLionEndCount = (prevNoLionEndCount + prevLeftLionEndCount) % MOD;
}

console.log((noLionEndCount + leftLionEndCount + rightLionEndCount) % MOD);
