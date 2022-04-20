const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

app.use(express.json()); // integration test 에서 필요한 로직

app.use('/todos', todoRoutes); // CRUD에 사용될 것이다 라는 의미
app.get('/', (req, res) => {
	res.send('Hello world~!');
});

// app.listen(3000, () => {
// 	console.log('Server is now running!');
// });

module.exports = app;
