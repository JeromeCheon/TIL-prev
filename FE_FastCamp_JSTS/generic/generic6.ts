interface IPerson {
	name: string;
	age: number;
}

const person2: IPerson = {
	name: 'Jerome',
	age: 28,
};

type Keys = keyof IPerson;

// function getProp(obj: IPerson, key: "name" | "age") {
// function getProp(obj: IPerson, key: keyof IPerson): IPerson[keyof IPerson] {
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

console.log(getProp(person2, 'name')); // 자동으로 매개변수를 IPerson으로 추론할 것

function setProp<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
	obj[key] = value;
}

setProp(person2, 'name', 'jerome');
