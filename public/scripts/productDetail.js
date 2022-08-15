// const e = require("express");

window.addEventListener("load", function(){
    console.log("hola");
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

    let addToCartForm = this.document.querySelector(".product-info-form");
    console.log(addToCartForm);
    addToCartForm.addEventListener("submit", function(event){
        if (document.getElementById("size").selectedIndex == 0){
            event.preventDefault();
            document.querySelector(".size-select-container-parent").style.border = "1px solid red";
            console.log("para campeon");
        }
        
    });
    document.querySelector("#size").addEventListener("change", function(event){
        document.querySelector(".size-select-container-parent").style.border = "none";
    })

})