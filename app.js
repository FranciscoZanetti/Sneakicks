const express = require('express')
const app = express()
const port = 3000
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port} - http://localhost:${port}`)
})

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/products', productRoutes);

module.exports = app;