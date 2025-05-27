const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 1부터 N까지 순회하는 배열을 만든다. 이 때 주어진 학생 지목 배열을 N + 1이 되도록 해서
 * 1-based index를 사용할 수 있도록 맞춘다.
 *
 * 2. 1부터 N까지 index를 순회하면서, i번째 학생을 방문한 기록이 없다면 현재 순회를 시작하는 학생을 i번째 학생으로 설정한다.
 * let cur = i;
 *
 * 3. 사이클이 끝나거나 방문 기록이 없을 때까지 반복되는 while문을 선언한다.
 * 4. 현재 방문 순환이 시작하는 인덱스 i를 studentStates[cur]에 기록한다.
 * 5. 현재 순회하는 대상 숫자를 다음 숫자로 바꾼다. cur = nextStudents[cur];
 *
 * 6. 3 ~ 5번을 반복해서 진행하면, 계속 시작 지점을 학생 상태에 기록하게 되고
 * 그러다가 어느 순간 시작 지점 인덱스 i와 현재 학생 상태 studentsStates[cur]가 일치할 수 있다.
 * 이 지점이 순환이 완성되는 지점.
 *
 * 7. 6에서 순환이 완성되었기 때문에, 다시 cur = nextStudents[cur]를 반복하면서 나오는 모든 studentsStates[cur]의
 * 상태를 IN_CYCLE로 변경표시하는 while을 돈 다음 사이클 while도 종료한다..
 *
 * 8. 만약 3~5과정에서 NOT_VISITED가 아닌 값을 만났다면, 이건 이미 다른 사이클에 포함되었음을 의미하므로 while을 종료한다.
 * 9. 최종적으로 studentsStates를 순회하면서 IN_CYCLE이 아닌 경우의 값을 합해서 정답 배열에 넣는다.
 *
 */

const T = +input.shift();
let line = 0;

const NOT_VISITED = 0;
const IN_CYCLE = -1;

const answer = [];

for (let t = 0; t < T; t++) {
  const N = +input[line++];
  const nextStudents = [0, ...input[line++].split(' ').map(Number)];
  const studentStates = Array(N + 1).fill(NOT_VISITED);

  for (let i = 1; i <= N; i++) {
    if (studentStates[i] === NOT_VISITED) {
      let cur = i;

      while (true) {
        studentStates[cur] = i;
        cur = nextStudents[cur];

        if (studentStates[cur] === i) {
          while (studentStates[cur] !== IN_CYCLE) {
            studentStates[cur] = IN_CYCLE;
            cur = nextStudents[cur];
          }

          break;
        }

        if (studentStates[cur] !== NOT_VISITED) {
          break;
        }
      }
    }
  }

  let notCycleCount = 0;

  for (let i = 1; i <= N; i++) {
    if (studentStates[i] !== IN_CYCLE) notCycleCount++;
  }

  answer.push(notCycleCount);
}

console.log(answer.join('\n'));
