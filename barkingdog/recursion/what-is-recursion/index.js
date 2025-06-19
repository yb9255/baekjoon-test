const maxRecursionCount = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 * 1. 함수가 실행될 때 항상 앞에 추가되는 시작 텍스트, 함수가 끝날때 항상 추가되는 끝 텍스트,
 * base condition이 아닐때 추가되는 중간 텍스트, base condition이 맞을 때 추가되는 중간 텍스트
 * 를 추가한다.
 *
 * 2. 재귀 함수의 인자는 재귀 횟수를 받는다. 시작 값은 0
 * 3. 인자가 recursionCount와 일치하면 base condition
 *
 * 4. 재귀 횟수가 올라갈때마다 언더바 4개를 prefix로 추가한다.
 *
 * 5. 결과 리턴
 */

let answer =
  '어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.' + '\n';

const startSentence = '"재귀함수가 뭔가요?"';

const defaultMiddleSentences = [
  '"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.',
  '마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.',
  '그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."',
];

const baseConditionMiddleSentence =
  '"재귀함수는 자기 자신을 호출하는 함수라네"';

const endSentence = '라고 답변하였지.';

const padUnderBar = (recursionCount, sentence) =>
  '_'.repeat(recursionCount * 4) + sentence + '\n';

const recursion = (recursionCount) => {
  if (recursionCount === maxRecursionCount) {
    answer += padUnderBar(recursionCount, startSentence);
    answer += padUnderBar(recursionCount, baseConditionMiddleSentence);
    answer += padUnderBar(recursionCount, endSentence);
    return;
  }

  answer += padUnderBar(recursionCount, startSentence);

  defaultMiddleSentences.forEach((sentence) => {
    answer += padUnderBar(recursionCount, sentence);
  });

  recursion(recursionCount + 1);

  answer += padUnderBar(recursionCount, endSentence);
};

recursion(0);

console.log(answer.trim());
