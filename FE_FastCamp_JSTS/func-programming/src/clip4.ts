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
export function getTotalPrice() {
	return list2();
}
