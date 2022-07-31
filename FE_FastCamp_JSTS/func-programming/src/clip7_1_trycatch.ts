const f = (a: string) => {
	if (a === '') {
		throw new Error('빈 문자열은 입력할 수 없습니다.');
	}
	return a.length * 2;
};

const g = (n: number) => {
	if (n === 6) {
		throw new Error('6은 입력할 수 없습니다.');
	}
	return n + 1;
};

const h = (x: number) => {
	if (x === 5) {
		throw Error('5는 입력할 수 없습니다.');
	}
	return x % 3 === 0;
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

export const reviewEHandling = () => {
	try {
		const a = 'abc';
		const b = f(a);
		const c = g(b);
		const d = h(c);
		program(d);
	} catch (e) {
		handleError(e);
	}

	greeting('world');
	console.log('프로그램이 종료되었습니다.');
};
