/*

let carrito = [];


window.addEventListener('load', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    
    mostrarCarrito(); // Mostrar el carrito después de cargarlo
});
// Cargar el carrito desde el storage
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarCarrito(e) {
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombreProducto = padre.querySelector("h5").textContent;
    let precioProducto = padre.querySelector("span").textContent;
    let imgProducto = abuelo.querySelector("img").src;

    let productoExistente = carrito.find((producto) => producto.nombre === nombreProducto && !producto.eliminado);

    if (productoExistente) {
        // Si el producto ya existe y no está eliminado, aumenta la cantidad
        productoExistente.cantidad++;
    } else {
  
        let producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            img: imgProducto,
            cantidad: 1,
            eliminado: false,
        };

        carrito.push(producto);
    }

    guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
    mostrarCarrito();
}

function mostrarCarrito() {
    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for (let producto of carrito) {
        if (!producto.eliminado) {
            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${producto.img}" width="50"></td>
                              <td><p>${producto.nombre}</p></td>
                              <td>${producto.cantidad}</td>
                              <td>${producto.precio}</td>
                              <td><button class="btn btn-danger btnBorrarProducto">Borrar</button></td>`;
            tabla.append(fila);
            
        }
    }

    let btnBorrar = document.querySelectorAll(".btnBorrarProducto");

    for (let btn of btnBorrar) {
        btn.addEventListener("click", borrarProducto);
    }
}

function borrarProducto(e) {
    let abuelo = e.target.parentNode.parentNode;
    let nombreProducto = abuelo.querySelector("td:nth-child(2) p").textContent;

    let productoExistente = carrito.find((producto) => producto.nombre === nombreProducto && !producto.eliminado);

    if (productoExistente) {
        // Marcar el producto como eliminado 
                productoExistente.eliminado = true;
    }

    guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
    mostrarCarrito();
}

// EVENTOS
let btnCompra = document.querySelectorAll(".botonCompra");

for (let boton of btnCompra) {
    boton.addEventListener("click", agregarCarrito);
}



let btnLimpiarCarrito = document.getElementById("limpiarCarrito");

btnLimpiarCarrito.addEventListener("click", () => {
    // Eliminar todos los productos
    carrito = [];
    
    // Borra el storage
    localStorage.removeItem('carrito');
    
    // Mostrar el carrito
    mostrarCarrito();
});



const btnFinalizarCompra = document.getElementById("finalizarCompra");

btnFinalizarCompra.addEventListener("click", redirigirACompra);



//lo lleva a la otra pagina y comienza la magia :)
function redirigirACompra() {
    
    window.location.href = "Pages/pagar.html";
}


window.addEventListener('load', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    
    // Calcular el total y mostrar
    mostrarTotalEnPagar();
});

function mostrarTotalEnPagar() {
    // Calcular el total sumando los precios de los productos en el carrito
    let total = 0;
    for (let producto of carrito) {
        if (!producto.eliminado) {
            total += parseFloat(producto.precio) * producto.cantidad;
        }
    }
    
    // Mostrar el total en "pagar.html"
    const totalAmountElement = document.getElementById("totalAmount");
    if (totalAmountElement) {
        totalAmountElement.textContent = total.toFixed(2); // Asegura que se muestren dos decimales
    }
}
*/

let carrito = [];

window.addEventListener('load', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    // Calcular el total y mostrarlo en "pagar.html"
    mostrarTotalEnPagar();

    mostrarCarrito(); // Mostrar el carrito después de cargarlo
});

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarCarrito(e) {
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombreProducto = padre.querySelector("h5").textContent;
    let precioProducto = parseFloat(padre.querySelector("span").textContent.replace("$", "").replace(",", ""));
    let imgProducto = abuelo.querySelector("img").src;

    let productoExistente = carrito.find((producto) => producto.nombre === nombreProducto && !producto.eliminado);

    if (productoExistente) {
        // Si el producto ya existe y no está eliminado, aumenta la cantidad
        productoExistente.cantidad++;
    } else {
        let producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            img: imgProducto,
            cantidad: 1,
            eliminado: false,
        };

        carrito.push(producto);
    }

    guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
    mostrarCarrito();
}

function mostrarCarrito() {
    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for (let producto of carrito) {
        if (!producto.eliminado) {
            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${producto.img}" width="50"></td>
                              <td><p>${producto.nombre}</p></td>
                              <td>${producto.cantidad}</td>
                              <td>$${producto.precio.toFixed(2)}</td>
                              <td><button class="btn btn-danger btnBorrarProducto">Borrar</button></td>`;
            tabla.append(fila);
        }
    }

    let btnBorrar = document.querySelectorAll(".btnBorrarProducto");

    for (let btn of btnBorrar) {
        btn.addEventListener("click", borrarProducto);
    }
}

function borrarProducto(e) {
    let abuelo = e.target.parentNode.parentNode;
    let nombreProducto = abuelo.querySelector("td:nth-child(2) p").textContent;

    let productoExistente = carrito.find((producto) => producto.nombre === nombreProducto && !producto.eliminado);

    if (productoExistente) {
        productoExistente.eliminado = true;
    }

    guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
    mostrarCarrito();
}

// EVENTOS
let btnCompra = document.querySelectorAll(".botonCompra");

for (let boton of btnCompra) {
    boton.addEventListener("click", agregarCarrito);
}

let btnLimpiarCarrito = document.getElementById("limpiarCarrito");

btnLimpiarCarrito.addEventListener("click", () => {
    // Eliminar todos los productos
    carrito = [];

    // Borra el storage
    localStorage.removeItem('carrito');

    // Mostrar el carrito
    mostrarCarrito();
});

const btnFinalizarCompra = document.getElementById("finalizarCompra");

btnFinalizarCompra.addEventListener("click", redirigirACompra);

function redirigirACompra() {
    window.location.href = "Pages/pagar.html";
}

function mostrarTotalEnPagar() {
    // Calcular el total sumando los precios de los productos en el carrito
    let total = 0;
    for (let producto of carrito) {
        if (!producto.eliminado) {
            total += producto.precio * producto.cantidad;
        }
    }

    // Mostrar el total en "pagar.html"
    const totalAmountElement = document.getElementById("montoTotal");
    if (totalAmountElement) {
        totalAmountElement.textContent = total.toFixed(2); // Asegura que se muestren dos decimales
    }
}
