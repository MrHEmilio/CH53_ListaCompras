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
let datos = new Array(); // almacena los elementos como un arreglo

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

        let elemento = {
            "cont" : cont,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio
        }

        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));
        
        
        
        

        
        
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        



        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$" + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        
        //Aquí hago el local storage del resumen
        let resumen = { //Puede que aquí tenga que declarar la variable
            "cont": cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        }
        
        localStorage.setItem("resumen", JSON.stringify(resumen));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();

    }


    });// btnAgregar

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("datos")!= null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    datos.forEach((d) => {
        let row = `<tr>
        <td>${d.cont}</td>
        <td>${d.nombre}</td>
        <td>${d.cantidad}</td>
        <td>${d.precio}</td>
        </tr>`;
    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos =resumen.totalEnProductos;
        cont = resumen.cont;
    }
    precioTotal.innerText = "$" + costoTotal.toFixed(2);  
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
});