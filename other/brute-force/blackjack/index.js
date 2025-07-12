const [[N, M], cards] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

cards.sort((a, b) => a - b);

let maxSum = 0;

outer: for (let i = 0; i < N - 2; i++) {
  let left = i + 1;
  let right = N - 1;

  while (left < right) {
    const sum = cards[i] + cards[left] + cards[right];

    if (sum === M) {
      maxSum = sum;
      break outer;
    } else if (sum < M) {
      maxSum = Math.max(sum, maxSum);
      left++;
    } else {
      right--;
    }
  }
}

console.log(maxSum);
