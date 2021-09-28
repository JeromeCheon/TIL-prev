const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const { posts } = require('./data.js')
app.use(cors());
// 아래 주소로 요청이 들어오면 req, res를 받아서 json으로 
app.get('/api/posts', (req, res) => {
  res.json(posts);
})
app.listen(PORT, () => console.log(`server running on ${PORT}`))