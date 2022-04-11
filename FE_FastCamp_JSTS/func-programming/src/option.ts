// 값이 있을수도, 없을 수도 있는 자료구조

// export type Option<A> = A | undefined; // 그러나 이런 방법은 undefined가 혼동을 야기 할 수 있어

// None은 다른 값을 가지지 않아도 되지만,
// Some은 다른 값이 있어야 하기에 값을 하나 받도록 하자 -> generic
// 또 함수형 프로그래밍에서는 값의 변경을 허용하지 않기에 readonly 사용
export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

export type None = {
  readonly _tag: "None";
};

export type Option<A> = Some<A> | None; // Some 과 None의 union읊 만들자.

export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });
export const none = (): Option<never> => ({ _tag: "None" });

// A와 undefined의 union을 사용하는 것 대신 위와 같이 구현하는 이유는
// 타입을 더 정확하고 안전하게 다루기 위함
// 이는 대소자료구조인 ADT를 흉내낸 것이며, 최근 개발된 언어에선 비슷한 기능제공.

export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some"; // 이렇게 is 를 써서 type guard 사용

export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === "None";
