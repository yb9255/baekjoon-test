const [[N], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
    1. input[i + 1]을 정렬하여 priorityOrder를 배열을.
    2. input[i + 1]을 순회하여 index 정보를 가지도록 값을 mapping한다 (printQueue)
    3. printQueue에 길이가 있는 동안 while문을 순회한다.
    4. 매 순회마다 printQueue에서 값을 하나 shift한 다음, 가장 높은 우선순위인지 체크한다.
    5. 가장 높은 우선순위이면 printCount를 올리고 우선순위 heap을 pop한다. 이 때, location과 index가 일치하면
    정답으로 리턴한다.
    6. 가장 높은 우선순위가 아니라면 queue의 끝에 다시 push한다.
*/

const answer = [];

for (let i = 0; i < input.length; i += 2) {
  let printCount = 0;

  const [, location] = input[i];
  const maxHeap = input[i + 1].slice().sort((a, b) => a - b);
  const printQueue = input[i + 1].map((priority, index) => ({
    priority,
    index,
  }));

  while (printQueue.length) {
    const highestPriority = maxHeap[maxHeap.length - 1];
    const { priority, index } = printQueue.shift();

    if (priority >= highestPriority) {
      printCount++;
      maxHeap.pop();

      if (index === location) {
        answer.push(printCount);
        break;
      }
    } else {
      printQueue.push({ priority, index });
    }
  }
}

console.log(answer.join('\n'));
