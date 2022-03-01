function helloString(message: string) {
	return message;
}

function helloNumber(message: number): number {
	return message;
}

function helloGeneric<T>(message: T): T {
	return message;
}

// 더 많은 반복된 함수들... any를 써서 할 수도 있겠으나, 그러면 length 같은걸 사용 못해
/* function hello(message: any): any {
  return message;
} */

console.log(helloGeneric('Jerome').length);
console.log(helloGeneric(39));
