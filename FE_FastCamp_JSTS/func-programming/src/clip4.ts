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

function getPrice(name: string): number {
	if (name === 'tomato') {
		return 7000;
	} else if (name === 'orange') {
		return 15000;
	} else if (name === 'apple') {
		return 10000;
	}
	// 근데 이런식으로 하는 것도 매 문자열을 비교해줘야 하니까 비효율적이네?
	// dictionary나 map 같은 자료구조로 만들어볼 수 있을텐데 그게 priceOfFruit 오브젝트가 될 것
	return 0;
}
export function getTotalPrice() {
	return list2();
}
