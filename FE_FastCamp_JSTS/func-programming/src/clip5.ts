// 숫자를 그대로 돌려주는 함수
const idNumber = (n: number) => {
	return n;
};
// 문자열을 그대로 돌려주는 함수
const idString = (s: string) => {
	return s;
};
// boolean값을 그대로 돌려주는 함수
const idBoolean = (b: boolean) => {
	return b;
};
// 어떤 타입의 값이라도 그대로 돌려주는 함수
const id = <T>(x: T) => {
	return x;
};

type T1 = Array<string>;
