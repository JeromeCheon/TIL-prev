type Score = "A" | "B" | "C" | "F";
interface User {
  name: string;
  age: number;
  gender?: string; // 입력을 해도 되고 안해도 되는 optional 한 속성
  readonly birthYear: number; // 이번에는 readOnly 속성을 만들어보자
  // 만약 어떤 값들(ex, grade)이 연속적으로 생긴다고 하면 그것들 모두 일일이 인터페이스에 정의하기 힘들것
  // [grade:number] : string; // 이를 []로 하여 key에 따른 value 값을 넣게끔 할 수 있다. grade는 의미없고 key 등 아무렇게나 입력 가능
  // 근데 위, string은 너무 모호하고 범위가 넓어. 얘를 특정 string만으로 축소시키고 싶다면, 위 type으로 정의해서
  [grade: number]: Score; // 이렇게도 할 수 있음
}

let user: User = {
  name: "xx",
  age: 30,
  birthYear: 2000,
};

user.age = 10;
user.gender = "male";
// user.birthYear = 1899; readonly 속성이기 때문에 수정하려고 시도하면 에러나
console.log(user.age);

interface Add {
  (num1: number, num2: number): number;
}

const add: Add = function (x, y) {
  return x + y;
};
add(10, 20);

// 이번에는 boolean 타입의 함수 인터페이스를 만들어보자
interface IsAdult {
  (age: number): boolean;
}
const trueAdult: IsAdult = (age) => {
  return age > 19;
};
trueAdult(33);

// implements
interface Car {
  color: string;
  wheels: number;
  start(): void;
}
class Bmw implements Car {
  wheels = 4;
  color;

  constructor(c: string) {
    this.color = c;
  }
  start(): void {
    console.log("go...");
  }
}

const bmw = new Bmw("red");
console.log(bmw);
bmw.start();

// 한편 interface는 확장이 가능해. 이 때는, extends 키워드 사용
interface Benz extends Car {
  // Car 인터페이스 속성들 그대로 가져오면서 추가 정의 가능
  door: number;
  stop(): void;
}

// 또 두개 이상 동시 확장도 가능해
interface Toy {
  name: string;
}

interface ToyCar extends Toy, Car {
  price: number;
}
