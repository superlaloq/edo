
    let cart = []; // Definición de una lista para guardar los elementos del carrito
    let total = 0; // Definición de una variable para guardar el precio total
    let subtotal = 0; // Definición de una variable para guardar el precio sin IVA
    let iva = 0; // Definición de una variable para guardar el IVA
    let products = document.querySelector('#products ul'); // Definición de una variable para guardar los elementos de la lista de productos
    let cartItems = document.querySelector('#cart ul'); // Definición de una variable para guardar los elementos de la lista de carrito
    let totalPrice = document.querySelector('#total'); // Definición de una variable para guardar el precio total
    let subTotalPrice = document.querySelector('#subtotal'); // Definición de una variable para guardar el precio sin IVA
    let ivaPrice = document.querySelector('#iva'); // Definición de una variable para guardar el IVA


    // Evento para eliminar elementos del carrito
    cartItems.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) { //si el elemento es de clase delete
            let name = e.target.dataset.name; //guarda el nombre del elemento
            removeFromCart(name); //llama a la función removeFromCart
        }
    });

    // Función para agregar elementos al carrito
    function addToCart(name, price) {
        let item = { name: name, price: price }; //guarda los datos del producto
        cart.push(item); //agrega el producto al carrito
        total += parseInt(price); //actualiza el precio total
        showItems(); //muestra los elementos
        console.log("Se ejecutó una operación");// toda vez que se ejecute una operación 
        // se originará una  respuesta de consola.
    }

    // Función para eliminar elementos del carrito
    function removeFromCart(name) {
        for (let i = 0; i < cart.length; i++) { //recorre los elementos del carrito
            if (cart[i].name === name) { //si el nombre del elemento coincide
                cart.splice(i, 1); //elimina el elemento del carrito
                total -= parseInt(cart[i].price); //actualiza el precio total
            }
        }
        if (cart.length === 0) { //si no hay elementos en el carrito
            total = 0; //el total es 0
        }
        showItems(); //muestra los elementos
    }

    
// Función para calcular el precio de los elementos del carrito
function calcularPrecio() {
    let precio = 0; // Definición de una variable para guardar el precio
    for (let i = 0; i < cart.length; i++) { // Recorrer los elementos del carrito
        precio += parseInt(cart[i].price); // Sumar los precios de los elementos
    }
    return precio; // Devolver el precio total
}

    // Función para mostrar los elementos
    function showItems() {
        subtotal = total; //guarda el precio sin IVA
        iva = total * 0.19; //calcula el IVA
        total += iva; //actualiza el precio total
        let itemList = ''; //crea una variable para guardar los elementos
        for (let i = 0; i < cart.length; i++) { //recorre los elementos
            itemList += '<li>' + cart[i].name + ' - ' + cart[i].price + '<button class="delete" data-name="' + cart[i].name + '">X</button></li>'; //guarda los elementos
        }
        cartItems.innerHTML = itemList; //muestra los elementos
        totalPrice.textContent = total; //muestra el precio total
        subTotalPrice.textContent = subtotal; //muestra el precio sin IVA
        ivaPrice.textContent = iva; //muestra el IVA

    }

    // Función para descargar la boleta
    function descargar() {
        // Obtenemos los datos del carrito
        let carritoDatos = {
            "subtotal": subtotal,
            "iva": iva,
            "total": total,
            "productos": cart
        }

        // Creamos una cadena de caracteres con los datos del carrito
        let carritoDatosString = JSON.stringify(carritoDatos);

        // Creamos una URL para descargar el archivo
        let carritoURL = "data:text/json;charset=utf-8," + encodeURIComponent(carritoDatosString);

        // Creamos un elemento <a> para descargar el archivo
        let descarga = document.createElement('a');
        descarga.href = carritoURL;
        descarga.download = 'carrito.json';

        // Disparamos el clic para iniciar la descarga
        descarga.click();
    };




