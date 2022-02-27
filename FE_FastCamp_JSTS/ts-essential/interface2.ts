interface IPerson1 {
	name: string;
	age?: number;
	hello(): void;
}

class Person implements IPerson1 {
	name: string;
	age?: number | undefined;

	constructor(name: string) {
		this.name = name;
	}
	hello(): void {
		console.log(`안녕하세요, ${this.name}입니당~`);
	}
}

// 클래스 또한 타입처럼 사용할 수 있다
const person23 = new Person('Mark');
