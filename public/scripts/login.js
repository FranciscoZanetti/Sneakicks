window.addEventListener("load", function (){
    document.querySelector("#login-form").addEventListener("submit", function(){
        sessionStorage.clear();
        console.log("limpie el sessionStorage");
    })
})