let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alerValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");




btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length > 2 ){
        txtName.style.border = "2px solid green";
        txtName.style.backgroundColor = "lightgreen";
        

    }//lenght > 2 
    else{
        alertValidacionesTexto.innerHTML = "El nombre del producto no es correcto";
        alertValidaciones.style.display = "block";
        txtName.style.border = "2px solid red";
        txtName.style.backgroundColor = "lightcoral";
    }
});// btnAgregar
