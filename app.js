const express = require('express')
const app = express()
const port = 3000
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(session({
  secret: "SneakicksWebsite",
  cookie: {
    maxAge:269999999999
  },
  saveUninitialized: true,
  resave:true}));

app.listen(process.env.PORT || port, () => {
  console.log(`Servidor iniciado en puerto ${port} - http://localhost:${port}`)
})

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

module.exports = app;
