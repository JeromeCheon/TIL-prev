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

type Iterator<A> = () => A;
type Observer<A> = (a: A) => void;
type Function<A, B> = (a: A) => B;

const map =
	<A, B>(f: (a: A) => B) =>
	<R>(input: Function<R, A>): Function<R, B> => {
		return (r) => {
			return f(input(r)); // 구조가 compose와 익숙하지?
		};
	};

// mapIsEven :: (R => number) => (R => boolean)
const mapIsEven = map(isEven);
const c1 = mapIsEven(getLength);

// 입력 타입에 대한 map은 contraMap이라고 함
// map의 일종이기 때문에 함수를 인자로 받음
const contraMap =
	<A, B>(f: (a: A) => B) =>
	<R>(input: Function<B, R>): Function<A, R> => {
		// map을 구현했을 때와 반대로 인풋의 결과가 리턴되어야 하고
		// input에 f(a)가 적용된 결과가 리턴되어야 함
		return (a) => {
			return input(f(a));
		};
	};
// 출력타입이 무엇이든 입력이 number인 함수를 입력하면
// 그것을 입력이 string인 함수로 변환시켜주는 함수
// map이 출력 타입을 변환시키는데 함수인자가 사용되었다면
// contraMap은 입력 타입을 변환시키는데에 사용
const contraMapGetLength = contraMap(getLength);

export const observMain5 = () => {};
