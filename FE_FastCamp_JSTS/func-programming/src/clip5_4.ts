const delivery = (present: string, from: string, to: string) => {
	// 커링은 모든 인자들을 하나씩 나눠주면 돼
	// 일단은 커리 함수를 만들자. 타입은 제너릭으로
	return `
  보내는 물건: ${present}
  보내는 사람: ${from}
  받는 사람: ${to}
  `;
};
// 화살표 함수들로 연결되어 있어
const curry3 =
	<A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
	(a: A) =>
	(b: B) =>
	(c: C) =>
		f(a, b, c);

const curriedDelivery = curry3(delivery);

export const main = () => {
	console.clear();

	const momsPresend = curriedDelivery('상품권')('엄마');
	console.log(momsPresend('아들'));
};
