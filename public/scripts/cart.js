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

const fetchShippings = fetch("http://localhost:3000/api/main/shippings").then(response => response.json()).then(results => {
    return results;
});


window.addEventListener("load", async function(){
    let productsSizes = await fetchData;
    let shippings = await fetchShippings;
    if (productsSizes.length > 0){

        console.log(shippings);



        let productsCart = JSON.parse(sessionStorage.getItem("productsCart"));
        let updateNecessary = false;

        let auxAmmount = 0;
        productsCart.map(productCart => {
            auxAmmount += productCart.product.price_final * productCart.units;
        });
        sessionStorage.setItem("orderData", JSON.stringify({
            charges: 0,
            total_ammount: auxAmmount,
            id_shipping: document.querySelector(".summary-delivery-selection").value
        }));


        // CAMBIA EL VALOR DE LAS UNITS SI EXCEDEN EL STOCK REAL, Y ACTUALIZA EL STOCK VIRTUAL EN SESSION STORAGE

        productsCart.map(productCart => {
            let idProductDetails = "product-details"+productCart.id;
            let idProductName = "product-name"+productCart.id;
            let idProductPrice = "product-price"+productCart.id;
            // document.querySelector("#" + idProductDetails + " input")
            productsSizes.map(productSize => {
                if (productCart.product_id == productSize.product && productCart.size == productSize.size){
                    if (document.querySelector("#" + idProductDetails + " input").value > productSize.stock){
                        document.querySelector("#" + idProductDetails + " input").value = productSize.stock;
                        productCart.units = productSize.stock;
                        document.querySelector("#" + idProductName).textContent = productCart.product.whole_name + " X" + productCart.units;
                        document.querySelector("#" + idProductPrice).textContent = productCart.product.price_final * productCart.units + ".00";
                        updateNecessary = true;
                    }
                    // document.querySelector("#" + idProductDetails + " input").value;
                }
            });
        });
        if (updateNecessary){
            sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
            let newAmmount = 0;
            productsCart.map(productCart => {
                newAmmount += productCart.product.price_final * productCart.units;
            });
            document.querySelector("#cart-subtotal").textContent = newAmmount + ".00";
            document.querySelector("#cart-total").textContent = newAmmount + ".00";
            sessionStorage.setItem("orderData", JSON.stringify({
                charges: 0,
                total_ammount: newAmmount,
                id_shipping: 0
            }));
        }



        productsCart = JSON.parse(sessionStorage.getItem("productsCart"));
        productsCart.map(productCart => {
            let idProductDetails = "product-details"+productCart.id;
            let idProductName = "product-name"+productCart.id;
            let idProductPrice = "product-price"+productCart.id;

            document.querySelector("#" + idProductDetails + " input").value = productCart.units;
            document.querySelector("#" + idProductName).textContent = productCart.product.whole_name + " X" + productCart.units;
            document.querySelector("#" + idProductPrice).textContent = productCart.product.price_final * productCart.units + ".00";
        });
        let subtotalAmmount = 0;
        productsCart.map(productCart => {
            subtotalAmmount += productCart.product.price_final * productCart.units;
        });
        let id_shipping = 0;
        let charges = 0;
        let totalAmmount = subtotalAmmount;
        let selectedShippingValue = document.querySelector(".summary-delivery-selection").value;
        if (selectedShippingValue != 0){
            shippings.map(shipping => {
                if (shipping.name == selectedShippingValue){
                    totalAmmount += shipping.cost;
                    charges = shipping.cost;
                    id_shipping = shipping.id;
                }
            });
        }
        document.querySelector("#cart-subtotal").textContent = subtotalAmmount + ".00";
        document.querySelector("#cart-total").textContent = totalAmmount + ".00";
        sessionStorage.setItem("orderData", JSON.stringify({
            charges: charges,
            total_ammount: totalAmmount,
            id_shipping: id_shipping
        }));





        // CONTROLA LOS INPUTS DE SIZES Y ACTUALIZA LAS UNIDADES EN SESSION STORAGE

        productsCart.map(productCart => {
            let idProductDetails = "product-details"+productCart.id;
            let idProductName = "product-name"+productCart.id;
            let idProductPrice = "product-price"+productCart.id;


            document.querySelector("#" + idProductDetails + " input").addEventListener("change", function (){
                productsSizes.map(productSize => {
                    if (productCart.product_id == productSize.product && productCart.size == productSize.size){
                        if (document.querySelector("#" + idProductDetails + " input").value > productSize.stock){
                            document.querySelector("#" + idProductDetails + " input").classList.add("stock-field-errors");
                            // sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                        }
                        if (document.querySelector("#" + idProductDetails + " input").value <= 0){
                            document.querySelector("#" + idProductDetails + " input").classList.add("stock-field-errors");
                        }
                        else{
                            if (document.querySelector("#" + idProductDetails + " input").classList.contains("stock-field-errors")){
                                document.querySelector("#" + idProductDetails + " input").classList.remove("stock-field-errors");
                            }
                        }
                    }
                });
                
            })



            document.querySelector("#" + idProductDetails + " input").addEventListener("blur", function (){
                let updateNecessaryLive = false;
                productsSizes.map(productSize => {
                    if (productCart.product_id == productSize.product && productCart.size == productSize.size){
                        if (document.querySelector("#" + idProductDetails + " input").value > productSize.stock){
                            document.querySelector("#" + idProductDetails + " input").value = productSize.stock;
                            document.querySelector("#" + idProductDetails + " input").classList.remove("stock-field-errors");
                            updateNecessaryLive = true;
                            productCart.units = productSize.stock;
                            document.querySelector("#" + idProductName).textContent = productCart.product.whole_name + " X" + productCart.units;
                            document.querySelector("#" + idProductPrice).textContent = productCart.product.price_final * productCart.units + ".00";
                            sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                            console.log("session storage actualizado: ", sessionStorage.getItem("productsCart"));
                        }
                        if (document.querySelector("#" + idProductDetails + " input").value <= 0){
                            document.querySelector("#" + idProductDetails + " input").value = 1;
                            document.querySelector("#" + idProductDetails + " input").classList.remove("stock-field-errors");
                            updateNecessaryLive = true;
                            productCart.units = 1;
                            document.querySelector("#" + idProductName).textContent = productCart.product.whole_name + " X" + productCart.units;
                            document.querySelector("#" + idProductPrice).textContent = productCart.product.price_final * productCart.units + ".00";
                            sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                            console.log("session storage actualizado: ", sessionStorage.getItem("productsCart"));
                        }
                        else{
                            if (document.querySelector("#" + idProductDetails + " input").value != productCart.units){
                                updateNecessaryLive = true;
                                productCart.units = document.querySelector("#" + idProductDetails + " input").value;
                                document.querySelector("#" + idProductName).textContent = productCart.product.whole_name + " X" + productCart.units;
                                document.querySelector("#" + idProductPrice).textContent = productCart.product.price_final * productCart.units + ".00";
                                sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                                console.log("session storage actualizado: ", sessionStorage.getItem("productsCart"));
                            }
                            // productCart.units = document.querySelector("#" + idProductDetails + " input").value;
                            // sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
                            // console.log("session storage actualizado: ", sessionStorage.getItem("productsCart"));
                        }
                    }
                });

                if (updateNecessaryLive){
                    let auxProductsCart = JSON.parse(sessionStorage.getItem("productsCart"));
                    let ammountAux = 0;
                    auxProductsCart.map(productCart => {
                        ammountAux += productCart.product.price_final * productCart.units;
                    });
                    document.querySelector("#cart-subtotal").textContent = ammountAux + ".00";

                    let totalAmmount = 0;
                    let charges = 0;
                    let id_shipping = 0;
                    let selectedShippingValue = document.querySelector(".summary-delivery-selection").value;
                    if (selectedShippingValue != 0){
                        shippings.map(shipping => {
                            if (selectedShippingValue == shipping.name){
                                totalAmmount = ammountAux + shipping.cost;
                                charges = shipping.cost;
                                id_shipping = shipping.id;
                                document.querySelector("#cart-total").textContent = totalAmmount + ".00";
                            }
                        });
                    }else{
                        document.querySelector("#cart-total").textContent = ammountAux + ".00";
                    }

                    sessionStorage.setItem("orderData", JSON.stringify({
                        charges: charges,
                        total_ammount: totalAmmount,
                        id_shipping: id_shipping
                    }));
                }
                
            })

        });


        // ELIMINA PRODUCTOS DEL CARRITO Y ACTUALIZA EL SESSION STORAGE

        productsCart.map(productCart => {
            let idProductDetails = "product-details"+productCart.id;
            document.querySelector("#" + idProductDetails).addEventListener("submit", function (event){

                let productsCartAux = [];
                productsCart.map(aux => {
                    if (productCart.id != aux.id){
                        productsCartAux.push(aux);
                    }
                });
                sessionStorage.setItem("productsCart", JSON.stringify(productsCartAux));
                
                
                
                console.log("productsCart ACTUALIZADO", sessionStorage.getItem("productsCart"));

                let product_id = productCart.product_id;
                let size = productCart.size;
                let nameProductSizes = "productSizes" + product_id;
                if (sessionStorage.getItem(nameProductSizes) != null){
                    let productSizes = JSON.parse(sessionStorage.getItem(nameProductSizes));
                    productSizes.map(productSize => {
                        if (productSize.product == product_id && productSize.size == size){
                            productSize.stock += document.querySelector("#" + idProductDetails + " input").value;
                        }
                    });
                    sessionStorage.setItem(nameProductSizes, JSON.stringify(productsSizes));
                    console.log("stock disponible virtual actualizado");
                }

            })
        });



        // ACTUALIZA EL SELECT DE SHIPPINGS Y TODA LA DATA

            if (sessionStorage.getItem("productsCart") != null){
                if (JSON.parse(sessionStorage.getItem("productsCart")).length > 0){
                    document.querySelector(".summary-delivery-selection").addEventListener("change", function (event){
                        let subtotalAmmount = 0;
                        let id_shipping;
                        let charges;
                        shippings.map(shipping => {
                            if (shipping.name == event.target.value){
                                id_shipping = shipping.id;
                                charges = shipping.cost;
                            }
                        });
                        let productsCart = JSON.parse(sessionStorage.getItem("productsCart"));
                        productsCart.map(productCart => {
                            subtotalAmmount += productCart.product.price_final * productCart.units;
                        });
                        let totalAmmount = subtotalAmmount + charges;
                        document.querySelector("#cart-total").textContent = totalAmmount + ".00";
                        sessionStorage.setItem("orderData", JSON.stringify({
                            charges: charges,
                            total_ammount: totalAmmount,
                            id_shipping: id_shipping
                        }));
                        console.log(sessionStorage.getItem("orderData"));
                    })
                }
            }



        document.querySelector(".checkout-cta").addEventListener("click", function (event){
            let orderData = JSON.parse(sessionStorage.getItem("orderData"));
            if (JSON.parse(sessionStorage.getItem("productsCart")).length = 0 || orderData.id_shipping == 0){
                event.preventDefault();
            }
            if (orderData.id_shipping != 0 && JSON.parse(sessionStorage.getItem("productsCart")).length > 0 && orderData.total_ammount > 0){
                window.location.pathname = "/checkout";
            }
        })

    }
    console.log(sessionStorage.getItem("productsCart"));
})