/** https://www.acmicpc.net/problem/5014 */

const [F, S, G, U, D] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. 0부터 F까지 길이를 가진 visited를 만들고, queue에 현재 층수 S와 count를 담는다.
 * 2. queue를 bfs로 순회하면서, 현재 층수 S에 U를 담은 케이스와 D를 담은 케이스에
 * count에 1을 더해서 넣는다. 이 때 U가 F를 넘거나, D가 0이 되면 순회하지 않는다.
 *
 * 3. 층수를 들릴때마다 visited를 기록하고, 이 후 visited일 경우방문하지 않도록 한다.
 * 4. queue를 꺼냈을 때 G와 값이 같다면 count를 리턴한다.
 * 5. queue를 끝까지 돌았는데도 G와 같은 값이 없었다면 use the stairs를 리턴한다.
 */

const visited = Array(F + 1).fill(false);

const queue = [[S, 0]];
visited[S] = true;

let front = 0;

while (front < queue.length) {
  const [floor, count] = queue[front++];

  if (floor === G) {
    console.log(count);
    process.exit();
  }

  if (floor + U <= F && !visited[floor + U]) {
    visited[floor + U] = true;
    queue.push([floor + U, count + 1]);
  }

  if (floor - D > 0 && !visited[floor - D]) {
    visited[floor - D] = true;
    queue.push([floor - D, count + 1]);
  }
}

console.log('use the stairs');
