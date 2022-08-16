const pipeFunctions =
	<A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
	(a: A): C => {
		return g(f(a));
	};

type Observer<A> = (a: A) => void;
type Observable<A> = (subscribe: Observer<A>) => void;

// currying을 사용해서 Observable의 map을 구현한다.
const map =
	<A, B>(f: (a: A) => B) =>
	(source: Observable<A>): Observable<B> => {
		return (subscribe) => {
			source((a) => {
				const b = f(a);
				subscribe(b);
			});
		};
	};

const filter =
	<A>(pred: (a: A) => boolean) =>
	(source: Observable<A>): Observable<A> => {
		return (subscribe) => {
			source((a) => {
				// source에 값이 전달 될 때 이값을 사용할지를 판단해서
				// 사용할 떄만 observable의 subcscibe에 값을 전달함
				if (pred(a)) {
					subscribe(a);
				} // => 이렇게 반복되는 코드가 생기지? 이는 추상화가 가능하다는 것이고 이것은 lift가 돼
			});
		};
	};

export const observMain4 = () => {};
