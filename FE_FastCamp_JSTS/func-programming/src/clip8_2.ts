type Async<A> = (ret: (a: A) => void) => void;

const ns: Array<number> = [1, 2, 3, 4, 5];

const integers = (n: number): Array<number> => {
	const ret: Array<number> = [];
	let i = 0;
	while (i < n) {
		i = i + 1;
		ret.push(i);
	}
	return ret;
};
// 이렇게 값을 생성하는 함수를 만들어주는 함수를 iterable이라고 해
// 언어나 프로그램에 따라서 generator나 enumerator라고 부르기도 해
// type Iterable<A> = () => () => A;

type Iterator<A> = () => A;
type Iterable<A> = () => Iterator<A>;
// 요청이 있을 때 마다 자연수 값을 생성하면 돼
// loop 를 써서 값을 한번에 누적하는 대신 함수 사용, 계산을 한번 더 지연
// 이 integerGenerator는 함수를 리턴하는 함수
const integerGenerator = () => {
	let i = 0;
	return () => {
		i = i + 1;
		return i;
	};
};

const promiseIntegers = (n: number): Promise<Array<number>> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(integers(n));
		}, 1000);
	});

promiseIntegers(5).then((ns) => console.log(ns));
const onManyIntegers = (n: number) => {
	const arr = integers(n);
	console.log(arr);
};

const iter = integerGenerator();
const onStep = () => {
	const n = iter();
	console.log(n);
};

const render1 = () => {
	const app1 = document.getElementById('app1');
	if (app1 === null) {
		return;
	}
	app1.innerHTML = `
    <input type="text" id="wanted-number" />
    <button id="all">한 번에 생성</button>
  `;

	const wantedNumber = document.getElementById('wanted-number');
	const btn = document.getElementById('all');

	if (!(wantedNumber && btn)) {
		return;
	}
	btn.onclick = (e) => {
		onManyIntegers(Number((wantedNumber as HTMLInputElement).value));
	};
};

const render2 = () => {
	const app2 = document.getElementById('app2');
	if (app2 === null) {
		return;
	}
	app2.innerHTML = `
    <button id="each">하나씩 생성</button>
  `;

	const btn = document.getElementById('each');
	if (!btn) {
		return;
	}
	btn.onclick = (e) => {
		integerGenerator();
	};
};

export const observMain2 = () => {
	render1();
	render2();
};
