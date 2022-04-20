const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');
const endpointUrl = '/todos/';

let firstTodo, newTodoid;
describe(endpointUrl, () => {
	// test나 it 나 같다
	test('GET ' + endpointUrl, async () => {
		const response = await request(app).get(endpointUrl);
		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body[0].title).toBeDefined();
		expect(response.body[0].done).toBeDefined();
		console.log(response.body[0]._id);
		firstTodo = response.body[0];
	});
	// doesn't work properly
	test('GET by Id ' + endpointUrl + ':todoId', async () => {
		const response = await request(app).get(endpointUrl + firstTodo._id);
		expect(response.statusCode).toBe(200);
		expect(response.body.title).toBe(firstTodo.title);
		expect(response.body.done).toBe(firstTodo.done);
	});
	it('GET todo by id doesn t exist' + endpointUrl + ':todoId', async () => {
		const response = await request(app).get(
			endpointUrl + '625f5ff19bd0ca314e546d51'
		);
		expect(response.statusCode).toBe(404);
	});
	it('POST' + endpointUrl, async () => {
		const response = await request(app).post(endpointUrl).send(newTodo);
		expect(response.statusCode).toBe(201);
		expect(response.body.title).toBe(newTodo.title);
		expect(response.body.done).toBe(newTodo.done);
		newTodoId = response.body._id;
	});
	it(
		'should return error 500 on malformed data with POST' + endpointUrl,
		async () => {
			const response = await request(app)
				.post(endpointUrl)
				.send({ title: 'Missing done property' });
			expect(response.statusCode).toBe(500);
			expect(response.body).toStrictEqual({
				// 근데 이렇게 하면 test는 fail나.
				// pass 시켜주기 위해서는 app.js 내에 middleware를 만들어 줘야함
				message: 'Todo validation failed: done: Path `done` is required.',
			});
		}
	);
	it('PUT' + endpointUrl, async () => {
		const testData = { title: 'Make integration test for PUT', done: true };
		const response = await request(app)
			.put(endpointUrl + newTodoId)
			.send(testData);
		expect(response.statusCode).toBe(200);
		expect(response.body.title).toBe(testData.title);
		expect(response.body.done).toBe(testData.done);
	});
});
