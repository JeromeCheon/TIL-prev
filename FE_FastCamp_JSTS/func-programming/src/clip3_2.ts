export let totalPrice = 0;

export function addTomato() {
	totalPrice += 7000;
}

export function addOrange() {
	totalPrice += 15000;
}

export function addApple() {
	totalPrice += 10000;
}

export function list1() {
	// 토마토, 오렌지, 사과 한 상자
	addTomato();
	addOrange();
	addApple();
}

export function list2() {
	// 토마토 2상자
}

export function list3() {
	// 토마토, 오렌지, 사과 한 상자
}
