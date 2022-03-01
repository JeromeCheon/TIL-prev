class Parent {
	constructor(protected _name: string, private _age: number) {}

	public print(): void {
		console.log(`이름은 ${this._name}이고, 나이는 ${this._age} 입니다. `);
	}

	protected printName(): void {
		console.log(this._name, this._age);
	}
}

const p = new Parent('Jerome', 24);
p.print(); // 잘 동작하는 것 확인

class Child extends Parent {
	// 자 그럼 기존에 있던 프로퍼티를 override 해보자 (접근제어자도 override 돼 )
	// public _name = 'Jerome Jr.';
	constructor(age: number) {
		// 한편, 자식의 생성자에서는 super를 무조건 먼저 선언해줘야 함
		super('Jerome Jr.', age);
		this.printName();
	}
	public gender = 'male';
}

const c = new Child(6);
c.print();
