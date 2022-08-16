const fetchData = fetch("http://localhost:3000/api/products").then(response => response.json()).then(results => {
    let productsCart = JSON.parse(sessionStorage.getItem("productsCart"));
    let productsSizes = [];
    if (productsCart.length > 0){
        results.products.map(product => {
            productsCart.map(productCart => {
                if (productCart.product_id == product.id){
                    product.product_sizes.map(product_size => {
                        if (productCart.size == product_size.size){
                            productsSizes.push(product_size);
                        }
                    });
                    
                }
            });
        });
    }
    return productsSizes;
});

window.addEventListener("load", async function(){
    let productsSizes = await fetchData;
    if (productsSizes.length > 0){
        let productsCart = JSON.parse(sessionStorage.getItem("productsCart"));
        // productsCart.map(productCart)
    }
    console.log("Products Sizes que coinciden", productsSizes);
    console.log(sessionStorage.getItem("productsCart"));
})