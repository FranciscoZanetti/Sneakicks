
window.addEventListener("load", function (){

    let first_name = true, last_name = true, email = true, password = true;

    document.querySelector("#input-first-name").addEventListener("keypress", function (){
        if (document.querySelector("#input-first-name").value.length > 30){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-first-name").style.display = "block";
            document.getElementById("errors-first-name").textContent = "Máximo 30 caracteres";
            first_name = true;
        }
        if (document.querySelector("#input-first-name").value.includes(":") || document.querySelector("#input-first-name").value.includes(".") || document.querySelector("#input-first-name").value.includes(",") || document.querySelector("#input-first-name").value.includes(";")){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-first-name").style.display = "block";
            document.getElementById("errors-first-name").textContent = "Sin caracteres inálidos";
            first_name = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-first-name").style.display = "none";
            first_name = false;
        }
    })

    document.querySelector("#input-first-name").addEventListener("change", function (){
        if (document.querySelector("#input-first-name").value == ""){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-first-name").style.display = "block";
            document.getElementById("errors-first-name").textContent = "Este campo es obligatorio";
            first_name = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-first-name").style.display = "none";
            first_name = false;
        }
    })


    document.querySelector("#input-last-name").addEventListener("keypress", function (){
        console.log(document.querySelector("#input-last-name").value);
        if (document.querySelector("#input-last-name").value.length > 30){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-last-name").style.display = "block";
            document.getElementById("errors-last-name").textContent = "Máximo 30 caracteres";
            last_name = true;
        }
        if (document.querySelector("#input-last-name").value.includes(":") || document.querySelector("#input-last-name").value.includes(".") || document.querySelector("#input-last-name").value.includes(",") || document.querySelector("#input-last-name").value.includes(";")){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-last-name").style.display = "block";
            document.getElementById("errors-last-name").textContent = "Sin caracteres inálidos";
            last_name = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-last-name").style.display = "none";
            last_name = false;
        }
    })

    document.querySelector("#input-last-name").addEventListener("change", function (){
        if (document.querySelector("#input-last-name").value == ""){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-last-name").style.display = "block";
            document.getElementById("errors-last-name").textContent = "Este campo es obligatorio";
            last_name = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-last-name").style.display = "none";
            last_name = false;
        }
    })


    document.querySelector("#input-email").addEventListener("keypress", function (){
        if (document.querySelector("#input-email").value.length > 30){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-email").style.display = "block";
            document.getElementById("errors-email").textContent = "Máximo 30 caracteres";
            email = true;
        }
        if (document.querySelector("#input-email").value.includes(" ") || document.querySelector("#input-email").value.includes("=") || document.querySelector("#input-email").value.includes(",") || document.querySelector("#input-email").value.includes(";")){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-email").style.display = "block";
            document.getElementById("errors-email").textContent = "Sin caracteres inálidos";
            email = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-email").style.display = "none";
            email = false;
        }
    })

    document.querySelector("#input-email").addEventListener("change", function (){
        if (document.querySelector("#input-email").value == ""){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-email").style.display = "block";
            document.getElementById("errors-email").textContent = "Este campo es obligatorio";
            email = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-email").style.display = "none";
            email = false;
        }
    })


    document.querySelector("#input-password").addEventListener("keypress", function (){
        if (document.querySelector("#input-password").value.length > 30){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-password").style.display = "block";
            document.getElementById("errors-password").textContent = "Máximo 30 caracteres";
            password = true;
        }
        if (document.querySelector("#input-password").value.includes(" ") || document.querySelector("#input-password").value.includes(".") || document.querySelector("#input-password").value.includes(",") || document.querySelector("#input-password").value.includes(";")){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-password").style.display = "block";
            document.getElementById("errors-password").textContent = "Sin caracteres inálidos";
            password = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-password").style.display = "none";
            password = false;
        }
    })

    document.querySelector("#input-password").addEventListener("change", function (){
        if (document.querySelector("#input-password").value == ""){
            document.querySelector(".input-form").classList.add("input-form-errors");
            document.getElementById("errors-password").style.display = "block";
            document.getElementById("errors-password").textContent = "Este campo es obligatorio";
            password = true;
        }
        else{
            document.querySelector(".input-form").classList.remove("input-form-errors");
            document.getElementById("errors-password").style.display = "none";
            password = false;
        }
    })



    document.querySelector("#register-form").addEventListener("submit", function (event){
        if (first_name || last_name || email || password){
            event.preventDefault();
            console.log(first_name, last_name, email, password);
            document.getElementById("global-error-message").style.display = "block";
        }
        else{
            document.getElementById("global-error-message").style.display = "none";
            sessionStorage.clear();
        }
    })


})