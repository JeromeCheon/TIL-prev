type Async<A> = (ret: (x: A) => void) => void;

const promiseF = (str: string): Promise<string> =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('promiseF 1: ' + str);
		}, 500);

		setTimeout(() => {
			resolve('promiseF 2: ' + str);
		}, 1000);
	});

const asyncF =
	(str: string): Async<string> =>
	(ret) => {
		setTimeout(() => {
			ret('asyncF 1: ' + str);
		}, 500);

		setTimeout(() => {
			ret('asyncF 2: ' + str);
		}, 1000);
	};

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

export const observMain1 = () => {
	console.clear();
	asyncF('test');
	greeting('world');
	console.log('프로그램이 종료되었습니다.');
};
