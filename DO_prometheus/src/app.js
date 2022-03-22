const express = require('express')
const app = express()
const port = 8080

app.get('/targets', (req, res) => {
  const target = [
    {
      "targets": [
        "10.0.101.27:9100",
        "10.0.101.82:9100",
        "10.0.101.81:9100",
      ],
      "labels": {
        "service": "web",
        "role": "role-1"
      }
    },
  ]
  res.json(target)
})

app.listen(port, () => {
  console.log(`Service Discovery app listening at http://localhost:${port}`)
})
