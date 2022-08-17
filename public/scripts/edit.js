
window.addEventListener("load", function (){

    let name = false, colorwave = false, brand_name = false, category = false, price = false, discount = false, release_year = false, story = false;
    let size_30 = false, size_35 = false, size_40 = false, size_45 = false, size_50 = false, size_55 = false, size_60 = false, size_65 = false,
    size_70 = false, size_75 = false, size_80 = false, size_85 = false, size_90 = false, size_95 = false, size_100 = false, size_105 = false,
    size_110 = false, size_115 = false, size_120 = false, size_125 = false, size_130 = false, size_135 = false, size_140 = false, size_145 = false,
    size_150 = false, size_155 = false;


    document.querySelector("#item-name").addEventListener("change", function (){
        if (document.querySelector("#item-name").value == ""){
            document.querySelector("#item-name").classList.add("item-input-errors");
            document.getElementById("error-message-name").style.display = "block";
            document.getElementById("error-message-name").textContent = "Este campo es obligatorio";
            name = true;
        }else{
            document.querySelector("#item-name").classList.remove("item-input-errors");
            document.getElementById("error-message-name").style.display = "none";
            name = false;
        }
    })

    document.querySelector("#item-colorwave").addEventListener("change", function (){
        if (document.querySelector("#item-colorwave").value == ""){
            document.querySelector("#item-colorwave").classList.add("item-input-errors");
            document.getElementById("error-message-colorwave").style.display = "block";
            document.getElementById("error-message-colorwave").textContent = "Este campo es obligatorio";
            colorwave = true;
        }else{
            document.querySelector("#item-colorwave").classList.remove("item-input-errors");
            document.getElementById("error-message-colorwave").style.display = "none";
            colorwave = false;
        }
    })

    document.querySelector("#item-brand_name").addEventListener("change", function (){
        if (document.querySelector("#item-brand_name").value == ""){
            document.querySelector("#item-brand_name").classList.add("item-input-errors");
            document.getElementById("error-message-brand_name").style.display = "block";
            document.getElementById("error-message-brand_name").textContent = "Este campo es obligatorio";
            brand_name = true;
        }else{
            document.querySelector("#item-brand_name").classList.remove("item-input-errors");
            document.getElementById("error-message-brand_name").style.display = "none";
            brand_name = false;
        }
    })

    document.querySelector("#item-category").addEventListener("change", function (){
        if (document.querySelector("#item-category").value == ""){
            document.querySelector("#item-category").classList.add("item-input-errors");
            document.getElementById("error-message-category").style.display = "block";
            document.getElementById("error-message-category").textContent = "Este campo es obligatorio";
            category = true;
        }else{
            document.querySelector("#item-category").classList.remove("item-input-errors");
            document.getElementById("error-message-category").style.display = "none";
            category = false;
        }
    })

    document.querySelector("#item-description").addEventListener("change", function (){
        if (document.querySelector("#item-description").value == ""){
            document.querySelector(".description-container-parent").classList.add("item-input-errors");
            document.getElementById("error-message-story").style.display = "block";
            document.getElementById("error-message-story").textContent = "Este campo es obligatorio";
            story = true;
        }else{
            document.querySelector(".description-container-parent").classList.remove("item-input-errors");
            document.getElementById("error-message-story").style.display = "none";
            story = false;
        }
    })



    document.querySelector("#item-price").addEventListener("change", function (){
        if (document.querySelector("#item-price").value == ""){
            document.querySelector("#item-price").classList.add("item-input-errors");
            document.getElementById("error-message-price").style.display = "block";
            document.getElementById("error-message-price").textContent = "Este campo es obligatorio";
            price = true;
        }
        if (document.querySelector("#item-price").value <= 0){
            document.querySelector("#item-price").classList.add("item-input-errors");
            document.getElementById("error-message-price").style.display = "block";
            document.getElementById("error-message-price").textContent = "Debe ser un precio válido";
            price = true;
        }else{
            document.querySelector("#item-price").classList.remove("item-input-errors");
            document.getElementById("error-message-price").style.display = "none";
            price = false;
        }
    })

    document.querySelector("#item-discount").addEventListener("change", function (){
        if (document.querySelector("#item-discount").value == ""){
            document.querySelector(".discount-container").classList.add("item-input-errors");
            document.getElementById("error-message-discount").style.display = "block";
            document.getElementById("error-message-discount").textContent = "Este campo es obligatorio";
            discount = true;
        }
        if (document.querySelector("#item-discount").value < 0){
            document.querySelector(".discount-container").classList.add("item-input-errors");
            document.getElementById("error-message-discount").style.display = "block";
            document.getElementById("error-message-discount").textContent = "Debe ser un descuento válido";
            discount = true;
        }
        if (document.querySelector("#item-discount").value > 90){
            document.querySelector(".discount-container").classList.add("item-input-errors");
            document.getElementById("error-message-discount").style.display = "block";
            document.getElementById("error-message-discount").textContent = "El descuento no puede ser superior al 70%";
            discount = true;
        }else{
            document.querySelector(".discount-container").classList.remove("item-input-errors");
            document.getElementById("error-message-discount").style.display = "none";
            discount = false;
        }
    })

    document.querySelector("#item-release_year").addEventListener("change", function (){
        if (document.querySelector("#item-release_year").value == ""){
            document.querySelector("#item-release_year").classList.add("item-input-errors");
            document.getElementById("error-message-release_year").style.display = "block";
            document.getElementById("error-message-release_year").textContent = "Este campo es obligatorio";
            release_year = true;
        }
        if (document.querySelector("#item-release_year").value < 1970){
            document.querySelector("#item-release_year").classList.add("item-input-errors");
            document.getElementById("error-message-release_year").style.display = "block";
            document.getElementById("error-message-release_year").textContent = "No debe ser anterior a 1970";
            release_year = true;
        }else{
            document.querySelector("#item-release_year").classList.remove("item-input-errors");
            document.getElementById("error-message-release_year").style.display = "none";
            release_year = false;
        }
    })



    document.querySelector("#size_30").addEventListener("change", function (){
        if (document.querySelector("#size_30").value == ""){
            document.querySelector("#item-size-size_30").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_30 = true;
        }
        if (document.querySelector("#size_30").value < 0){
            document.querySelector("#item-size-size_30").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_30 = true;
        }else{
            document.querySelector("#item-size-size_30").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_30 = false;
        }
    })

    document.querySelector("#size_35").addEventListener("change", function (){
        if (document.querySelector("#size_35").value == ""){
            document.querySelector("#item-size-size_35").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_35 = true;
        }
        if (document.querySelector("#size_35").value < 0){
            document.querySelector("#item-size-size_35").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_35 = true;
        }else{
            document.querySelector("#item-size-size_35").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_35 = false;
        }
    })

    document.querySelector("#size_40").addEventListener("change", function (){
        if (document.querySelector("#size_40").value == ""){
            document.querySelector("#item-size-size_40").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_40 = true;
        }
        if (document.querySelector("#size_40").value < 0){
            document.querySelector("#item-size-size_40").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_40 = true;
        }else{
            document.querySelector("#item-size-size_40").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_40 = false;
        }
    })

    document.querySelector("#size_45").addEventListener("change", function (){
        if (document.querySelector("#size_45").value == ""){
            document.querySelector("#item-size-size_45").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_45 = true;
        }
        if (document.querySelector("#size_45").value < 0){
            document.querySelector("#item-size-size_45").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_45 = true;
        }else{
            document.querySelector("#item-size-size_45").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_45 = false;
        }
    })

    document.querySelector("#size_50").addEventListener("change", function (){
        if (document.querySelector("#size_50").value == ""){
            document.querySelector("#item-size-size_50").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_50 = true;
        }
        if (document.querySelector("#size_50").value < 0){
            document.querySelector("#item-size-size_50").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_50 = true;
        }else{
            document.querySelector("#item-size-size_50").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_50 = false;
        }
    })

    document.querySelector("#size_55").addEventListener("change", function (){
        if (document.querySelector("#size_55").value == ""){
            document.querySelector("#item-size-size_55").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_55 = true;
        }
        if (document.querySelector("#size_55").value < 0){
            document.querySelector("#item-size-size_55").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_55 = true;
        }else{
            document.querySelector("#item-size-size_55").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_55 = false;
        }
    })

    document.querySelector("#size_60").addEventListener("change", function (){
        if (document.querySelector("#size_60").value == ""){
            document.querySelector("#item-size-size_60").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_60 = true;
        }
        if (document.querySelector("#size_60").value < 0){
            document.querySelector("#item-size-size_60").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_60 = true;
        }else{
            document.querySelector("#item-size-size_60").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_60 = false;
        }
    })

    document.querySelector("#size_65").addEventListener("change", function (){
        if (document.querySelector("#size_65").value == ""){
            document.querySelector("#item-size-size_65").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_65 = true;
        }
        if (document.querySelector("#size_65").value < 0){
            document.querySelector("#item-size-size_65").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_65 = true;
        }else{
            document.querySelector("#item-size-size_65").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_65 = false;
        }
    })

    document.querySelector("#size_70").addEventListener("change", function (){
        if (document.querySelector("#size_70").value == ""){
            document.querySelector("#item-size-size_70").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_70 = true;
        }
        if (document.querySelector("#size_70").value < 0){
            document.querySelector("#item-size-size_70").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_70 = true;
        }else{
            document.querySelector("#item-size-size_70").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_70 = false;
        }
    })

    document.querySelector("#size_75").addEventListener("change", function (){
        if (document.querySelector("#size_75").value == ""){
            document.querySelector("#item-size-size_75").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_75 = true;
        }
        if (document.querySelector("#size_75").value < 0){
            document.querySelector("#item-size-size_75").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_75 = true;
        }else{
            document.querySelector("#item-size-size_75").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_75 = false;
        }
    })

    document.querySelector("#size_80").addEventListener("change", function (){
        if (document.querySelector("#size_80").value == ""){
            document.querySelector("#item-size-size_80").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_80 = true;
        }
        if (document.querySelector("#size_80").value < 0){
            document.querySelector("#item-size-size_80").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_80 = true;
        }else{
            document.querySelector("#item-size-size_80").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_80 = false;
        }
    })

    document.querySelector("#size_85").addEventListener("change", function (){
        if (document.querySelector("#size_85").value == ""){
            document.querySelector("#item-size-size_85").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_85 = true;
        }
        if (document.querySelector("#size_85").value < 0){
            document.querySelector("#item-size-size_85").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_85 = true;
        }else{
            document.querySelector("#item-size-size_85").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_85 = false;
        }
    })

    document.querySelector("#size_90").addEventListener("change", function (){
        if (document.querySelector("#size_90").value == ""){
            document.querySelector("#item-size-size_90").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_90 = true;
        }
        if (document.querySelector("#size_90").value < 0){
            document.querySelector("#item-size-size_90").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_90 = true;
        }else{
            document.querySelector("#item-size-size_90").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_90 = false;
        }
    })

    document.querySelector("#size_95").addEventListener("change", function (){
        if (document.querySelector("#size_95").value == ""){
            document.querySelector("#item-size-size_95").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_95 = true;
        }
        if (document.querySelector("#size_95").value < 0){
            document.querySelector("#item-size-size_95").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_95 = true;
        }else{
            document.querySelector("#item-size-size_95").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_95 = false;
        }
    })

    document.querySelector("#size_100").addEventListener("change", function (){
        if (document.querySelector("#size_100").value == ""){
            document.querySelector("#item-size-size_100").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_100 = true;
        }
        if (document.querySelector("#size_100").value < 0){
            document.querySelector("#item-size-size_100").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_100 = true;
        }else{
            document.querySelector("#item-size-size_100").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_100 = false;
        }
    })

    document.querySelector("#size_105").addEventListener("change", function (){
        if (document.querySelector("#size_105").value == ""){
            document.querySelector("#item-size-size_105").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_105 = true;
        }
        if (document.querySelector("#size_105").value < 0){
            document.querySelector("#item-size-size_105").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_105 = true;
        }else{
            document.querySelector("#item-size-size_105").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_105 = false;
        }
    })

    document.querySelector("#size_110").addEventListener("change", function (){
        if (document.querySelector("#size_110").value == ""){
            document.querySelector("#item-size-size_110").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_110 = true;
        }
        if (document.querySelector("#size_110").value < 0){
            document.querySelector("#item-size-size_110").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_110 = true;
        }else{
            document.querySelector("#item-size-size_110").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_110 = false;
        }
    })

    document.querySelector("#size_115").addEventListener("change", function (){
        if (document.querySelector("#size_115").value == ""){
            document.querySelector("#item-size-size_115").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_115 = true;
        }
        if (document.querySelector("#size_115").value < 0){
            document.querySelector("#item-size-size_115").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_115 = true;
        }else{
            document.querySelector("#item-size-size_115").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_115 = false;
        }
    })

    document.querySelector("#size_120").addEventListener("change", function (){
        if (document.querySelector("#size_120").value == ""){
            document.querySelector("#item-size-size_120").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_120 = true;
        }
        if (document.querySelector("#size_120").value < 0){
            document.querySelector("#item-size-size_120").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_120 = true;
        }else{
            document.querySelector("#item-size-size_120").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_120 = false;
        }
    })

    document.querySelector("#size_125").addEventListener("change", function (){
        if (document.querySelector("#size_125").value == ""){
            document.querySelector("#item-size-size_125").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_125 = true;
        }
        if (document.querySelector("#size_125").value < 0){
            document.querySelector("#item-size-size_125").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_125 = true;
        }else{
            document.querySelector("#item-size-size_125").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_125 = false;
        }
    })

    document.querySelector("#size_130").addEventListener("change", function (){
        if (document.querySelector("#size_130").value == ""){
            document.querySelector("#item-size-size_130").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_130 = true;
        }
        if (document.querySelector("#size_130").value < 0){
            document.querySelector("#item-size-size_130").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_130 = true;
        }else{
            document.querySelector("#item-size-size_130").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_130 = false;
        }
    })

    document.querySelector("#size_135").addEventListener("change", function (){
        if (document.querySelector("#size_135").value == ""){
            document.querySelector("#item-size-size_135").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_135 = true;
        }
        if (document.querySelector("#size_135").value < 0){
            document.querySelector("#item-size-size_135").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_135 = true;
        }else{
            document.querySelector("#item-size-size_135").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_135 = false;
        }
    })

    document.querySelector("#size_140").addEventListener("change", function (){
        if (document.querySelector("#size_140").value == ""){
            document.querySelector("#item-size-size_140").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_140 = true;
        }
        if (document.querySelector("#size_140").value < 0){
            document.querySelector("#item-size-size_140").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_140 = true;
        }else{
            document.querySelector("#item-size-size_140").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_140 = false;
        }
    })

    document.querySelector("#size_145").addEventListener("change", function (){
        if (document.querySelector("#size_145").value == ""){
            document.querySelector("#item-size-size_145").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_145 = true;
        }
        if (document.querySelector("#size_145").value < 0){
            document.querySelector("#item-size-size_145").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_145 = true;
        }else{
            document.querySelector("#item-size-size_145").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_145 = false;
        }
    })

    document.querySelector("#size_150").addEventListener("change", function (){
        if (document.querySelector("#size_150").value == ""){
            document.querySelector("#item-size-size_150").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_150 = true;
        }
        if (document.querySelector("#size_150").value < 0){
            document.querySelector("#item-size-size_150").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_150 = true;
        }else{
            document.querySelector("#item-size-size_150").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_150 = false;
        }
    })

    document.querySelector("#size_155").addEventListener("change", function (){
        if (document.querySelector("#size_155").value == ""){
            document.querySelector("#item-size-size_155").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Este campo es obligatorio";
            size_155 = true;
        }
        if (document.querySelector("#size_155").value < 0){
            document.querySelector("#item-size-size_155").classList.add("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "block";
            document.getElementById("error-message-sizes").textContent = "Todos los stocks deben ser válidos";
            size_155 = true;
        }else{
            document.querySelector("#item-size-size_155").classList.remove("item-input-errors");
            document.getElementById("error-message-sizes").style.display = "none";
            size_155 = false;
        }
    })





    document.querySelector("#edit-product-form").addEventListener("submit", function (event){
        if (name || colorwave || brand_name || category || price || discount || release_year || story || size_30 || size_35 || size_40 || size_50 ||
            size_60 || size_65 || size_70 || size_75 || size_80 || size_85 || size_90 || size_95 || size_100 || size_105 || size_110 || size_115 ||
            size_120 || size_125 || size_130 || size_135 || size_140 || size_145 || size_150 || size_155){
                event.preventDefault();
                console.log(name, colorwave, brand_name, category, price, discount, release_year, story, size_30, size_35, size_40, size_45, size_50, size_55, size_60, size_65, size_70, size_75, size_80, size_85, size_90, size_95, size_100, size_105, size_110, size_115, size_120, size_125, size_130, size_135, size_140, size_145, size_150, size_155);
        }
        else{
            sessionStorage.clear();
        }
    })


})