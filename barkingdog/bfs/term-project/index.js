/** https://www.acmicpc.net/problem/9466 */

const [T, ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 1부터 N까지 순회하는 배열을 만든다. 이 때 주어진 학생 지목 배열을 N + 1이 되도록 해서
 * 1-based index를 사용할 수 있도록 맞춘다.
 *
 * 2. index번 학생이 선택한 학생의 index가 담긴 nextStudents 배열과
 * index번 학생이 사이클에 포함되었는지 여부를 확인하는 cycleState 배열 생성 (초기값 -1(NOT_VISITED), 사이클에 있으면 0(IN_CYCLE))
 *
 * 3. 1부터 N까지 index를 순회하면서, i번째 학생이 사이클에 든 적이 없다면
 * 현재 i번째 학생이 현재 사이클의 시작점으로 기록한다. 그리고, i는 같은 사이클에 포함되어 있음의 표시로써도 사용된다.
 * 3-1. e.g cycleState[2]와 cycleState[5]가 둘 다 2를 가지고 있다면, 둘 다 2번쨰 학생부터 시작한 사이클에 포함됨을 의미,
 * 만약 cycleState 중 2를 가진게 2 혼자라면, 2번째 학생부터 시작하는 사이클은 2번째 학생 혼자 포함됨을 의미.
 *
 * 4. 사이클이 끝나거나 방문 기록이 없을 때까지 반복되는 while문을 선언한다.
 * 5. 현재 방문 순환이 시작하는 i를 cycleState[currentStudent]에 기록한다.
 *
 * 6. 현재 순회하는 대상 숫자를 다음 숫자로 바꾼다. currentStudent = nextStudents[currentStudent];
 * 반복하면서 현재 사이클에 포함되는 학생의 cycleState는 전부 i를 가지게 된다.
 *
 * 7. 3 ~ 5번을 반복해서 진행하면, 계속 시작 지점을 학생 상태에 기록하게 되고
 * 그러다가 어느 순간 시작 지점 인덱스 i와 현재 학생 상태 studentsStates[currentStudent]가 일치할 수 있다.
 * 이 지점이 순환이 완성되는 지점.
 *
 * 8. 6에서 순환이 완성되었기 때문에, 다시 currentStudent = nextStudents[currentStudent]를 반복하면서 나오는 모든 studentsStates[currentStudent]의
 * 상태를 IN_CYCLE(0)로 변경표시하는 while을 돈 다음 사이클 while도 종료한다.
 *
 * 9. 만약 3~5과정에서 NOT_VISITED가 아닌 값을 만났다면, 이건 이미 다른 사이클에 포함되었음을 의미하므로 while을 종료한다.
 *
 * 10. 최종적으로 cycleState 순회하면서 IN_CYCLE이 아닌 경우의 값을 합해서 정답 배열에 넣는다. 만약 사이클이 이뤄지지 않았다면
 * 순환이 시작했을 때 i값이 남아있을 것이기 때문에 IN_CYCLE과 다른 값을 가지게 된다.
 *
 */

let line = 0;

const NOT_VISITED = -1;
const IN_CYCLE = 0;

const answer = [];

for (let t = 0; t < +T; t++) {
  const N = +lines[line++];
  const nextStudents = [0, ...lines[line++].split(' ').map(Number)];
  const cycleState = Array(N + 1).fill(NOT_VISITED);

  for (let i = 1; i <= N; i++) {
    if (cycleState[i] === NOT_VISITED) {
      let currentStudent = i;

      while (true) {
        cycleState[currentStudent] = i;
        currentStudent = nextStudents[currentStudent];

        if (cycleState[currentStudent] === i) {
          while (cycleState[currentStudent] !== IN_CYCLE) {
            cycleState[currentStudent] = IN_CYCLE;
            currentStudent = nextStudents[currentStudent];
          }

          break;
        }

        if (cycleState[currentStudent] !== NOT_VISITED) {
          break;
        }
      }
    }
  }

  let notInCycleCount = 0;

  for (let i = 1; i <= N; i++) {
    if (cycleState[i] !== IN_CYCLE) notInCycleCount++;
  }

  answer.push(notInCycleCount);
}

console.log(answer.join('\n'));
