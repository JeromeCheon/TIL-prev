class PersonExtends<T extends string | number> {
	// 이렇게 되면 T는 string이나 number만 가능
	// TS에서 프로그래밍 할 때 항상 타입은 가장 작은 단위를 사용하는 것이 좋아.
	// 따라서 generic을 사용하더라도 타입을 지정하게 해준다면 실수와 에러, 버그를 방지 할 수 있을 것
	private _name: T;
	constructor(name: T) {
		this._name = name;
	}
}

new PersonExtends('Jerome');
new PersonExtends(28);
// new PersonExtends(true); // 이러면 boolean은 제약이 있기 때문에 에러가 나
