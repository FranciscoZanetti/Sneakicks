const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    login: (req, res) => {
        return res.render('login');
    },
    register: (req, res) => {
        return res.render('register');
    },
    productDetail: (req, res) => {
        return res.render('productDetail');
    },
    cart: (req, res) => {
        return res.render('cart');
    },
}

module.exports = controller;