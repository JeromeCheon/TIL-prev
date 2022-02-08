// Generics

// T는 Type parameter. 보통 T를 사용함. 다른 문자도 상관없음
function getSize<T>(arr: T[]): void {
  return console.log(arr.length);
}

const arr1 = [1, 2, 3];
getSize<number>(arr1); // 이렇게 사용하는 쪽에서 타입을 지정해줘.

const arr2 = ["a", "b", "c"];
getSize<string>(arr2); // 3

const arr3 = [false, true, true];
getSize<boolean>(arr3); // 3

const arr4 = [{}, {}, { name: "tim" }];
getSize(arr4); // 타입을 명시 하지 않아도 JS가 알아서 추론하기도 함
