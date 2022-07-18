import * as O from './option';

export const curry2 =
	<A, B, C>(f: (a: A, b: B) => C) =>
	(a: A) =>
	(b: B): C =>
		f(a, b);

// 인자 순서를 바꾸는 함수
export const flip =
	<A, B, C>(f: (a: A, b: B) => C) =>
	(b: B, a: A): C =>
		f(a, b);

// Array<A> == A[]
// map :: (Array<A>, (A => B)) => Array<B>
// chapter 2 끝부분 복습:  :: 앞부분에는 해당하는 값을 적고, 뒷부분에는 해당 값의 타입을 적는 표기법
export const map = <A, B>(array: Array<A>, f: (a: A) => B): Array<B> => {
	const result: Array<B> = [];
	for (const value of array) {
		result.push(f(value));
	}
	return result;
};

export const main2 = () => {
	const numbers = [1, 2, 3];
	const isEven = (x: number) => x % 2 === 0;

	// map 함수를 가지고 숫자의 짝수 여부에 따라 참거짓으로 변환하는 코드 작성하겠다.
	map(numbers, isEven);

	// curriedM<ap :: Array<A> => ((A => B) => Array<B>)
	const curriedMap = curry2(map);
	// currying 된 맵 함수를 사용한다면 이렇게 될 것
	curriedMap(numbers)(isEven);

	// TS의 array map 메서드를 사용한다면 이렇게 될 것
	// Array<A>.map :: (A => B) => Array<B>
	// 다른 관점에서 이렇게도 나타낼 것 map :: Array<A> ~> (A => B) => Array<B>
	numbers.map(isEven);
	// 이렇게 작은 함수들을 조합해서 더 큰 프로그램을 만들어낸 예시
	const map_ = curry2(flip(map));
	map_(isEven)(numbers);
};
