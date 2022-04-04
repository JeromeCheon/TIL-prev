import React, { useEffect } from "react";

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
  code: string;
  outOfStock: boolean;
  name: string;
  price: number;
  quantity: number;
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

const totalCount = (): string => {
  let totalCount = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].outOfStock === false) {
      totalCount += cart[i].quantity;
    }
  }
  return `<h2>전체 수량: ${totalCount}상자</h2>`;
};

const totalPrice = (): string => {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].outOfStock === false) {
      totalPrice += cart[i].price * cart[i].quantity;
    }
  }
  return `<h2>전체 가격: ${totalPrice}원</h2>`;
};

export const cart: Array<Item> = [
  {
    code: "tomato",
    outOfStock: false,
    name: "토마토",
    price: 7000,
    quantity: 2,
  },
  {
    code: "orange",
    outOfStock: true,
    name: "오렌지",
    price: 15000,
    quantity: 3,
  },
  {
    code: "apple",
    outOfStock: false,
    name: "사과",
    price: 10000,
    quantity: 1,
  },
];
export const CartList = () => {
  let html = "";

  for (let i = 0; i < cart.length; i++) {
    html += considerItem(cart[i]);
  }

  return html;
};

const PrintCart: React.FC = () => {
  useEffect(() => {
    const mainBody = document.getElementById("main-body");
    if (mainBody != null) {
      const info = CartList();
      mainBody.innerHTML = `<h1>장바구니</h1>
      <ul>${info}</ul>
      ${totalCount()}
      ${totalPrice()}
      `;
    }
  });
  return <></>;
};

export default PrintCart;
