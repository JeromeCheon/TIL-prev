function error(message: string): never {
	// 함수의 바디 부분이 끝나지 않아야 함 -> 에러를 throw 할 때
	throw new Error(message);
}

function fail() {
	// 이 때도 never로 추론이 돼
	return error('failed');
}

function infiniteLoop(): never {
	while (true) {}
}

let a: string = 'hello';

if (typeof a !== 'string') {
	let b: never = a;
}
//  조건부 타입 -> 잘못된 타입을 넣는 실수를 막기 위해 사용
type Indexable<T> = T extends string ? T & { [index: string]: any } : never;
