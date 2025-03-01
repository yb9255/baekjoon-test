const input = require('fs').readFileSync('input.txt').toString().split('\n');

// 1. 여러 포지션 거리를 같은 숫자만 반복해서 이동하려면
// (술래 포지션 - 숨은 이 포지션, 이하 distance)간의 최대 공약수를 구해야 함
// 즉, distance1 = G * 1, distance2 = G * 2, distance3 = G * 3 같은 형태가 되어
// 최대공약수 G가 있어야 G칸씩 이동하면서 모든 포지션에 도달할 수 있음.

// 2. 맨 처음 두 수간의 최대공약수를 구하면, 그 최대공약수와 다음 숫자의 최대공약수를 구하는 식으로
// 모든 수 간의 최대공약수를 구함.

const [hiderCount, seekerPosition] = input[0].split(' ').map(Number);
const hiderPositions = input[1].split(' ').map(Number);

const getGcd = (num1, num2) => {
  const greater = Math.max(num1, num2);
  const lesser = Math.min(num1, num2);

  return lesser === 0 ? greater : getGcd(lesser, greater % lesser);
};

const distances = hiderPositions.map((hiderPosition) =>
  Math.abs(hiderPosition - seekerPosition),
);

let answer = distances[0];

for (let i = 1; i < hiderCount; i++) {
  answer = getGcd(answer, distances[i]);
}

console.log(answer);
