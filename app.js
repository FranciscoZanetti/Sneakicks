const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port} - http://localhost:${port}`)
})
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
    });

    app.get('/login', (req, res) => {
        res.sendFile(__dirname + '/views/login.html')
        });
    app.get('/register', (req, res) => {
        res.sendFile(__dirname + '/views/register.html')
        });
<<<<<<< Updated upstream
    app.get('/productDetail', (req, res) => {
      res.sendFile(__dirname + '/views/productDetail.html')
      });
=======
    app.get('/product', (req, res) => {
      res.sendFile(__dirname + '/views/descripcionProducto.html')
      });
    app.get('/cart', (req, res) => {
      res.sendFile(__dirname + '/views/cart.html')
        });
>>>>>>> Stashed changes
