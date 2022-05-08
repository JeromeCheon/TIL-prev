// 값이 있을수도, 없을 수도 있는 자료구조

// export type Option<A> = A | undefined; // 그러나 이런 방법은 undefined가 혼동을 야기 할 수 있어

// None은 다른 값을 가지지 않아도 되지만,
// Some은 다른 값이 있어야 하기에 값을 하나 받도록 하자 -> generic
// 또 함수형 프로그래밍에서는 값의 변경을 허용하지 않기에 readonly 사용
export type Some<A> = {
	readonly _tag: 'Some';
	readonly value: A;
};

export type None = {
	readonly _tag: 'None';
};

export type Option<A> = Some<A> | None; // Some 과 None의 union읊 만들자.

export const some = <A>(value: A): Option<A> => ({ _tag: 'Some', value });
export const none = (): Option<never> => ({ _tag: 'None' });

// A와 undefined의 union을 사용하는 것 대신 위와 같이 구현하는 이유는
// 타입을 더 정확하고 안전하게 다루기 위함
// 이는 대소자료구조인 ADT를 흉내낸 것이며, 최근 개발된 언어에선 비슷한 기능제공.

export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === 'Some'; // 이렇게 is 를 써서 type guard 사용

export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === 'None';

export const fromUndefined = <A>(a: A | undefined): Option<A> => {
	// 입력값이 undefined 면 None을 return 하고 아니면 some을 리턴한다
	if (a === undefined) return none();
	return some(a);
};

// 자 이제 cart에서 사용된 if 문을 refactoring 해볼텐데,
// 값이 없으면 지정된 값을 사용한다.
// 값이 있다면 해당 값을 사용한다.
// 이러한 역할을 수행하는 함수를 만들어보자. 그 함수의 인자는 뭐가 되어야 할까?
// Option 타입의 값 하나와 해당 옵션에 대한 값의 타입과 동일한 값을 하나 입력받아야 해

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
	// 이 함수는 값이 없을 때 대신 사용할 값을 defaultValue를 통해 줌으로써 옵션으로 감싸진 임의의 타입 A를
	// 옵션을 제거한 순수한 타입의 A라는 값으로 변경해주는 역할
	// 값이 없으면 지정된 값을 사용한다.
	if (isNone(oa)) return defaultValue;
	// 값이 있다면 해당 값을 사용한다.
	return oa.value;
};

// Option의 map 구현하기
export const map = <A, B>(oa: Option<A>, f: (a: A) => B): Option<B> => {
	// 값이 없으면 값이 없는 상태를 유지함
	if (isNone(oa)) return oa;
	// 값이 있으면 값을 함수에 적용함
	return some(f(oa.value));
};

export const mapOrElse = <A, B>(
	oa: Option<A>,
	f: (a: A) => B,
	defaultValue: B
): B => {
	// 이 함수가 실행되기 위해서는 map이 먼저 선행되어야 하기에, map 인자를 가져온다.
	return getOrElse(map(oa, f), defaultValue);
};
