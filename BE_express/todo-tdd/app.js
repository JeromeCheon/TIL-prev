const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

app.use(express.json()); // integration test 에서 필요한 로직

app.use('/todos', todoRoutes); // CRUD에 사용될 것이다 라는 의미
app.use((error, req, res, next) => {
	res.status(500).json({ message: error.message });
});
app.get('/', (req, res) => {
	res.send('Hello world~!');
});

// 여기를 주석처리 해줘야 하는 이유는 integration test에서의 supertest 역시
// express app을 launch 하기 때문

// app.listen(3000, () => {
// 	console.log('Server is now running!');
// });

module.exports = app;
