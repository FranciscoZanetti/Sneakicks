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

app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/products', productRoutes);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(methodOverride('_method'));