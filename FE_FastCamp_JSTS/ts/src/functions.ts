// 함수
// add 같은 기본적인 함수는 제낀다

// optional parameter
function hello(name?: string) {
  return `hello, ${name || "world"}`;
}
// 물론 자바스크립트의 default 매개변수를 이용해서 다음처럼도 가능
function hello2(name = "world") {
  return `hello ${name}`;
}

const result = hello(); // 매개변수 없어도 에러가 안나
const result2 = hello2();

// 나머지 연산자 매개변수
function addOp(...nums: number[]) {
  // 배열로 받을 수 있게.
  return nums.reduce((result, num) => result + num, 0);
}

addOp(1, 2, 3);
addOp(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// this 사용하기
interface thisUser {
  name: string;
}
const Sam: thisUser = { name: "Sam" };

// function showName() {
function showName(this: thisUser) {
  console.log(this.name);
}

const tmp = showName.bind(Sam);
tmp();

// join 사용
interface joinUser {
  name: string;
  age: number;
}

function join(name: string, age: string): string;
function join(name: string, age: number): joinUser;
function join(name: string, age: number | string): joinUser | string {
  if (typeof age === "number") {
    return {
      name,
      age,
    };
  } else {
    return "나이는 숫자로 입력해주세요.";
  }
}
const sam: joinUser = join("Sam", 30);
const jane: string = join("Jane", "30");
