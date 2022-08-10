const express = require('express')
const app = express()
const port = 3000
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const mainApiRoutes = require('./routes/apis/main');
const productsApiRoutes = require('./routes/apis/products');
const usersApiRoutes = require('./routes/apis/users');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

app.use(session({
  secret: "SneakicksWebsite",
  cookie: {
    maxAge:269999999999,
    httpOnly: false,
    secure: false
  },
  saveUninitialized: true,
  resave:true}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(cors());

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/api/main', mainApiRoutes);
app.use('/api/products', productsApiRoutes);
app.use('/api/users', usersApiRoutes);

app.listen(process.env.PORT || port, () => {
  console.log(`Servidor iniciado en puerto ${port} - http://localhost:${port}`)
})

module.exports = app;
