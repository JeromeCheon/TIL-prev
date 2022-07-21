/** 기존 cart와 달리 구매하는 개수에 제한이 있는 경우를 구현할 것
 * 상품당 최대 수량을 10개로 제한하고, 개수가 1개 미만일 떄 에러를 발생하도록 구현하자
 */
import { cart, Item } from "./cart";
import React, { useEffect } from "react";
import * as O from "./option";

type ArrayItem = Array<Item>;

// 상품의 개수가 잘못되면 예외를 발생시키는 함수 구현해보자
const validateItem = (item: Item) => {
  if (item.quantity < 1) {
    throw new Error("상품은 반드시 한개 이상 담아야 합니다. ");
  } else if (item.quantity > 10) {
    throw new Error("한 번에 10개를 초과하여 구매할 수 없습니다.");
  }
};

const stockItem = (item: Item): string => {
  return `
  <li>
  <h2>${item.name}</h2>
  <div>가격: ${item.price}원</div>
  <div>수량: ${item.quantity}상자</div>
  </li>
`;
};

const outOfStockItem = (item: Item): string => `
  <li class='gray'>
  <h2>${item.name} (품절)</h2>
  <div class='strike'>가격: ${item.price}원</div>
  <div class='strike'>수량: ${item.quantity}상자</div>
  </li>
`;

const renderItem = (item: Item): string => {
  try {
    validateItem(item);
    if (item.outOfStock) {
      return outOfStockItem(item);
    } else {
      return stockItem(item);
    }
  } catch (e) {
    return `
		<li style="color: red">
			<h2>${item.name}</h2>
			<div>${e}</div>
		`;
  }
};

const totalCalculator = (
  list: Array<Item>,
  getValue: (item: Item) => number
): number => {
  return (
    list
      // 1. 재고가 있는 상품만 분류하기
      .filter((item) => {
        try {
          validateItem(item);
          return item.outOfStock === false;
        } catch (e) {
          return false;
        }
      })
      // 2. 분류된 상품들에 대해서 getValue 실행하기
      .map(getValue)
      // 3. getValue가 실행된 값 모두 더하기
      .reduce((total, value) => total + value, 0)
  );
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

  const totalDiscountPrice = totalCalculator(list, (item) => {
    // JS에서 파이프라이닝이 채택된다면 이렇게도 작성해볼 수 있을 것
    // item.discountPrice |> O.fromUndefined($) \> O.getOrElse($, 0);
    const discountPrice = O.getOrElse(O.fromUndefined(item.discountPrice), 0);
    return discountPrice * item.quantity;
  });
  return `<h2>전체 가격: ${
    totalPrice - totalDiscountPrice
  }원 (총 ${totalDiscountPrice} 할인)</h2>`;
};

export const CartList = (cartList: Array<Item>) => {
  // CartList도 고차함수들로 refactoring 해보자.

  return `${cartList
    // 1. 목록에 있는 아이템을 태그로 변경
    .map(renderItem)
    // 2. 태그의 목록을 모두 하나의 문자열로 연결
    .reduce((tags, tag) => tags + tag, "")}`;
};

const PrintCartWithTryCatch: React.FC = () => {
  useEffect(() => {
    const mainBody = document.getElementById("main-body");
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

export default PrintCartWithTryCatch;
