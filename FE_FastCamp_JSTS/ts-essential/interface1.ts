interface Person1 {
	// 이렇게 Person 쪽을 따로 빼서 만들 수 있다
	name: string;
	age?: number; // optional 하게 받을 수 있다.
	[index: string]: any; // 어떤 이름의 property가 와도 괜찮아
}

function hello1(person: Person1): void {
	console.log(`안녕하세요, ${person.name} 입니다!`);
}

const p1: Person1 = {
	name: 'Mark',
	age: 39,
};

hello1(p1);

const p32: Person1 = {
	name: 'Anna',
	sisters: ['Sung', 'Chan'],
};

const p33: Person1 = {
	name: 'jerome',
	father: p1,
	mother: p32,
};
