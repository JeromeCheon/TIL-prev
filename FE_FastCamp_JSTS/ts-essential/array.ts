let list: number[] = [1, 2, 3];

let list2: (number | string)[] = [1, 2, 3, '4'];

// tuple
let x: [string, number];

x = ['hello', 39];

// x = [10, 'mark'] // 이러면 문제가 생겨. 순서가 안 맞기 때문

// x[2];

const person: [string, number] = ['Mark', 39];
const [first, second] = person; // destructuring. first: string, second: number
