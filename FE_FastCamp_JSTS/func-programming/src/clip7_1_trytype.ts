import * as T from './try';

const f = (a: string): T.Try<number, string> => {
	if (a === '') {
		return T.failed('빈 문자열은 입력할 수 없습니다.');
	}
	return T.success(a.length * 2);
};

const g = (n: number): T.Try<number, string> => {
	if (n === 6) {
		return T.failed('6은 입력할 수 없습니다.');
	}
	return T.success(n + 1);
};

const h = (x: number): T.Try<boolean, string> => {
	if (x === 5) {
		return T.failed('5는 입력할 수 없습니다.');
	}
	return T.success(x % 3 === 0);
};

const handleError = (e: unknown) => {
	// 사용자에게 에러를 알려주는 통합 함수
	console.log('handleError: ' + e);
};

const greeting = (name: string) => {
	console.log('Hello, ', name);
};

const program = (b: boolean) => {
	console.log(b);
};

export const reviewEHandling2 = () => {
	const a = 'abc';
	const b = f(a);
	// const c = T.flatMap(b, (b_) => g(b_));
	// const c = T.map(b, (b_) =>
	// 	T.getOrElse(g(b_), (e) => 3)); // 반환값이 num이 아닌 Try이기 때문에 에러나는 걸 이렇게 flatMap -> Map으로 바꿔서 해결할 수도 있어.
	// 근데 가급적 다른 함수를 건드리지 않고 Try를 반환하게 해서 flatMap 사용하는 것이 좋아.
	const c = T.flatMap(b, (b_) => T.success(T.getOrElse(g(b_), (e) => 3)));
	const d = T.flatMap(c, (c_) => h(c_));
	const result = T.map(d, (d_) => program(d_));
	T.getOrElse(result, (e) => handleError(e));

	greeting('world');
	console.log('프로그램이 종료되었습니다.');
};
