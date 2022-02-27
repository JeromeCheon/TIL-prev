interface IPerson2 {
	name: string;
	age?: number;
}

interface IKorean extends IPerson2 {
	city: string;
}

const k: IKorean = {
	name: 'jerome',
	city: 'jinju',
};
// 대규모 프로젝트를 할 때에는 인터페이스 끼리 상속해서 사용하며 확장성을 높여가는 것이 좋아
