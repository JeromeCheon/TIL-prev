// 실패하거나 성공했을 때 각각 다른 값을 가지는 자료구조
// 에러를 값으로 다루자
// Option에서 some과 none으로 처리했던 것 처럼 try에서도 success/failed 처리하게.

type Success<R> = {
	readonly _tag: 'success'; // 불변성 -> 참조 투명성 연관
	readonly result: R;
};

type Failed<E> = {
	readonly _tag: 'failed';
	readonly error: E;
};

export type Try<R, E> = Success<R> | Failed<E>;

export const success = <R>(result: R): Try<R, never> => ({
	_tag: 'success',
	result,
});

export const failed = <E>(error: E): Try<never, E> => ({
	_tag: 'failed',
	error,
});

export const isSuccess = <R>(ta: Try<R, unknown>): ta is Success<R> =>
	ta._tag === 'success';

export const isFailed = <E>(ta: Try<unknown, E>): ta is Failed<E> =>
	ta._tag === 'failed';

export const getOrElse = <R, E>(
	ta: Try<R, E>,
	defaultValue: (e: E) => R
): R => {
	// 에러가 있을 경우 기본 값을 사용
	if (isFailed(ta)) return defaultValue(ta.error);
	// 결과가 성공이라면 해당 값을 사용
	return ta.result;
};

// try의 map은 Option과 크게 다르지 않으나, 한가지 주의해야 할 점은
// 성공했을 때 결과의 타입은 인자로 주어진 함수에 의해 변경될 수 있지만
// 에러의 타입은 변경되지 않는다.
export const map = <E, A, B>(ta: Try<A, E>, f: (a: A) => B): Try<B, E> => {
	if (isFailed(ta)) return ta;
	return success(f(ta.result));
};

// Array<T.Try<ParseError, ParsedItem>> => Array<ParsedItem>
// export const KeepSuccess = <E, R>(tas: Array<Try<R, E>>): Array<R> => {
//   const ret = tas.map((ta) => {
//     if (isSuccess(ta)) return ta.result;
//     else return ta.error
//     // 근데 반환값이 성공값이기 때문에 error를 리턴해도 undefined를 함축한다.
//     // 그러므로 단순히 map함수만으로는 역부족이야.
//     // 이 문제를 해소하는 것이 flatMap
//   })
//   return ret;
// };

// flatMap :: (A => Array<B>) => (Array<A> => Array<B>)
// map :: (A => B)   => (Array<A> => Array<B>)
// map이 구조를 보전한다면 flatMap은 구조를 변경하는 역할을 함
export const KeepSuccess = <E, R>(tas: Array<Try<R, E>>): Array<R> => {
	const ret = tas.flatMap((ta) => {
		if (isSuccess(ta)) return [ta.result];
		else return [];
	});
	return ret;
};
// 이제 우리가 만든 KeepSuccess를 totalCalculator에 적용해볼 차례. (ch 6-8)
// validation 위주의 프로그램을 파싱 위주의 프로그램으로 바꿔봄
// (ch 6-9) KeepSuccess 함수를 for loop로 구현해보고 flatMap도 구현해보면서
// 명령형과 선언형에 대한 얘기 진행해보자

export const KeepSuccessWithFor = <E, R>(tas: Array<Try<R, E>>): Array<R> => {
	const ret: Array<R> = [];
	// 1. for loop 부터 작성
	for (const ta of tas) {
		// 성공인지 여부 확인 작성
		if (isSuccess(ta)) {
			// 성공이라면 이걸 누적 해놓을 다른 배열이 필요해
			ret.push(ta.result);
		}
	}
	return ret;
};

// flat :: Try<E, Try<E, A>> => Try<E, A>
export const flat = <A, E>(tta: Try<Try<A, E>, E>): Try<A, E> => {
	if (isSuccess(tta)) return tta.result;
	return tta;
};

// return type이 그냥 B가 아닌 Try B라는 것
export const flatMap = <A, E, B>(
	ta: Try<A, E>,
	f: (a: A) => Try<B, E>
): Try<B, E> => {
	return flat(map(ta, f));
};
