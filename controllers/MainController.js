const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    detalleMenu: (req, res) => {
        return res.render('detalleMenu');
    },
}

module.exports = controller;