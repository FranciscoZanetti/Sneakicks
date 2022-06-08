const express = require('express')
const app = express()
const port = 3000
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');
const session = require('express-session');

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

app.use(session( { secret: "Aca va el secret" }))

router.get('/pruebaSession', function(req, res) {
  if (req.session.numeroDeVisitas == undefined) {
      req.session.numeroDeVisitas = 0;
  }

  req.session.numeroDeVisitas++;

  res.send("Visita numero:" + req.session.NumeroDeVisitas)
})