window.addEventListener("load", function (){
    document.querySelector("#signout-form").addEventListener("submit", function(event){
        if (sessionStorage.getItem("products") != null){
            console.log("voy a remover");
            sessionStorage.removeItem("products");
            console.log(sessionStorage);
        }
    })
})