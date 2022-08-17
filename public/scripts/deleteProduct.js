
window.addEventListener("load", function (){
    document.querySelector("#delete-product-form").addEventListener("submit", function (){
        sessionStorage.clear();
    })
})