// class => object
// {mark: 'male', jade: 'male'}
// {chloe: 'female', alex: 'male', anna: 'female'} 이런식으로 만들어보겠다.

class Students {
	// property의 이름을 동적으로 => index signiture
	[index: string]: string;
	// 다른 값이 들어올 수 없도록 하려면
	// [index: string]: 'female' | 'male'; // 이렇게 할 수도 있음
}

const aClass = new Students();
aClass.mark = 'male';
aClass.jade = 'male';

console.log(aClass);
