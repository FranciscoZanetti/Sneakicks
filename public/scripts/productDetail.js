// const e = require("express");

let UrlId = document.querySelector("#URLparamId").textContent;
let nameProductSizes = "productSizes" + UrlId;

const fetchData = fetch("http://localhost:3000/api/products/" + UrlId)
                    .then(response => response.json())
                    .then(results => {
                        console.log("fetcheando");
                        console.log(results);
                        console.log("Product Sizes antes", sessionStorage.getItem(nameProductSizes));
                        if (sessionStorage.getItem("productsCart") == null){
                            if (sessionStorage.getItem(nameProductSizes) == null){
                                sessionStorage.setItem(nameProductSizes, JSON.stringify(results.product.product_sizes));
                                console.log("Product Sizes durante", sessionStorage.getItem(nameProductSizes));
                            }
                        }
                        if (sessionStorage.getItem("productsCart") != null){
                            if (sessionStorage.getItem("productsCart").length == 0){
                                if (sessionStorage.getItem(nameProductSizes) == null){
                                    sessionStorage.setItem(nameProductSizes, JSON.stringify(results.product.product_sizes));
                                    console.log("Product Sizes durante", sessionStorage.getItem(nameProductSizes));
                                }
                            }
                            if (sessionStorage.getItem("productsCart").length > 0){
                                let productsCart = JSON.parse(sessionStorage.getItem("productsCart"));
                                let instancesOfProductInProductCart = [];
                                productsCart.map(productCart => {
                                    if (productCart.product_id == UrlId){
                                        instancesOfProductInProductCart.push(productCart);
                                    }
                                });
                                if (instancesOfProductInProductCart.length > 0){
                                    if (sessionStorage.getItem(nameProductSizes) == null){
                                        let resultsProduct_Sizes = results.product.product_sizes;
                                        instancesOfProductInProductCart.map(instance => {
                                            resultsProduct_Sizes.map(product_size => {
                                                if (product_size.size == instance.size){
                                                    product_size.stock = product_size.stock - instance.units;
                                                    if (product_size.stock < 0){
                                                        product_size.stock = 0;
                                                    }
                                                }
                                            });
                                        });
                                        sessionStorage.setItem(nameProductSizes, JSON.stringify(resultsProduct_Sizes));
                                        console.log("modificando los stocks virtuales");
                                        console.log("Product Sizes durante", sessionStorage.getItem(nameProductSizes));
                                    }
                                }
                                else{
                                    if (sessionStorage.getItem(nameProductSizes) == null){
                                        sessionStorage.setItem(nameProductSizes, JSON.stringify(results.product.product_sizes));
                                        console.log("Product Sizes durante", sessionStorage.getItem(nameProductSizes));
                                    }
                                }
                            }
                        }


                        console.log("Product Sizes despues", sessionStorage.getItem(nameProductSizes));
                        return "ok";
                    });

window.addEventListener("load", async () => {
    console.log("hola");

    let Ok = await fetchData;

    

    



    let descriptionButton = document.querySelector("#nav-descripcion");
    let descriptionSpan = document.querySelector("#nav-descripcion span");
    let reviewsButton = document.querySelector("#nav-reseñas");
    let reviewsSpan = document.querySelector("#nav-reseñas span");
    let sizesButton = document.querySelector("#nav-talles");
    let sizesSpan = document.querySelector("#nav-talles span");
    let DRGchecker = "nav-description";
    if (DRGchecker == "nav-description"){
        document.getElementById("description").style.display = "block";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("sizes").style.display = "none";
    }
    descriptionButton.addEventListener("click", function(event){
        DRGchecker = event.target.id;
        console.log(DRGchecker);
        document.getElementById("description").style.display = "block";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("sizes").style.display = "none";
    });
    descriptionSpan.addEventListener("click", function(event){
        event.preventDefault();
        DRGchecker = event.target.parentNode.id;
        console.log(DRGchecker);
        document.getElementById("description").style.display = "block";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("sizes").style.display = "none";
    });
    reviewsButton.addEventListener("click", function(event){
        event.preventDefault();
        DRGchecker = event.target.id;
        console.log(DRGchecker);
        document.getElementById("description").style.display = "none";
        document.getElementById("reviews").style.display = "block";
        document.getElementById("reviews").style.borderTop = "none";
        document.getElementById("sizes").style.display = "none";
    });
    reviewsSpan.addEventListener("click", function(event){
        event.preventDefault();
        DRGchecker = event.target.parentNode.id;
        console.log(DRGchecker);
        document.getElementById("description").style.display = "none";
        document.getElementById("reviews").style.display = "block";
        document.getElementById("reviews").style.borderTop = "none";
        document.getElementById("sizes").style.display = "none";
    });
    sizesButton.addEventListener("click", function(event){
        event.preventDefault();
        DRGchecker = event.target.id;
        console.log(DRGchecker);
        document.getElementById("description").style.display = "none";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("sizes").style.display = "block";
        document.getElementById("sizes").style.borderTop = "none";
    });
    sizesSpan.addEventListener("click", function(event){
        DRGchecker = event.target.parentNode.id;
        console.log(DRGchecker);
        document.getElementById("description").style.display = "none";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("sizes").style.display = "block";
        document.getElementById("sizes").style.borderTop = "none";
    });






    let selectedProductSize = "";

    let productSizesAux;

    let stockShowed = document.querySelector(".form-stock-avaiable");

    let addToCartForm = document.querySelector(".product-info-form");
    console.log(addToCartForm);
    addToCartForm.addEventListener("submit", function(event){
        if (document.getElementById("size").selectedIndex == 0){
            event.preventDefault();
            document.querySelector(".size-select-container-parent").style.border = "1px solid red";
            console.log("para campeon");
        }
        else{
            // event.preventDefault(); // eliminar esto despues

            productSizesAux = JSON.parse(sessionStorage.getItem(nameProductSizes));
            productSizesAux.map(productSize => {
                if (selectedProductSize.size == productSize.size){
                    selectedProductSize = productSize;
                }
            });
            if (selectedProductSize.stock == 0){
                event.preventDefault();
            }
            if (selectedProductSize.stock > 0){
                productSizesAux.map(productSize => {
                    if (selectedProductSize.size == productSize.size){
                        productSize.stock = productSize.stock - 1;
                    }
                });
                sessionStorage.setItem(nameProductSizes, JSON.stringify(productSizesAux));
                console.log("actualice los productsSizes");
            }
        }


        
    });
    document.querySelector("#size").addEventListener("change", function(event){
        document.querySelector(".size-select-container-parent").style.border = "none";

        console.log(event.target.value);

        productSizesAux = JSON.parse(sessionStorage.getItem(nameProductSizes));

        productSizesAux.map(productSize => {
            if (productSize.size == event.target.value){
                selectedProductSize = productSize;
                if (selectedProductSize.stock > 0){
                    stockShowed.textContent = productSize.stock + " unidades disponibles";
                }
                if (selectedProductSize.stock == 0){
                    stockShowed.textContent = "SIN STOCK";
                    stockShowed.style.color = "red";
                }
                
            }
        });

    })

})