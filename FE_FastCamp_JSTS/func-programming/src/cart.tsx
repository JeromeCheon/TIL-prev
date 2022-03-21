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
 */

export interface Item {
  code: string;
  outOfStock: boolean;
  name: string;
  price: number;
  quantity: number;
}
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
    quantity: 2,
  },
];
export const CartList = () => {
  let html = "";
  let totalCount = 0;

  for (let i = 0; i < cart.length; i++) {
    html += "<li>";
    html += `<h2>${cart[i].name}</h2>`;
    html += `<div>가격: ${cart[i].price}원</div>`;
    html += `<div>수량: ${cart[i].quantity}상자</div>`;
    html += "</li>";
    totalCount += cart[i].quantity;
  }

  return [html, totalCount];
};

const PrintCart: React.FC = () => {
  useEffect(() => {
    const mainBody = document.getElementById("main-body");
    if (mainBody != null) {
      const [info, totalCount] = CartList();
      mainBody.innerHTML = `<h1>장바구니</h1>
      <ul>${info}</ul>
      <h2>전체 수량: ${totalCount}</h2>`;
    }
  });
  return <></>;
};

export default PrintCart;
