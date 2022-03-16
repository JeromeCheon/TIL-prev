import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PureTaskList, TaskListProps } from './TaskList';
import * as TaskStories from './Task.stories';

const taskListMeta: Meta = {
	component: PureTaskList,
	title: 'TaskList',
	// 데코레이터는 스토리에 임의의 wrapper를 제공하는 한 방법
	// 여기서는 key를 사용, 기본 내보내기에서 렌더링 된 컴포넌트에 padding을 추가하는식으로 사용된다
	// 또 데코레이터는 providers에서 스토리를 감싸줄 때 사용될 수 있다
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
};
export default taskListMeta;

const Template: Story<TaskListProps> = (args) => <PureTaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
	// Shaping the stories through args composition.
	// The data was inherited from the Default story in task.stories.js.
	tasks: [
		{ ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
		{ ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
		{ ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
		{ ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
		{ ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
		{ ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
	],
};
export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
	// Shaping the stories through args composition.
	// Inherited data coming from the Default story.
	tasks: [
		...Default.args.tasks.slice(0, 5),
		{ id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
	],
};

export const Loading = Template.bind({});
Loading.args = {
	tasks: [],
	loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
	// Shaping the stories through args composition.
	// Inherited data coming from the Loading story.
	...Loading.args,
	loading: false,
};
