const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n');

const targetChannelNumber = +input[0];
const n = +input[1];
const brokenRemoteNumbers = n ? input[2].split(' ').map(Number) : [];
const startChannelNumber = 100;
const maxPossibleChannelNumber = 999_999;

/** Pseudo Code
 *
 * Brute Force
 *
 * 1. 최소값 후보
 * 1-1. + / - 버튼만으로 목표 채널에 도달하는 방법 -> Math.abs(targetChannelNumber - startChannelNumber)
 * 1-2. 고장나지 않은 버튼으로 만들 수 있는 숫자를 우선 입력하고, 입력한 숫자로부터 목표 채널에 도착하는 방법
 * -> 고장나지 않은 숫자를 입력한 횟수(click)을 구한 후 click + 목표 채널 - 방금 만든 채널.
 *
 * 2. 1-1과 1-2중 더 작은 값을 리턴한다.
 * 2-1. 이 때, 500_000보다 더 큰 값에서 아래로 - 버튼을 누르는게 가장 적은 횟수일 수 있으므로 500_000과 같은 길이 중
 * 가장 큰 값인 999_999까지 계산을 해본다.
 *
 *
 */

let minClick = Math.abs(targetChannelNumber - startChannelNumber);

for (let i = 0; i <= maxPossibleChannelNumber; i++) {
  const digit = i.toString();
  let isValid = true;

  for (let j = 0; j < digit.length; j++) {
    if (brokenRemoteNumbers.includes(Number(digit[j]))) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    const pressCount = digit.length + Math.abs(targetChannelNumber - i);
    minClick = Math.min(minClick, pressCount);
  }
}

console.log(minClick);

/**
 * Pseudo Code (Heuristic Optimization)
 */
