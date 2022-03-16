import React from 'react';
import Task, { TaskProps } from './Task';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';

export interface TaskListProps {
	loading?: boolean;
	tasks: TaskProps[];
	onPinTask: Function;
	onArchiveTask: Function;
}

export const PureTaskList: React.FC<TaskListProps> = ({
	loading = false,
	tasks,
	onPinTask,
	onArchiveTask,
}) => {
	const events = {
		onPinTask,
		onArchiveTask,
	};

	const LoadingRow = (
		<div>
			<span className='loading-item'>
				<span className='glow-checkbox' />
				<span className='glow-text'>
					<span>Loading</span>
					<span>cool</span>
					<span>state</span>
				</span>
			</span>
		</div>
	);

	if (loading) {
		return (
			<div className='list-items'>
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
			</div>
		);
	}
	if (tasks.length === 0) {
		return (
			<div className='list-items'>
				<div className='wrapper-message'>
					<span className='icon-check' />
					<div className='title-message'>You have no tasks</div>
					<div className='subtitle-message'>Sit back and relax</div>
				</div>
			</div>
		);
	}
	const tasksInOrder = [
		...Array.from(tasks).filter((t): boolean => t.state === 'TASK_PINNED'),
		...Array.from(tasks).filter((t): boolean => t.state !== 'TASK_PINNED'),
	];
	return (
		<div className='list-items'>
			{tasksInOrder.map((task) => (
				<Task key={task.id} task={task} {...events} />
			))}
		</div>
	);
};

export default connect(
	({ tasks }: any) => ({
		tasks: tasks.filter(
			(t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
		),
	}),
	(dispatch) => ({
		onArchiveTask: (id) => dispatch(archiveTask(id)),
		onPinTask: (id) => dispatch(pinTask(id)),
	})
)(PureTaskList);
