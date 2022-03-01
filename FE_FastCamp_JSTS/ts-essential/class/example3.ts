// singleton 패턴 학습
class ClassName {
	// 외부에서 new를 통해 만들지 않고, 다른 매개체를 통해서 이 객체를 꺼내올 수 있도록 장치하자.
	private static instance: ClassName | null = null;
	public static getInstance(): ClassName {
		// Classname으로부터 만든 오브젝트가 없으면, 만들어서 리턴
		if (ClassName.instance === null) {
			ClassName.instance = new ClassName();
		}
		// Classname으로부터 만든 오브젝트가 있으면 그걸 리턴
		return ClassName.instance;
	}

	private constructor() {} // 이를 통해 밖에서 new를 이용한 class instance 생성을 막을 수 있지
}

const a11 = ClassName.getInstance();
const a12 = ClassName.getInstance();

console.log(a11 === a12);
