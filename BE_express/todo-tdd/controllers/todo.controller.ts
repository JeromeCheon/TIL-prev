const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res, next) => {
	try {
		const createdModel = await TodoModel.create(req.body);
		res.status(201).json(createdModel);
	} catch (err) {
		next(err);
	}
};

exports.getTodo = async (res, req, next) => {
	try {
		await TodoModel.find({});
	} catch (err) {
		console.log('getTodo Error message here:');
		console.error(err);
	}
};
