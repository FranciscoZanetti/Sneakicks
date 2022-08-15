// window.addEventListener("load", function(){
//     console.log(document.querySelector("#user-id"));
//     if ( document.querySelector("#user-id") ){
//         fetch("http://localhost:3000/api/main/cart")
//         .then(response => response.json())
//         .then(results => {
//             if (results.status == 200){
//                 sessionStorage.setItem("productsCart", [results.cart.products]);
//                 console.log(sessionStorage.getItem("productsCart"));
//             }
//             if (results.status == 400){
//                 console.log("no se pudo");
//             }
//         });
//     }
// });