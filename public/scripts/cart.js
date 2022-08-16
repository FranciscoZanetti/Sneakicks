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
        let updateNecessary = false;


        // CAMBIA EL VALOR DE LAS UNITS SI EXCEDEN EL STOCK REAL, Y ACTUALIZA EL STOCK VIRTUAL EN SESSION STORAGE

        productsCart.map(productCart => {
            let idDiv = "product-details"+productCart.id;
            // document.querySelector("#" + idDiv + " input")
            productsSizes.map(productSize => {
                if (productCart.product_id == productSize.product && productCart.size == productSize.size){
                    if (document.querySelector("#" + idDiv + " input").value > productSize.stock){
                        document.querySelector("#" + idDiv + " input").value = productSize.stock;
                        productCart.units = productSize.stock;
                        updateNecessary = true;
                    }
                    // document.querySelector("#" + idDiv + " input").value;
                }
            });
        });
        if (updateNecessary){
            sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
        }


        // CONTROLA LOS INPUTS DE SIZES Y ACTUALIZA LAS UNIDADES EN SESSION STORAGE

        productsCart.map(productCart => {
            let idDiv = "product-details"+productCart.id;
            document.querySelector("#" + idDiv + " input").addEventListener("change", function (){
                productsSizes.map(productSize => {
                    if (productCart.product_id == productSize.product && productCart.size == productSize.size){
                        if (document.querySelector("#" + idDiv + " input").value > productSize.stock){
                            document.querySelector("#" + idDiv + " input").classList.add("stock-field-errors");
                            // sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                        }
                        if (document.querySelector("#" + idDiv + " input").value <= 0){
                            document.querySelector("#" + idDiv + " input").classList.add("stock-field-errors");
                        }
                        else{
                            if (document.querySelector("#" + idDiv + " input").classList.contains("stock-field-errors")){
                                document.querySelector("#" + idDiv + " input").classList.remove("stock-field-errors");
                            }
                        }
                    }
                });
                
            })
            document.querySelector("#" + idDiv + " input").addEventListener("blur", function (){
                productsSizes.map(productSize => {
                    if (productCart.product_id == productSize.product && productCart.size == productSize.size){
                        if (document.querySelector("#" + idDiv + " input").value > productSize.stock){
                            document.querySelector("#" + idDiv + " input").value = productSize.stock;
                            document.querySelector("#" + idDiv + " input").classList.remove("stock-field-errors");
                            productCart.units = productSize.stock;
                            sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                            console.log("session storage actualizado: ", sessionStorage.getItem("productsCart"));
                        }
                        if (document.querySelector("#" + idDiv + " input").value <= 0){
                            document.querySelector("#" + idDiv + " input").value = 1;
                            document.querySelector("#" + idDiv + " input").classList.remove("stock-field-errors");
                            productCart.units = 1;
                            sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                            console.log("session storage actualizado: ", sessionStorage.getItem("productsCart"));
                        }
                        else{
                            productCart.units = document.querySelector("#" + idDiv + " input").value;
                            sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                            console.log("session storage actualizado: ", sessionStorage.getItem("productsCart"));
                        }
                    }
                });
                
            })

        });



        productsCart.map(productCart => {
            let idDiv = "product-details"+productCart.id;
            document.querySelector("#" + idDiv).addEventListener("submit", function (event){

                let productsCartAux = [];
                productsCart.map(aux => {
                    if (productCart.id != aux.id){
                        productsCartAux.push(aux);
                    }
                });
                sessionStorage.setItem("productsCart", JSON.stringify(productsCartAux));
                
                // productsSizes.map(productSize => {
                //     if (productCart.product_id == productSize.product && productCart.size == productSize.size){
                //         let productsCartAux = [];
                //         productsCart.map(productCart => {
                //             productsSizes.map(productSize => {
                //                 if ( !(productCart.product_id == productSize.product && productCart.size == productSize.size) ){
                //                     productsCartAux.push(productCart);
                //                 }
                //             });
                //         });
                //         sessionStorage.removeItem("productsCart");
                //         sessionStorage.setItem("productsCart")
                //     }
                // });
                console.log("productsCart ACTUALIZADO", sessionStorage.getItem("productsCart"));
            })
        })

    }
    console.log(sessionStorage.getItem("productsCart"));
})