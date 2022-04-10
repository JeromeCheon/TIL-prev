import { listenerCount } from 'process';
import React, { useEffect } from 'react';

/** 고차 함수를 사용해서 다음 로직을 따라 다시 구현해본다.
 * 1. 장바구니를 그려야 한다.
 * -> 장바구니를 순회하면서
 * -> 화면에 상품 이름, 가격, 수량을 표시한다.
 *
 * 2. 전체 가격과 전체 수량도 화면에 그려야 한다.
 * -> 2번의 동작을 수행할 때 totalPrice, totalCount에 값을 누적한다.
 *
 * 3. 재고 없는 상품의 처리
 * -> 2번과 6번의 동작을 수행할 때 재고 여부에 따라 다르게 동작시킨다.
 *
 * 그럼 이 페이지를 기능 단위로 구분해본다면 어떤 것들이 있을까?
 * - 아이템 목록 화면
 *  - 재고가 있는 아이템
 *  - 재고가 없는 아이템
 *
 * - 전체 수량 표시
 * - 전체 가격 표시
 *
 * 자 이제 구현을 보강해보자.
 */

export interface Item {
	readonly code: string;
	readonly outOfStock: boolean;
	readonly name: string;
	readonly price: number;
	readonly quantity: number;
}

const stockItem = (item: Item): string => `
  <li>
  <h2>${item.name}</h2>
  <div>가격: ${item.price}원</div>
  <div>수량: ${item.quantity}상자</div>
  </li>
`;

const outOfStockItem = (item: Item): string => `
  <li class='gray'>
  <h2>${item.name} (품절)</h2>
  <div class='strike'>가격: ${item.price}원</div>
  <div class='strike'>수량: ${item.quantity}상자</div>
  </li>
`;

const considerItem = (item: Item): string => {
	if (item.outOfStock) {
		return outOfStockItem(item);
	} else {
		return stockItem(item);
	}
};
// 자 근데 totalCount랑 totalPrice 안의 for문은 거의 똑같지?
// 이건 고차함수를 만들어서 대체할 수 있다.
// 화살표 함수를 익명함수로
const totalCalculator = (
	list: Array<Item>,
	getValue: (item: Item) => number
): number => {
	// 전체 목록 중 재고가 있는 상품만 getValue를 실행하고 그 값을 모두 더한다. 라는 요구사항

	// 이 요구 사항을 기능적으로 다시 분류를 하면
	return (
		list
			// 1. 재고가 있는 상품만 분류하기
			.filter((item) => item.outOfStock === false)
			// 2. 분류된 상품들에 대해서 getValue 실행하기
			.map(getValue)
			// 3. getValue가 실행된 값 모두 더하기
			.reduce((total, value) => total + value, 0)
	);
	// 한편, map의 잘못된 사용에 대해 고찰해보자. 위처럼 filter, map, reduce 등을 통해 함수를 합성했다.
	// 이처럼 함수형 프로그래밍을 사용하면 사람이 사고하는 방식과 코드가 얼마나 가까워 질 수 있는 지 확인하였다.
	// 이렇게 하지 않고 잘못된 방향으로 refactoring 하면 어떻게 될까 확인해보자.
	// const result: Array<number> = [];
	// list.map(function (item) { --> return type이 void. eslint에서는 실수라고 함
	//   // 그럴 때 console.log 같이 반환값이 void 류 인 건 부수효과야. 이 부수효과인 것은 메서드 체이닝이 힘들어
	//   if (item.outOfStock === false) {
	//     result.push(getValue(item))
	//   }
	// })
	// // 이렇게 하면 메서드 체이닝이 되지 않아.
	// return result.reduce((total, value) => total + value);
};

const totalCount = (list: Array<Item>): string => {
	const totalCount = totalCalculator(list, (item) => item.quantity);
	return `<h2>전체 수량: ${totalCount}상자</h2>`;
};

const totalPrice = (list: Array<Item>): string => {
	const totalPrice = totalCalculator(
		list,
		(item) => item.price * item.quantity
	);
	return `<h2>전체 가격: ${totalPrice}원</h2>`;
};

export const cart: Array<Item> = [
	{
		code: 'tomato',
		outOfStock: false,
		name: '토마토',
		price: 7000,
		quantity: 2,
	},
	{
		code: 'orange',
		outOfStock: true,
		name: '오렌지',
		price: 15000,
		quantity: 3,
	},
	{
		code: 'apple',
		outOfStock: false,
		name: '사과',
		price: 10000,
		quantity: 1,
	},
];
export const CartList = (cartList: Array<Item>) => {
	// CartList도 고차함수들로 refactoring 해보자.

	return `${cartList
		// 1. 목록에 있는 아이템을 태그로 변경
		.map(considerItem)
		// 2. 태그의 목록을 모두 하나의 문자열로 연결
		.reduce((tags, tag) => tags + tag, '')}`;
};

const PrintCart: React.FC = () => {
	useEffect(() => {
		const mainBody = document.getElementById('main-body');
		if (mainBody != null) {
			const info = CartList(cart);
			mainBody.innerHTML = `<h1>장바구니</h1>
      <ul>${info}</ul>
      ${totalCount(cart)}
      ${totalPrice(cart)}
      `;
		}
	});
	return <></>;
};

export default PrintCart;
