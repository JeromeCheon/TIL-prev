'use strict';

// 기본 Array 🎉 API들 

// 1. 선언
const arr1 = new Array();
const arr2 = [1, 2];
console.clear();

// 4. Addition, deletion, copy
const fruits = ['🍎', '🍐']; // 이모지들은 문자열로 취급
// push: add an item to the end
fruits.push('🍓', '🍒');
console.log(fruits);

// pop: remove an item from the end
fruits.pop();
fruits.pop();
console.log(fruits);
// unshift: add an item to the beginning
fruits.unshift('🍓', '🥑');
console.log(fruits);
// shift remove an item from the beginning
fruits.shift();
// 근데 shift 랑 unshift는 pop, push 보다 많이 느려 
console.log(fruits);
// splice: remove an item by index position
// fruits.splice(1, 1); // 두번째를 입력하지 않으면 그 뒤 내용은 전부 지우겠다는 의미

// 5. Searching
// find the index
console.clear();
console.log(fruits);
console.log(fruits.indexOf('🍎'));

// includes
console.log(fruits.includes('🍎'));

// lastIndexOf
// 맨 마지막에 나오는 인덱스의 값을 받아온다. 

///////////////////////////////////////////////
