abstract class AbstractPerson {
	protected _name: string = 'Mark';

	abstract setName(name: string): void; // abstract 키워드가 붙이면 구현부 없어도 돼
	// 그리고 abstract를 붙이면 class 앞에도 abstract를 붙여줘야 해
}

class Person3 extends AbstractPerson {
	setName(name: string): void {
		this._name = name;
	}
}

const p12 = new Person3();
p12.setName('Jerome');
