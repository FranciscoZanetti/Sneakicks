const express = require('express')
const app = express()
const port = 3000
const mainRoutes = require('./routes/mainRoutes');

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port} - http://localhost:${port}`)
})

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);