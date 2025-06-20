const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 * 1. base condition: N === 3이면 ['  *  ', ' * * ', '*****'] 배열을 리턴한다.
 * 리턴되는 문자열은 이미 좌우대칭이므로, 가운데 공백을 껴서 붙이면 좌우 대칭이 된다.
 *
 * 2. 이전 트리(prevTree)를 재귀적으로 구한다.
 * 3. 상단은 공백 + prevTree + 공백을 붙여 만든다. (양 옆에 size를 반으로 나눈 공백을 더해서 가운데 정렬)
 * 4. 좌하와 우하는 prevTree + ' ' + prevTree를 붙여 만든다. (좌우 대칭)
 * 5. 상하를 합쳐서 newTree를 만든다.
 */

const buildTree = (size) => {
  if (size === 3) return ['  *  ', ' * * ', '*****'];

  const prevTree = buildTree(size / 2);
  const space = ' '.repeat(size / 2);
  const newTree = [];

  for (let line of prevTree) {
    newTree.push(space + line + space);
  }

  for (let line of prevTree) {
    newTree.push(line + ' ' + line);
  }

  return newTree;
};

console.log(buildTree(N).join('\n'));
