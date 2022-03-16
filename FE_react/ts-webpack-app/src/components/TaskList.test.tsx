// src/components/TaskList.test.js

import React from 'react';
import ReactDOM from 'react-dom';
// import '@testing-library/jest-dom/extend-expect';
import { PureTaskList } from './TaskList';
import { WithPinnedTasks } from './TaskList.stories'; //👈  Our story imported here

it('renders pinned tasks at the start of the list', () => {
	/**
	 * @jest-environment jsdom
	 */
	const div = document.createElement('div');
	//👇 Story's args used with our test
	const events = { onPinTask: jest.fn(), onArchiveTask: jest.fn() };
	ReactDOM.render(<PureTaskList tasks={WithPinnedTasks} {...events} />, div);

	// We expect the task titled "Task 6 (pinned)" to be rendered first, not at the end
	const lastTaskInput = div.querySelector(
		'.list-item:nth-child(1) input[value="Task 6 (pinned)"]'
	);
	expect(lastTaskInput).not.toBe(null);

	ReactDOM.unmountComponentAtNode(div);
});
