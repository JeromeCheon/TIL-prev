declare const maybe: unknown;
// const aNumber: number = maybe; // 이럴 때는 바로 aNumber에 할당할 수 없음

if (maybe === true) {
	// if문은 런타임에 실행돼
	const aBoolean: boolean = maybe;
	// const aString: string = maybe; // 이 때는 maybe가 위에서 true로 'type guard' 되었기 때문에 에러가 나
}

if (typeof maybe === 'string') {
	// 런타임에 수행해서 타입이 한정된다. 이렇게 타입을 고정시켜놓을 필요가 있을 때 unknown을 사용해
	const aString: string = maybe;
}
