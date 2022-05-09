const productos = [
    {
        id: 1,
        marca: 'Nike',
        modelo: 'Dunk Low',
        precio: '$24.000',
        image_url: 'nike_1.webp'
    },
    {
        id: 2,
        marca: 'adidas Yeezy',
        modelo: 'Yeezy Boost 350 V2',
        precio: '$120.000',
        image_url: 'yeezy_1.webp'
    },
    {
        id: 3,
        marca: 'Jordan',
        modelo: 'Air Jordan 1 High 85',
        precio: '$140.000',
        image_url: 'airjordan_1.jpg'
    },
    {
        id: 4,
        marca: 'Nike',
        modelo: 'Dunk Low',
        precio: '$24.000',
        image_url: 'nike_1.webp'
    },
    {
        id: 5,
        marca: 'adidas Yeezy',
        modelo: 'Yeezy Boost 350 V2',
        precio: '$120.000',
        image_url: 'yeezy_1.webp'
    },
    {
        id: 6,
        marca: 'Jordan',
        modelo: 'Air Jordan 1 High 85',
        precio: '$140.000',
        image_url: 'airjordan_1.jpg'
    },

]


const controller = {
    index: (req, res) => {
        return res.render('products/index', {productos: productos});
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    productDetail: (req, res) => {
        return res.render('products/productDetail');
    },
    cart: (req, res) => {
        return res.render('products/cart');
    },
    manageProduct: (req, res) => {
        return res.render('products/manageProduct');
    },
}

module.exports = controller;