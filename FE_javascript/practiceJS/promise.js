'use strict';

// Promise is a Javascript object for asynchronous operation.
// state: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
/* 우리가 원하는 기능을 비동기적으로 실행하는 Promise를 만들어보자 */
// 새로운 프로미스가 생성될 때는 자동으로 executor가 실행이 돼 
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files) 이런 것들은 비동기적으로
  console.log('doig somehting...');
  setTimeout(() => {
    resolve('jerome')
  }, 2000);
});

// 2. Consumers: them, catch, finally 이런거 사용해서 컨슈머 구성할 수 있다.
promise.then((value) => {
  console.log(value);
})

// 3. Promise Chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num));