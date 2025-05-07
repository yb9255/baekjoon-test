const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const map = Array(10).fill(1);

for (let i = 0; i < input.length; i++) {
  const num = +input[i];

  if (num === 6) {
    if (map[9] > map[num]) {
      map[9]--;
    } else {
      map[num]--;
    }
  } else if (num === 9) {
    if (map[6] > map[num]) {
      map[6]--;
    } else {
      map[num]--;
    }
  } else {
    map[num]--;
  }
}

console.log(Math.abs(Math.min(...map)) + 1);

/** 개선된 코드
 * 1. count 배열을 생성하고 숫자 개수를 카운트해서 저장한다.
 * 2. count 6은 count9랑 같이 쓸 수 있으므로, 하나로 합쳐도 된다.
 * 3. 2에 의거해 count 6의 자리에 count 9를 더하고 2로 나눠서 올리면 필요한 6과 9의 개수가 된다.
 * 4. 필요한 개수의 최대값을 구한다.
 */

const count = Array(10).fill(0);

for (const digit of input) {
  const num = +digit;
  count[num]++;
}

count[6] = Math.ceil((count[6] + count[9]) / 2);

console.log(Math.max(...count.slice(0, 9)));
