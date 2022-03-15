import '../src/index.css';
export const parameters = {
	// 매개변수는 일반적으로 storybook의 기능과 애드온의 동작을 제어하기 위해 사용돼
	// action은 mocked callbacks
	// actions는 클릭이 되었을 때 storybook UI의 actions 패널에 나타날 콜백을 생성할 수 있도록 해줌
	// 따라서 핀 버튼을 만들 때, 버튼 클릭이 성공적이었는지 테스트 UI에서 확인할 수 있을 것
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
