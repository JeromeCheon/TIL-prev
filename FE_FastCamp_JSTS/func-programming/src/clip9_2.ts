import * as O from './option';

// compose는 함수 실행 순서가 뒤에 입력된 함수부터
const compose =
	<B, C>(g: (b: B) => C) =>
	<A>(f: (a: A) => B) =>
	(a: A): C =>
		g(f(a));

const getLength = (s: string): number => {
	return s.length;
};

const isEven = (n: number): boolean => {
	return n % 2 === 0;
};

// 불변성 : 값을 할당하면 바꿀 수 없는 것
const x = 2;

// apply 함수를 currying 시켜서 사용할 것
// 타입만 단순화해서 적어보면 다음과 같다.
// apply :: (A => B) => A => B
const apply =
	<A, B>(f: (a: A) => B) =>
	(a: A): B =>
		f(a);

// x2 :: boolean
const x2 = apply(isEven)(x);

const anotherIsEven = apply(isEven);
const anotherGetLength = apply(getLength);

// f1 :: string => boolean
// const f1 = compose(isEven)(getLength);
const f1 = apply(compose(isEven)(getLength)); // apply 를 적용해도 동일
const f2 = compose(apply(isEven))(apply(getLength));

// optionIsEven :: Option<number> => Option<boolean>
const optionIsEven = O.map(isEven);
// optionGetLength :: Option<string> => Option<number>
const optionGetLength = O.map(getLength);

// of1 :: Option<string> => Option<boolean>
const of1 = O.map(compose(isEven)(getLength));

const of2 = compose(O.map(isEven))(O.map(getLength));
export const observMain5 = () => {};
