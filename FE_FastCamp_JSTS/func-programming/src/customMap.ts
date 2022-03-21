// Array에 있는 map 함수는 배열의 모든 원소에 동일한 함수를 적용한 후
// 그 결과를 돌려주는 함수

// f는 Array의 원소들에 적용되는 함수이기 때문에 입력 타입은 당연히 A가 되어야 할 것
// 출력 타입은 입력타입과 달라도 되기 때문에 또 다른 타입 파라미터가 필요해
// 그리고 이 map 함수의 반환값은 배열의 각 원소에 f가 적용된 값이기에 B의 배열일 것
export const map = <A, B>(array: Array<A>, f: (a: A) => B): Array<B> => {
  const result: Array<B> = [];
  // 1. for 문 사용
  for (const value of array) {
    result.push(f(value));
  }
  return result;
};
