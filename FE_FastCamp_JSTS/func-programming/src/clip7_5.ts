// Promise 소개라는 내용으로 전개
// Option<A> = None | Some<A>
// Try<E, A> = Failed<E> | Success<A>
// CPS는 비동기라고 명명하겠다.
// Async<A> = ???

type Async<A> = (ret: (x: A) => void) => void;

const resolve = <A>(a: A): Async<A> => {
	return (ret) => {
		ret(a);
	};
};

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

// 이제 flatMap을 사용해서 map을 구현해보자.
const map = <A, B>(a: Async<A>, f: (a: A) => B): Async<B> => {
	return flatMap(a, (a_) => resolve(f(a_)));
	// return flatMap(a, (a_) => f(a_)); // 이렇게 하면 에러가 나는데 이유는 이 결과값인 B를 Async<B>에 할당할 수 없기 때문.
	// Option과 Try에서 해준 역할 비슷한걸 resolve라 명명하고 만들어보자.
};

const run = <A>(a: Async<A>) => {
	a(() => {
		return;
	});
};

// clip 7-5,6
// 함수 f, g, h 는 모두 인자를 두개씩 갖고 있는
// 첫번째 인자는 함수계산에 사용되는 값
// 두 번째 인자는 계산이 끝나면 결과를 전달할 콜백함수
// 일단 아래 형태는 커링을 사용해서 함수의 함수형태로 만들 수 있다
// const f = (str: string): Async<number> =>
// 그러면 여기서 아래 리턴하는 콜백이 우리가 구현하고자 하는 비동기 타입일 것. 이제 Async 를 정의해보자.
// (ret: (x: number) => void): void => {
// clip 7-6 함수 f의 리턴타입을 promise로 바꿔보자
// 이전 Async 와 CPS 적인 측면에서 크게 벗어나지 않다.
// 값을 반환할 때는 ret를 사용했지만, promise는 관례적으로 resolve를 사용함 + 두번째 인자 reject
const f = (str: string): Promise<number> =>
	new Promise((resolve, reject) => {
		if (str === '') {
			reject('빈 문자열은 입력할 수 없습니다.');
			return;
		}
		setTimeout(() => {
			console.log('f 호출: ' + str);
			resolve(str.length * 2);
		}, 500);
	});

const g = (n: number): Promise<number> =>
	new Promise((resolve, reject) => {
		if (n === 6) {
			reject('6은 입력할 수 없습니다.');
			return;
		}
		setTimeout(() => {
			console.log('g 호출: ' + n);
			resolve(n + 1);
		}, 500);
	});

const h = (x: number): Promise<boolean> =>
	new Promise((resolve, reject) => {
		if (x === 5) {
			reject('5는 입력할 수 없습니다.');
			return;
		}
		setTimeout(() => {
			console.log('h 호출: ' + x);
			resolve(x % 3 === 0);
		}, 500);
	});

const handleError = (e: unknown) => {
	// 사용자에게 에러를 알려주는 통합 함수
	console.log('handleError: ' + e);
};

const program = (s: boolean) => {
	console.log(s);
};

const greeting = (name: string) => {
	console.log('Hello, ' + name);
};

export const promMain1 = () => {
	/*
	const a = f('test');
	const b = flatMap(a, (a_) => g(a_));
	const c = flatMap(b, (b_) => h(b_));
	const result = map(c, (c_) => program(c_));
	// 이렇게 해도 콘솔에 변화가 없는 것은 비동기함수를 실행만 했지 값을 받아와서 리턴해주지 않았기 때문
	// 이 값을 리턴해주는 함수를 run이라고 명명하고 구현해보자
	run(result);
  */
	const a = f('test');
	// 이제 g함수에 a를 적용하려면? a가 Promise이니 바로 넣을 수는 없고 flatMap과 비슷한 함수가 필요해
	// Promise에서는 then 함수가 그 역할을 대신함
	const b = a.then((a_) => g(a_));
	const c = b.then((b_) => h(b_));
	// 그리고 Promise의 then은 map 함수 역할까지 대신하게 돼
	const result = c.then((c_) => program(c_));
	result.catch(handleError); // catch 사용은 Try의 getOrElse 사용을 연상케해
	greeting('world');
	console.log('프로그램 종료');
};
