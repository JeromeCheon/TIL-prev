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

const filterObserver =
	<A>(pred: (a: A) => boolean) =>
	(subscribe: Observer<A>): Observer<A> => {
		// 출력은 a타입의 값을 입력받는 함수이고
		return (a) => {
			// 값이 조건에 맞을 때만 subscribe에 값을 전달함
			if (pred(a)) {
				subscribe(a);
			}
		};
	};

// map :: (A => B) => Array<A> => Array<B>
// mapObserver :: (A => B) => Observer<B> => Observer<A>
// 지금까지의 map 함수와는 달리 Observer<B>를 입력받고 Observer<A> 를 리턴해
const mapObserver =
	<A, B>(f: (a: A) => B) =>
	(subscribe: Observer<B>): Observer<A> => {
		return (a) => {
			subscribe(f(a));
		};
	};

// map :: (A => B) => Observable<A> => Observable<B>
// lift :: (Observer<B> => Observer<A>) => Observable<A> => Observable<B>
const lift =
	<A, B>(f: (b: Observer<B>) => Observer<A>) =>
	(source: Observable<A>): Observable<B> => {
		// Observable은 subscribe가 전달되는 함수
		return (subscribe) => {
			// source에는 observer<A>가 전달되어야 함
			source(f(subscribe));
		};
	};

// const liftedMap = <A, B>(f: (a: A) => B) => lift(mapObserver(f));
const liftedMap = pipeFunctions(mapObserver, lift);
const liftedFilter = pipeFunctions(filterObserver, lift);
// 함수들을 커링해서 만들었기 때문에 이러한 방식이 가능한 것
export const observMain4 = () => {};
