let carrito = [];

window.addEventListener("load", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }

  mostrarCarrito(); // Mostrar el carrito después de cargarlo
});
// Cargar el carrito desde el storage
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarCarrito(e) {
  let hijo = e.target;
  let padre = hijo.parentNode;
  let abuelo = padre.parentNode;

  let nombreProducto = padre.querySelector("h5").textContent;
  let precioProducto = parseFloat(
    padre.querySelector("span").textContent.replace("$", "")
  ); //convierto a numero
  let imgProducto = abuelo.querySelector("img").src;

  let productoExistente = carrito.find(
    (producto) => producto.nombre === nombreProducto && !producto.eliminado
  );

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

  guardarCarritoEnLocalStorage(); // Guardar el carrito
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

  // Calcular el precio total y mostrarlo
  calcularPrecioTotal();
}

function calcularPrecioTotal() {
  let total = 0;
  for (let producto of carrito) {
    if (!producto.eliminado) {
      total += parseFloat(producto.precio) * producto.cantidad;
    }
  }

  // precio sin iva
  const totalPrecioElement = document.getElementById("TotalSinIva");
  if (totalPrecioElement) {
    totalPrecioElement.textContent = total.toFixed(2); // decimales
  }

  // Precio con iva incluido
  const totalConIva = total * 1.21; // Multiplica por 1.21 para agregar un 21% de iva
  const totalPrecioConIvaElement = document.getElementById("TotalConIva");
  if (totalPrecioConIvaElement) {
    totalPrecioConIvaElement.textContent = totalConIva.toFixed(2); // decimales
  }
}

function borrarProducto(e) {
  let abuelo = e.target.parentNode.parentNode;
  let nombreProducto = abuelo.querySelector("td:nth-child(2) p").textContent;

  let productoExistente = carrito.find(
    (producto) => producto.nombre === nombreProducto && !producto.eliminado
  );

  if (productoExistente) {
    // Marcar el producto como eliminado
    productoExistente.eliminado = true;
  }

  guardarCarritoEnLocalStorage(); // Guardar el carrito
  mostrarCarrito();
}

// EVENTOS
let btnCompra = document.querySelectorAll(".botonCompra");

for (let boton of btnCompra) {
  boton.addEventListener("click", agregarCarrito);
}

let btnLimpiarCarrito = document.getElementById("limpiarCarrito");

btnLimpiarCarrito.addEventListener("click", () => {
  // Productos fueeera!
  carrito = [];

  // storagefueeera!
  localStorage.removeItem("carrito");

  // tu no carrito,tu te quedas
  mostrarCarrito();
});

// El form de fina de venta

// Función para validar campos y calcular el precio final

function validarCamposYCalcularPrecio() {
  const nombreInput = document.querySelector("#basic-addon1 + input");
  const telefonoInput = document.querySelector("#basic-addon2 + input");
  const edadInput = document.querySelector("#basic-addon3 + input");
  const coderSelect = document.querySelector("#basic-addon4 + input");

  const nombre = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();
  const edad = parseInt(edadInput.value.trim(), 10);
  const estudiasCoder = coderSelect.value;

  // Validar que todos los campos tengan datos
  if (nombre === "" || telefono === "" || isNaN(edad)) {
    alert("Aguantiaaaaaaa, completa todos los campos");
    return;
  }

  // Validar que el número de teléfono tenga 10 dígitos
  if (telefono.length !== 10) {
    alert("El número de teléfono debe tener exactamente 10 dígitos.");
    return;
  }

  // Validar que la edad sea mayor o igual a 18
  if (edad < 18) {
    alert("Debes ser mayor o igual a 18 años. Afueraa!");
    return;
  }

  // Calcular el precio total con iva
  let total = 0;
  for (let producto of carrito) {
    if (!producto.eliminado) {
      total += parseFloat(producto.precio) * producto.cantidad;
    }
  }

  // Precio con iva incluido
  const totalConIva = total * 1.21; // Multiplicar por 1.21 para agregar un 21% de iva

  // Aplicar un descuento del 15% si  estudias en coder :)
  let precioFinal = totalConIva;
  if (estudiasCoder === "Si") {
    precioFinal *= 0.85; // Resta un 15%
  }

  // Mostrar el precio final en el form
  const finalPagarElement = document.getElementById("finalPagar");
  if (finalPagarElement) {
    finalPagarElement.textContent = `$${precioFinal.toFixed(2)}`; // Agregar el signo de pesardo y  dos decimales
  }
}

// Llama a la función validarCamposYCalcularPrecio() cuando se hace clic en el botón "Finalizar"
const finalizaCompraBtn = document.getElementById("finalizaCompra");
if (finalizaCompraBtn) {
  finalizaCompraBtn.addEventListener("click", validarCamposYCalcularPrecio);
}