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

	// 그렇다면 새로만든 map함수의 타입은 어떻게 될까??
	// map_ :: (A => B) => Array<A> => Array<B>
	const map_ = curry2(flip(map));
	map_(isEven)(numbers); // 지난 5_5에서는 이렇게 모든 인자를 다 열거했었음
	// 근데 이 새로운 map 함수는 currying이 되어 있어 하나만 넣어도 돼
	// isEven :: number => boolean
	// mapIsEven :: Array<number> => Array<boolean>
	const mapIsEven = map_(isEven);
	isEven(42);
	isEven(7);

	mapIsEven(numbers);
	mapIsEven([]);
	mapIsEven([42]);

	const omap = curry2(flip(O.map));
	// optionIsEven :: Option<number> => Option<boolean>
	const optionIsEven = omap(isEven);

	// 지금까지 우리는 부수효과를 추상화한 자료구조인 배열과 옵션을 만들어보고 사용했음
	// 그리고 map이라는 부수효과를 동반하는 데이터에 순수함수를 적용할 수 있는 공통적인 인터페이스를 가지고 있는
	// 함수를 발견했음. (map)
	optionIsEven(O.some(42));
	optionIsEven(O.none());
};
