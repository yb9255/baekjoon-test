/** https://www.acmicpc.net/problem/9536 */

const [T, ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let line = 0;
const answers = [];

/**
 * Pseudo Code
 * 1. 첫번째 줄의 sounds를 split한다
 * 2. 2 ~ 마지막 줄에 있는 goes 뒤의 울음소리를 otherSounds에 중복없이 저장한다.
 * 3. sounds에서 otherSounds에 있는 소리를 filter 후 로그한다.
 */

for (let t = 0; t < +T; t++) {
  const sounds = lines[line++].trim().split(' ');
  const otherSounds = new Set();

  while (true) {
    const script = lines[line++].trim();
    if (script === 'what does the fox say?') break;

    const parts = script.split(' ');
    otherSounds.add(parts[2]);
  }

  const fox = sounds.filter((snd) => !otherSounds.has(snd));
  answers.push(fox.join(' '));
}

console.log(answers.join('\n'));
