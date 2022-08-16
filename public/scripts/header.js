window.addEventListener("load", function(){
    // console.log(document.querySelector("#user-id"));
    // console.log(sessionStorage.getItem("productsCart"));
    if ( document.querySelector("#user-id") ){
        console.log("session products", sessionStorage.getItem("products"));
        if (sessionStorage.getItem("products") == null){
            // console.log("voy a fetchear");
            fetch("http://localhost:3000/api/main/cart")
            .then(response => response.json())
            .then(results => {
                console.log(results.status);
                if (results.status == 200){
                    sessionStorage.setItem("productsCart", [JSON.stringify(results.cart.products)]);
                    // console.log(sessionStorage.getItem("productsCart"));
                    // console.log(JSON.stringify(sessionStorage.getItem("productsCart")));
                    // console.log(sessionStorage);
                }
                if (results.status == 400){
                    console.log("no se pudo");
                }
            });
        }
    }
    if ( document.querySelector(".fa-user") != null){
        if (sessionStorage.getItem("productsCart") != null){
            // console.log(sessionStorage.getItem("productsCart"));
            sessionStorage.removeItem("productsCart");
            // console.log(sessionStorage.getItem("productsCart"));
        }
    }
});