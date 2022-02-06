let age: number = 30;
let isAdult: boolean = true;
let a: number[] = [1, 2, 3];
let a2: Array<number> = [2, 3, 4];

let week1: string[] = ["mon", "tue", "wed"];
let week2: Array<string> = ["mon", "tue", "wed"];

week1.push("3"); // 만약 숫자를 여기에 기입하면 에러가 나겠지.

// tuple (튜플)
let b: [string, number];

b = ["1", 2];
// b = [1, "2"]; // 이건 에러나.
b[0].toLowerCase(); // 두번째 인자를 하면 에러나겠지.

// void -> return 하는 값이 없을 때
function sayHello(): void {
  console.log("hello");
}
// never
function showError(): never {
  throw new Error();
}
function infLoop(): never {
  while (true) {
    // do something
  }
}

// enum
enum Os {
  Windows = 3, // 값을 넣어주지 않으면 0부터 시작해. 또 숫자아닌 문자를 넣어줄 수도 있어.
  Ios = 10,
  Android,
}

// null, undefined
let nullVal: null = null;
let undefVal: undefined = undefined;
