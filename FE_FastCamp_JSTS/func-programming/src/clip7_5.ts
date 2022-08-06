// Promise 소개라는 내용으로 전개
// Option<A> = None | Some<A>
// Try<E, A> = Failed<E> | Success<A>
// CPS는 비동기라고 명명하겠다.
// Async<A> = ???

type Async<A> = (ret: (x: A) => void) => void;

// 그렇다면 Async 에도 map과 flatMap이 있을까? 있긴 한데 그 형태가 좀 달라
// flatMap 부터 먼저 만들어보자
const flatMap = <A, B>(a: Async<A>, f: (a: A) => Async<B>): Async<B> => {
	return (ret) => {
		a((a_) => {
			const b = f(a_);
			b((b_) => ret(b_));
		});
	};
};

// 함수 f, g, h 는 모두 인자를 두개씩 갖고 있는
// 첫번째 인자는 함수계산에 사용되는 값
// 두 번째 인자는 계산이 끝나면 결과를 전달할 콜백함수
// 일단 아래 형태는 커링을 사용해서 함수의 함수형태로 만들 수 있다
const f =
	(str: string): Async<number> =>
	// 그러면 여기서 아래 리턴하는 콜백이 우리가 구현하고자 하는 비동기 타입일 것. 이제 Async 를 정의해보자.
	// (ret: (x: number) => void): void => {
	(ret) => {
		setTimeout(() => {
			console.log('f 호출: ' + str);
			ret(str.length * 2);
		}, 500);
	};

const g =
	(n: number): Async<number> =>
	(ret) => {
		setTimeout(() => {
			console.log('g 호출: ' + n);
			ret(n + 1);
		}, 500);
	};

const h =
	(x: number): Async<boolean> =>
	(ret) => {
		setTimeout(() => {
			console.log('h 호출: ' + x);
			ret(x % 3 === 0);
		}, 500);
	};

const handleError = (e: unknown) => {
	// 사용자에게 에러를 알려주는 통합 함수
};
