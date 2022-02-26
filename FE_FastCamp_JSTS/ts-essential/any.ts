function returnAny(message: any): any {
	console.log(message);
}

const any1 = returnAny('아무거나 리턴해봐');

// any1.toString();
let looselyTyped: any = {};

const d = looselyTyped.a.b.c.d; // 이렇게 에러가 아무것도 안 뜨지. 타입 안정성을 잃게 돼
