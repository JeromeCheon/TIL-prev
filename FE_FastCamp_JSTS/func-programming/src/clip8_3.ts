// 이 코드는 앞에서 우리가 정의한 Observer를 사용해서 정해진 주기로 자연수를 생성하는 함수
// 이를 RxJS의 Observable로 대체해보겠다.

type Observer<A> = (a: A) => void;
type Observable<A> = (subscribe: Observer<A>) => void;

const isEven = (n: number) => n % 2 === 0;
const integerObservable: Observable<number> = (subscribe) => {
	let i = 0;
	setInterval(() => {
		i = i + 1;
		subscribe(i);
	}, 1000);
};

const ns: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const observMain3 = () => {};
