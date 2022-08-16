// 이 코드는 앞에서 우리가 정의한 Observer를 사용해서 정해진 주기로 자연수를 생성하는 함수
// 이를 RxJS의 Observable로 대체해보겠다.
// type Observer<A> = (a: A) => void;
// type Observable<A> = (subscribe: Observer<A>) => void;

import { filter, Observable, pipe, take } from 'rxjs';

const isEven = (n: number) => n % 2 === 0;
const integerObservable: Observable<number> = new Observable((subscribe) => {
	let i = 0;
	setInterval(() => {
		i = i + 1;
		subscribe.next(i);
	}, 1000);
});

const ns: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const observMain3 = () => {
	// 배열에 있는 filter와 slice 메서드를 이용하면 간단하게 구현할 수 있음
	const xs = ns.filter(isEven).slice(0, 3);
	// 배열에서는 이런 부수 함수들을 메서드로 구현해놓은 반면, RxJS에서는 Observable에 관한 함수를 '함수'로 구현해놓았다.
	// 이를 Operator라고 하며, 위 filter, slice에 해당하는 operator가 있다. filter는 filter 함수, slice는 take함수
	// Array의 메서드는 묵시적으로 자기 자신을 인자로 받음
	// Array<A> ~> (A => boolean) => Array<A>
	console.log(xs);

	// filter :: (A => boolean) => Observable<A> => Observable<A>
	const evenFilter = filter(isEven);
	// 값을 세개 꺼내는 함수. 이 모든 함수는 Observable을 입력받고 Observable을 return하는 함수
	const take3 = take(3);
	// RxJS는 이 Observable을 입력받고 Observable을 리턴하는 함수를 합성해주는 pipe라는 함수도 제공함
	const take3EvenNumbers = pipe(evenFilter, take3);

	take3EvenNumbers(integerObservable).subscribe({
		next: (n) => console.log(n),
	});
};
