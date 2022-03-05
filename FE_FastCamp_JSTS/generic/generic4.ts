class Person<T, K> {
	private _name: T;
	private _age: K;

	constructor(name: T, age: K) {
		this._name = name;
		this._age = age;
	}
}

const person = new Person('Jerome', 28);
console.log(person);
