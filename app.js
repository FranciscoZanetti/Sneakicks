const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
    });

    app.get('/login', (req, res) => {
        res.sendFile(__dirname + '/views/login.html')
        });
    app.get('/register', (req, res) => {
        res.sendFile(__dirname + '/views/register.html')
        });