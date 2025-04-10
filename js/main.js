let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Numeración de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

function validarCantidad(){
    if(txtNumber.value.trim().length <= 0){
        return false;
    }//comprobamos que la cantidad sea mayor a cero 
    if(isNaN(txtNumber.value)){

        return false;
    } 

    if (Number(txtNumber.value) <= 0){
        return false;
    }

    return true;
}//valida la cantidad

function getPrecio (){
    return Math.round((Math.random()*10000)) / 100;
}


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    //bandera, al ser true permite agregar los datos a la tabla
    let isValid = true;
    

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";

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
        isValid = false;
        // txtName.value = "";
        txtName.focus();
    }
    
    if (! validarCantidad()){
        alertValidacionesTexto.innerHTML += "<br/>La cantidad no es correcta";
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "2px solid red";
        txtNumber.style.backgroundColor = "lightcoral";
        isValid = false;
        txtNumber.value = "";
        txtNumber.focus();
    } else {
        txtNumber.style.border = "2px solid green";
        txtNumber.style.backgroundColor = "lightgreen";
    } //valida la cantidad

    if (isValid){// si pasó las validaciones
        cont++;
        let precio = getPrecio();
        let row = `<tr>
        <td>${cont}</td>
        <td>${txtName.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
        </tr>`;

        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        



    costoTotal += precio * (txtNumber.value);
    precioTotal.innerText = "$" + costoTotal.toFixed(2);       
    contadorProductos.innerText = cont;


        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }


    });// btnAgregar


//validar la cantidad, que sea un numero, que sea mayor a cero, que el campo no esté vacio
