'use strict';

// 1. Class declarations
class Person {
  // constructor
  constructor(name, age) {
    // fields
    this.name = name;
    this.age = age;
  }
  // methods
  speak() {
    console.log(`${this.name} hello~`);
  }
}
// 2. Getter and setters
class User{
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    // if (value < 0) {
    //   throw Error('age cannot be under 0');
    // }
    this._age = (value >= 0) ? value : 0; // 일단 this.age 로 하면 계속 call stack을 호출하는 상황 발생.
    // 따라서 다음과 같이 getter 와 setter에 under bar 를 넣고 private 해야함
  }
}

const jerome = new User('jerome', 'Cheon', -1);
console.log(jerome.age);