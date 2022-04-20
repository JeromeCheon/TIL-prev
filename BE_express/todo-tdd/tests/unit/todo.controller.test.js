const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn(); // mock
TodoModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	next = jest.fn();
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
