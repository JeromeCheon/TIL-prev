const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn(); // mock
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();

let req, res, next;
const todoId = '625f5ff19bd0ca314e546d5d';
beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	next = jest.fn();
});

describe('TodoController.updateTodo', () => {
	it('should have a updateTodo function', () => {
		expect(typeof TodoController.updateTodo).toBe('function');
	});
	it('should update with TodoModel.findByIdAndUpdate', async () => {
		req.params.todoId = todoId;
		req.body = newTodo;
		await TodoController.updateTodo(req, res, next);
		// 이런게 필요하대
		expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
			new: true,
			useFindAndModify: false,
		});
	});
	it('should return a response with json data and http code 200', async () => {
		req.params.todoId = todoId;
		req.body = newTodo;
		TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
		await TodoController.updateTodo(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(newTodo);
	});
	it('should do error handling of updateTodo', async () => {
		const errorMessage = { message: 'error updating todo model' };
		const rejectedPromise = Promise.reject(errorMessage);
		TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
		await TodoController.updateTodo(req, res, next);
		expect(next).toHaveBeenCalledWith(errorMessage);
	});
});

describe('TodoController.getTodoById', () => {
	it('should have a getTodoById', () => {
		expect(typeof TodoController.getTodoById).toBe('function');
	});
	it('should call TodoModel.findById with route parameters', async () => {
		// route param 정할 것
		req.param.todoId = todoId;
		await TodoController.getTodoById(req, res, next);
		expect(TodoModel.findById).toBeCalledWith(todoId);
	});
	it('should return json body and response code 200', async () => {
		TodoModel.findById.mockReturnValue(newTodo);
		await TodoController.getTodoById(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(newTodo);
	});
	it('should do error handling of getTodoById', async () => {
		const errorMessage = { message: 'error finding todomodel' };
		const rejectedPromise = Promise.reject(errorMessage);
		TodoModel.findById.mockReturnValue(rejectedPromise);
		await TodoController.getTodoById(req, res, next);
		expect(next).toHaveBeenCalledWith(errorMessage);
	});
	// TodoModel이 데이터베이스에 없을 때 -> 404 에러를 내줘야 겠지
	it('should return 404 when item doesn t exist', async () => {
		TodoModel.findById.mockReturnValue(null);
		await TodoController.getTodoById(req, res, next);
		expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
	});
});

describe('TodoController.getTodos', () => {
	// 1. getTodo function이 있는지 확인
	it('should have a getTodo function', () => {
		expect(typeof TodoController.getTodo).toBe('function');
	});
	it('should call TodoModel.find({})', async () => {
		await TodoController.getTodo(req, res, next);
		expect(TodoModel.find).toHaveBeenCalledWith({});
		// TodoModel.find({}); // 안에 값이 없다? 이건 데이터베이스의 모든 document를 다 부를 것
	});
	it('should return response with status 200 and all todos', async () => {
		TodoModel.find.mockReturnValue(allTodos);
		await TodoController.getTodo(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(allTodos);
	});
	it('should handle error for getTodo', async () => {
		const errorMessage = { message: 'Done property missing' };
		const rejectedPromise = Promise.reject(errorMessage);
		TodoModel.find.mockReturnValue(rejectedPromise);
		await TodoController.getTodo(req, res, next);
		expect(next).toBeCalledWith(errorMessage);
	});
});

describe('TodoController.createTodo', () => {
	beforeEach(() => {
		req.body = newTodo;
	});

	it('should have a createTodo function', () => {
		expect(typeof TodoController.createTodo).toBe('function');
	});
	it('should call TodoModel.create', () => {
		TodoController.createTodo(req, res, next);
		expect(TodoModel.create).toBeCalledWith(newTodo);
	});
	it('should return 201 response code', async () => {
		await TodoController.createTodo(req, res, next);
		expect(res.statusCode).toBe(201);
		expect(res._isEndCalled()).toBeTruthy();
	});
	it('should return json body in response', async () => {
		TodoModel.create.mockReturnValue(newTodo);
		await TodoController.createTodo(req, res, next);
		expect(res._getJSONData()).toStrictEqual(newTodo);
	});
	it('should handle errors', async () => {
		const errorMessage = { message: 'Done property missing' };
		const rejectedPromise = Promise.reject(errorMessage);
		TodoModel.create.mockReturnValue(rejectedPromise);
		await TodoController.createTodo(req, res, next);
		expect(next).toBeCalledWith(errorMessage);
	});
});
