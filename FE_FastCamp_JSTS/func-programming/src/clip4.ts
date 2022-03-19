export function priceOfTomato() {
	return 7000;
}
export function priceOfOrange() {
	return 15000;
}
export function priceOfApple() {
	return 10000;
}

export function list1() {
	return priceOfTomato() + priceOfOrange() + priceOfApple();
}

export function list2() {
	// 토마토 2상자
	return priceOfTomato() + priceOfTomato();
}

export function list3() {
	// 오렌지 100상자
	// 이런식으로 요구사항에 맞는 함수들을 정의해주고 이 함수들을 부를 수 있게 하면서
	// 다른 부수효과를 방지한다.
	return priceOfOrange() * 100;
}

const priceOfFruit = {
	tomato: 7000,
	orange: 15000,
	apple: 10000,
};
// 입력 타입 즉, 정의역은 string이 되는 것이고
// 아래와 같이 return type, 공역을 number와 undefined의 union type으로 명시해줘
export function getPrice(name: string): number | undefined {
	if (name === 'tomato') {
		return 7000;
	} else if (name === 'orange') {
		return 15000;
	} else if (name === 'apple') {
		return 10000;
	}
	// 근데 이런식으로 하는 것도 매 문자열을 비교해줘야 하니까 비효율적이네?
	// dictionary나 map 같은 자료구조로 만들어볼 수 있을텐데 그게 priceOfFruit 오브젝트가 될 것
}

export const isExpensive = (price: number | undefined) => {
	if (price === undefined) {
		return false;
	}
	return price > 10000;
};

export const main = () => {
	return isExpensive(getPrice('tomato'));
};
// 자 이렇게 함수를 잇는 것을 알아보았으니 하나의 함수로 만들어보는 것을 알아보자.
export function isExpensivePrice(name: string): boolean {
	return isExpensive(getPrice(name));
}
export function getTotalPrice() {
	return list2();
}

export const compose =
	(
		g: (y: number | undefined) => boolean,
		f: (s: string) => number | undefined
	) =>
	(x: string) => {
		return g(f(x));
	};
