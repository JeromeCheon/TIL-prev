const express = require('express')
const todoRoutes = require('./routes/todo.routes')
const app = express()

app.use('/todos', todoRoutes) // CRUD에 사용될 것이다 라는 의미

app.get('/', (req, res) => {
	res.send('Hello world~!')
})

app.listen(3000, () => {
	console.log('Server is now running!')
})

module.exports = app
