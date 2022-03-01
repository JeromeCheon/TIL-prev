class Person2 {
	// 보통 여기에 property를 놓고 생성자에서 this.name = name 이렇게 할텐데
	// 여기 매개변수에서 다음과 같이 접근제어자를 같이 명시해서 코드를 단축시킬 수도 있다
	// 많이 쓰는 방법이니 참고해두자
	public constructor(private _name: string, public age: number) {}
	get name() {
		console.log('get');
		return this._name;
	}
	set name(n: string) {
		this._name = n;
	}
	// 이렇게 static을 사용해서는 공통적인 내용을 공유할 수 있음
	public static CITY = 'Seoul';
}

const p22: Person2 = new Person2('Jerome', 28);
console.log(p22.name, p22.age); // get을 하는 함수 getter
p22.name = 'jerome'; // set을 하는 함수 setter
console.log(p22.name, p22.age);

console.log(Person2.CITY);
