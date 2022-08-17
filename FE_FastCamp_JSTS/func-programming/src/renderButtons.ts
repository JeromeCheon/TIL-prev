import { fromEvent, map, mergeAll, zip } from 'rxjs';
import { Item } from './cart';

const observableFromItem = (item: Item) => {
	const code = item.code;
	const element = document.getElementById(`add-${code}-button`)!;
	// HTML element에 발생하는 event를 Observable로 만들어줄 차례
	// RxJS에는 fromEvent라는 함수가 있고 이를 통해 Observable로 만들어 줄 수 있음
	const observable = fromEvent(element, 'click'); // click 이벤트 구독할 것이기에
	return observable;
};

// 새로운 아이템을 하나 만들고 수량을 하나 증가시켜 돌려주는 함수
const updateItem = (item: Item): Item => {
	return { ...item, quantity: item.quantity + 1 };
};

// 주어진 코드와 아이템을 입력했을 때 인자로 주어진 코드와 아이템의 코드가 일치하면 수량 증가시키는 함수
const updateItemByCode =
	(code: string) =>
	(item: Item): Item => {
		return item.code === code ? updateItem(item) : item;
	};

// [1, 2, 3], [a, b, c] => [[1, a], [2, b], [3, c]] 이렇게 만드는 것을 zip이라고 해

// 버튼 이벤트를 옵저버블로 만들고 연결하기 위해 사용하는 함수
export const createObservables = (cart: Array<Item>) => {
	const observables = cart.map(observableFromItem);
	// 먼저 배열의 code를 추출해 별도의 배열을 만들고
	const codes = cart.map((item) => item.code);
	zip(observables, codes)
		.pipe(
			map(([observable, code]) => {
				// observable의 event를 code로 바꿀 것이기 때문에 observable에도 map 적용
				return observable.pipe(map((event) => code));
			}), // 이렇게 중첩된 효과를 합쳐주는 flat과 같은 함수가 rxjs에선 mergeAll
			mergeAll(),
			// 또 배열에는 flat과 map을 합친 flatMap 이 있었듯
			// rxjs에도 map 과 mergeAll을 합친 mergeMap이 있다
			// mergeMap(([observable, code]) => {
			// 	return observable.pipe(map((event) => code));
			// }),
			map((code) => {
				// code를 기반으로 cart 업데이트
				// 업데이트 된 cart 리턴
				return cart;
			})
		)
		.subscribe((data) => console.log(data));
	// .subscribe((data) => render(data));
	// forEach를 사용해서 각각의 observable을 등록한다.
	observables.forEach((observable) => {
		observable.subscribe((event) => console.log(event));
		// subscribe에 함수만 넘겨주면, next만 넘겨주는 것과 동일한 동작
	});
};

const renderButton = (item: Item) => {
	return `<div>
    <button id="add-${item.code}-button">
      ${item.name} 하나 더
    </button>
  </div>`;
};

export const renderButtons = (cart: Array<Item>) => {
	const buttons = document.getElementById('buttons');
	if (buttons === null) {
		return;
	}
	buttons.innerHTML = cart.map(renderButton).join('');
};
