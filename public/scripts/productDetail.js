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
                        return results.colorwaves;
                    });

window.addEventListener("load", async () => {
    console.log("hola");

    let colorwaves = await fetchData;

    

    



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
                console.log("agregando al carrito: ", {id: selectedProductSize.product, size: selectedProductSize.size});
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
                console.log(selectedProductSize);
                if (selectedProductSize.stock > 0){
                    stockShowed.textContent = productSize.stock + " unidades disponibles";
                }
                if (selectedProductSize.stock == 0){
                    stockShowed.textContent = "SIN STOCK";
                    stockShowed.style.color = "red";
                }
                
            }
        });

    });

    document.querySelector("#colorwave").addEventListener("change", function(event){
        if (document.querySelector(".product-info-header h2").textContent.includes(event.target.value, 0)){
            console.log("colorwave match", event.target.value);
        }
        if (!document.querySelector(".product-info-header h2").textContent.includes(event.target.value, 0)){
            console.log("colorwave diferente", event.target.value);
            colorwaves.map(colorwave => {
                if (event.target.value == colorwave.colorwave){
                    window.location.pathname = "/products/" + colorwave.id;
                }
            })
        }
    })



    document.querySelector("#nav-descripcion").addEventListener("click", function (){
        document.getElementById("nav-descripcion").style.backgroundColor = "#F10F10F10";
    })
    document.querySelector("#nav-descripcion span").addEventListener("click", function (){
        document.getElementById("nav-descripcion").style.backgroundColor = "#F10F10F10";
    })

    document.querySelector("#nav-talles").addEventListener("click", function (){
        document.getElementById("nav-talles").style.backgroundColor = "#F10F10F10";
    })
    document.querySelector("#nav-talles span").addEventListener("click", function (){
        document.getElementById("nav-talles").style.backgroundColor = "#F10F10F10";
    })

    document.querySelector("#nav-reseñas").addEventListener("click", function (){
        document.getElementById("nav-reseñas").style.backgroundColor = "#F10F10F10";
    })
    document.querySelector("#nav-reseñas span").addEventListener("click", function (){
        document.getElementById("nav-reseñas").style.backgroundColor = "#F10F10F10";
    })




    document.getElementById("radio1").addEventListener("click", function (){
        document.getElementById("star1").classList.remove("fa-regular");
        document.getElementById("star1").classList.add("fa-solid");
        document.getElementById("star2").classList.remove("fa-solid");
        document.getElementById("star2").classList.add("fa-regular");
        document.getElementById("star3").classList.remove("fa-solid");
        document.getElementById("star3").classList.add("fa-regular");
        document.getElementById("star4").classList.remove("fa-solid");
        document.getElementById("star4").classList.add("fa-regular");
        document.getElementById("star5").classList.remove("fa-solid");
        document.getElementById("star5").classList.add("fa-regular");
    })

    document.getElementById("radio2").addEventListener("click", function (){
        document.getElementById("star1").classList.remove("fa-regular");
        document.getElementById("star1").classList.add("fa-solid");
        document.getElementById("star2").classList.remove("fa-regular");
        document.getElementById("star2").classList.add("fa-solid");
        document.getElementById("star3").classList.remove("fa-solid");
        document.getElementById("star3").classList.add("fa-regular");
        document.getElementById("star4").classList.remove("fa-solid");
        document.getElementById("star4").classList.add("fa-regular");
        document.getElementById("star5").classList.remove("fa-solid");
        document.getElementById("star5").classList.add("fa-regular");
    })

    document.getElementById("radio3").addEventListener("click", function (){
        document.getElementById("star1").classList.remove("fa-regular");
        document.getElementById("star1").classList.add("fa-solid");
        document.getElementById("star2").classList.remove("fa-regular");
        document.getElementById("star2").classList.add("fa-solid");
        document.getElementById("star3").classList.remove("fa-regular");
        document.getElementById("star3").classList.add("fa-solid");
        document.getElementById("star4").classList.remove("fa-solid");
        document.getElementById("star4").classList.add("fa-regular");
        document.getElementById("star5").classList.remove("fa-solid");
        document.getElementById("star5").classList.add("fa-regular");
    })

    document.getElementById("radio4").addEventListener("click", function (){
        document.getElementById("star1").classList.remove("fa-regular");
        document.getElementById("star1").classList.add("fa-solid");
        document.getElementById("star2").classList.remove("fa-regular");
        document.getElementById("star2").classList.add("fa-solid");
        document.getElementById("star3").classList.remove("fa-regular");
        document.getElementById("star3").classList.add("fa-solid");
        document.getElementById("star4").classList.remove("fa-regular");
        document.getElementById("star4").classList.add("fa-solid");
        document.getElementById("star5").classList.remove("fa-solid");
        document.getElementById("star5").classList.add("fa-regular");
    })

    document.getElementById("radio5").addEventListener("click", function (){
        document.getElementById("star1").classList.remove("fa-regular");
        document.getElementById("star1").classList.add("fa-solid");
        document.getElementById("star2").classList.remove("fa-regular");
        document.getElementById("star2").classList.add("fa-solid");
        document.getElementById("star3").classList.remove("fa-regular");
        document.getElementById("star3").classList.add("fa-solid");
        document.getElementById("star4").classList.remove("fa-regular");
        document.getElementById("star4").classList.add("fa-solid");
        document.getElementById("star5").classList.remove("fa-regular");
        document.getElementById("star5").classList.add("fa-solid");
    })


    document.querySelector(".text-review").addEventListener("submit", function (event){
        if (document.querySelector("textarea").value == ""){
            event.preventDefault();
        }
        if ( !(document.querySelector("radio1").checked && document.querySelector("radio2").checked && document.querySelector("radio3").checked &&
        document.querySelector("radio4").checked && document.querySelector("radio5").checked) ){
            event.preventDefault();
        }
    })

})