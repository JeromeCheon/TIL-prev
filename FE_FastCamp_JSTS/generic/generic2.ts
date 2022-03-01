function helloBasic<T, U>(message: T, comment: U): T {
	return message;
}

helloBasic(36, 24); // 이건 기본적으로 type 지정 생략함으로써, 좁은 범위의 타입으로 T를 추론하게 함
helloBasic<string, number>('jerome', 24); // <> 안에 type을 지정함으로써 매개변수 값의 타입도 지정할 수 있음
