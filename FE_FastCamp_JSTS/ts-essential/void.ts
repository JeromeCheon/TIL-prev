function returnVoid(message: string) {
	// 함수 반환 타입에 void를 명시해줘도 돼고, 암묵적으로도 void를 추론함
	console.log(message);

	// return undefined; // undefined만 유일하게 void에 할당이 가능함
}

returnVoid('there is no return');
