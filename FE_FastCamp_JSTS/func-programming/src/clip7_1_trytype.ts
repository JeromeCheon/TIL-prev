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
	try {
		const a = 'abc';
		const b = f(a);
		const c = T.flatMap(b, (b_) => g(b_));
		const d = T.flatMap(c, (c_) => h(c_));
		T.map(d, (d_) => program(d_));
	} catch (e) {
		handleError(e);
	}

	greeting('world');
	console.log('프로그램이 종료되었습니다.');
};
