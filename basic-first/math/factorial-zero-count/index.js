const input = Number(require('fs').readFileSync('input.txt').toString().trim());

let answer = 0;

// 1. 0의 개수는 10이 곱해질때마다 올라감.

// 2. 10은 2 x 5일때 이루어짐, 즉 약수가 2인 숫자 + 약수가 5인 숫자 조합 시 0 하나 추가
// e.g.) 1 * (2) * 3 * (2 * 2) * 5

// 3. 10의 자리의 경우 항상 2와 5를 약수로 가지고 있고, 짝수의 경우 항상 2를 약수로 가짐.
// 즉, 팩토리얼 시 약수를 2로 가진 수가 약수를 5로 가진 수보다 항상 많으므로, 5의 개수만 세면
// 0의 개수를 셀 수 있음. 5의 개수 1개당 0 하나가 붙음

// 4. 이 때, 25, 125와 같은 5의 제곱들은 5를 두개 가지므로 5의 개수가 2개라고 셀 수 있음
// 즉 25를 약수로 가지면 2개의 0이 더 붙고, 125를 약수로 가지면 3개의 0이 더 붙음.

// 5. 정답에 input을 5로 나눈 값을 더하면 5, 10, 15, 20, 25... 등 모든 5를 약수로 가진 값이 더해짐
// 6. 정답에 input을 25로 나눈 값을 더하면 25를 약수로 가진 값이 더해짐, 즉 25의 경우 한번 더 세는 게됨
// 7. 125는 3번, 625는 4번.. 이렇게 됨.

for (let i = 5; i <= input; i *= 5) {
  answer += Math.floor(input / i);
}

console.log(answer);
