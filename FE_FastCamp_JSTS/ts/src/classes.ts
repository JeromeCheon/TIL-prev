// 접근 제한자(Access modifier) = public, private, protected
// 한편, private을 표현하는 또다른 방법은 #을 이용하는 것.
class ClassCar {
  readonly name: string = "car";
  color: string;
  static wheels = 4;
  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }
  start() {
    console.log("start");
    console.log(this.name);
    console.log(ClassCar.wheels);
  }
}

class ClassBmw extends ClassCar {
  constructor(color: string, name: string) {
    super(color, name); // super를 호출하지 않으면 error가 남
  }
  showName() {
    console.log(super.name); // name은 묵시적으로 public이기에 접근 가능
    // 만약 private으로 바꾸면 접근 못하고 에러가 나.
  }
}

const z4 = new ClassBmw("black", "zzz4");
console.log(z4.name);
console.log(ClassCar.wheels);
