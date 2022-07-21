/** 기존 cart와 달리 구매하는 개수에 제한이 있는 경우를 구현할 것
 * 상품당 최대 수량을 10개로 제한하고, 개수가 1개 미만일 떄 에러를 발생하도록 구현하자
 */
import { cart, Item } from "./cart";
import React, { useEffect } from "react";
import * as O from "./option";
import * as T from "./try";

type ParsedItem = { _tag: "parsedItem" } & Item; // Item 타입을 확장한 형태로 만들었음
type ParsedError = {
  name: string;
  message: string;
};

// 상품의 개수가 잘못되면 예외를 발생시키는 함수 구현해보자
// 그리고 validateItem 을 Try를 반환하는 parseItem으로 바꿔보자
const parseItem = (item: Item): T.Try<ParsedItem, ParsedError> => {
  if (item.quantity < 1) {
    return T.failed({
      name: item.name,
      message: "상품은 반드시 한개 이상 담아야 합니다.",
    });
  } else if (item.quantity > 10) {
    return T.failed({
      name: item.name,
      message: "한 번에 10개를 초과하여 구매할 수 없습니다.",
    });
  }
  // 검증이 완료되었으면 Item type의 값을 ParsedItem 타입의 값으로 변환하여 try 타입으로 리턴해야 함
  return T.success({
    _tag: "parsedItem",
    ...item,
  });
};

type ArrayItem = Array<Item>;

const stockItem = (item: ParsedItem): string => {
  return `
  <li>
  <h2>${item.name}</h2>
  <div>가격: ${item.price}원</div>
  <div>수량: ${item.quantity}상자</div>
  </li>
`;
};

const errorItem = (e: ParsedError): string => `
<li style="color: red">
	<h2>${e.name}</h2>
	<div>${e.message}</div>
`;

const outOfStockItem = (item: ParsedItem): string => `
  <li class='gray'>
  <h2>${item.name} (품절)</h2>
  <div class='strike'>가격: ${item.price}원</div>
  <div class='strike'>수량: ${item.quantity}상자</div>
  </li>
`;

const renderItem = (item: Item): string => {
  const parsedItem = parseItem(item);
  const render = T.map(parsedItem, (item) => {
    if (item.outOfStock) {
      // 현재 여기에 에러가 나. 왜? Try 내부 성공의 아이템 값을 반환하지 못하기 때문.
      // 이를 해결하기 위해 Try의 map 함수가 사용된다.
      // Try에서의 map은 실패했을 때는 자신 리턴, 성공일 때는 인자로 전달된 데이터를 자신에게 적용해서 그 결과를 리턴
      // 이 과정에서 결과는 바뀌지 않아.
      // 자 이제 try.ts에 map을 구현하자.
      return outOfStockItem(item);
      // return outOfStockItem(parsedItem);
    } else {
      return stockItem(item);
    }
  });
  return T.getOrElse(render, errorItem);
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
          parseItem(item);
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
