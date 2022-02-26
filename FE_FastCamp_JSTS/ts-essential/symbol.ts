console.log(Symbol('foo') === Symbol('foo'));

const sym = Symbol();

const obj = {
  [sym]: 'value',
};

obj[sym]; // 이렇게 변수로 접근 가능
// 함수로 사용할 때는 대문자 Symbol, 변수로 사용할 때는 소문자 symbol