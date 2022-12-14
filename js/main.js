// Creamos un array vacío para el carrito de compras

const carrito = [];

// Creamos la clase Clientes. Luego se crearan instancias de esta clase.

class clientes {
    constructor(nombre, apellido, dni, dirrecion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.dirrecion = dirrecion;
    }
}

// Variables globales que utilizaremos

let costoEnvio = 0;
let valorMetodo = 0;

// Funcion que da inicio al proceso de compra, y que decide el flujo del programa.

const eCommerce = () => {
    const productosBaratos = confirm('¿Desea ordenar la lista de productos del más barato al más caro?');
    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};

/* Con el metodo sort podemos reordenar un array comparando dos elementos del array. 
 En este primer caso compararia el precio del producto 1 (Pikachu, precio: 2300) con el producto 2 (Herakles, precio: 1500).
 Es decir, realizaria 2300 - 1500, lo que daria un valor positivo (1). Esto significa que el primer valor (a, pikachu) es 
 mayor que el segundo valor, b. Entonces, como estamos ordenando de menor a mayor, cambiara el orden colocando a Herakles una
 posicion antes que a Pikachu. Luego comparara, el actual producto de la posicion 2 (Pikachu), con el de la tercera 
 posicion (Pokegrinder, precio: 2600). Vuelve a realizar la comparacion, 2300 - 2600, lo que da un numero negativo 
 (lo lee como -1). Por lo tanto, no modifica las posiciones y sigue recorriendo el array comparando los elementos. 
 Recorrera el array hasta que todos los resultados sean negativos (-1) o den cero (0, tienen el mismo valor).
 Esto significara que siempre el elemento A, es menor al B, y que el array esta correctamente ordenado de menor a mayor.

 Este metodo modifica el array de forma permanente.*/


const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

// Con la funcion map creamos un nuevo array que unicamente va a almacenar los elementos "nombre" y "precio" del array productos.


const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- ' + producto.nombre + ', $' + producto.precio
    });
 
    comprarProductos(listaOrdenada);
};

const comprarProductos = (listaDeProductos) => {
    let seguirComprando;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
           // Generamos un string con todos los elementos del array, separados por el valor "\n", es decir, por un salto de linea.
        productoNombre = prompt('¿Que producto desea comprar?' + '\n\n' + listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('Inserte cantidad a comprar:'));

        /* Buscamos el primer elemento que coincida con la condicion que indicamos, en este caso, la condicion es que los nombres sean iguales
        (el indicado por el usuario, y el nombre del producto en el array) */

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad);
        } else {
            alert('El producto no se encuentra en el catálogo!');
        }

        seguirComprando = confirm('¿Desea agregar otro producto?')
    } while (seguirComprando);

    confirmarCompra();
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    // Capturamos al elemento segun el parametro: id. 
    const productoRepetido = carrito.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += productoCantidad
    } else {
        producto.cantidad += productoCantidad;
        // El metodo push lo utilizamos para agregar un elemento a un array ya existente (carrito, definido en la linea 2).
        carrito.push(producto)
    }
};

const eliminarProductoCarrito = (productoNombre) => {

    //  El metodo forEach va a iterar sobre el array carrito, y por cada elemento va a ejecutar el codigo dentro de el.
    // En este caso, va a comparar cada nombre de los elementos del array, con el nombre ingresado por el usuario.

    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre) {
            if (producto.cantidad > 1) {

                // Si el producto a eliminar tiene una cantidad superior a 1, se va a restar sobre esa cantidad 1. 

                producto.cantidad--
            } else {

                /*   Si el producto a eliminar tiene como cantidad el valor: 1, ese producto se eliminara del array carrito
                  gracias al metodo splice que nos permite eliminar uno o varios elementos, en cualquier posicion. 
                  El primer parametro (en este caso index) es la posicion desde la que quitaremos elementos, el segundo parametro
                  indica cuantos elementos vamos a eliminar desde la posicion declarada en el primer parametro. */

                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return producto.nombre + ', cantidad: ' + producto.cantidad + '.'
    });

    const confirmar = confirm('Checkout: '
        + '\n\n' + listaProductos.join('\n')
        + '\n\nPara continuar seleccione "Aceptar" sino "Cancelar" para eliminar productos del carrito.'
    );

    if (confirmar) {
        datosDeFacturacion(listaProductos);
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:');
        eliminarProductoCarrito(productoAEliminar);
    }
};

const datosDeFacturacion = (listaDeProductos) => {

    alert('A continuacion le solicitaremos sus datos de facturacion:')

    const nombreCliente = prompt('Ingrese su nombre:');
    const apellidoCliente = prompt('Ingrese su apellido:');
    const dniCliente = prompt('Ingrese su DNI:');
    const dirrecionCliente = prompt('Ingrese su direccion:');

    // Instanciamos la clase clientes (objeto).

    const clienteNuevo = new clientes(nombreCliente, apellidoCliente, dniCliente, dirrecionCliente);

    const confirmarDatos = confirm(
        'Tus datos de facturacion son los siguientes:'
        + '\n\n Nombre completo: ' + nombreCliente + ' ' + apellidoCliente
        + '\n\n DNI: ' + dniCliente +
        '\n\n Direccion: ' + dirrecionCliente +
        '\n\n ¿Confirma que estos datos son correctos?'
    );

    if (confirmarDatos) {
        alert('Tus datos se registraron correctamente. Puedes seguir con la compra.');
        calcularEnvio(listaDeProductos)
    }
    else {
        alert('Vuelva a ingresar sus datos.');
        datosDeFacturacion(listaDeProductos);
    }
}

const calcularEnvio = (listaProductos) => {

    let costoSucursal = 0;
    let costoDomicilio = 0;
    let codigoPostal = parseInt(prompt('Ingrese su código postal:'));

    if (codigoPostal > 0 && codigoPostal <= 2800) {
        costoSucursal = 500;
        costoDomicilio = 700;
    }

    else if (codigoPostal > 2800 && codigoPostal <= 3600) {
        costoSucursal = 700;
        costoDomicilio = 900;
    }

    else if (codigoPostal > 3600) {
        costoSucursal = 900;
        costoDomicilio = 1100;
    }

    else {
        alert('El codigo postal escrito no es valido')
        calcularEnvio(listaProductos)
    }

    let formaDeEnvio = prompt('Elija que metodo de envio desea: Sucursal o Domicilio');

    if (formaDeEnvio.toLowerCase() === "domicilio") {
        costoEnvio = costoDomicilio;
        alert('El costo de tu envio a su domicilio es de: $' + costoEnvio)
    }

    else if (formaDeEnvio.toLowerCase() === "sucursal") {
        costoEnvio = costoSucursal;
        alert('El costo de tu envio a la sucursal mas cercana es de: $' + costoEnvio)
    }

    else {
        alert('Escriba "Sucursal" o "Domicilio"')
        calcularEnvio(listaProductos)
    }

    elegirMetodo(listaProductos);

}

const elegirMetodo = (listaProductos) => {

    let metodoElegido = prompt('Indique como desea abonar su compra: Transferencia, cuotas o efectivo');

    if (metodoElegido.toLowerCase() === "transferencia") {
        valorMetodo = 0.9;
        alert('Tiene un descuento del 10% por abonar a traves de transferencia bancaria.')
    }

    else if (metodoElegido.toLowerCase() === "efectivo") {
        valorMetodo = 1;
    }

    else if (metodoElegido.toLowerCase() === "cuotas") {
        calcularIntereses(listaProductos);
    }

    else {
        alert('Debe escribir: "Transferencia", "cuotas" o "efectivo".')
    }

    finalizarCompra(listaProductos);
}

const calcularIntereses = (listaProductos) => {

    let cantidadCuotas = parseInt(prompt('¿Desea realizar el pago en: 3, 6 o 12 cuotas?'))

    if (cantidadCuotas === 3) {
        alert('El interes en 3 cuotas es del 6%.');
        valorMetodo = 1.06;
    }

    else if (cantidadCuotas === 6) {
        valorMetodo = 1.12;
        alert('El interes en 6 cuotas es del 12%.');
    }

    else if (cantidadCuotas === 12) {
        valorMetodo = 1.18;
        alert('El interes en 12 cuotas es del 18%.');
    }

    else {
        alert('Debe escribir: "3", "6" o "12".')
    }

    finalizarCompra(listaProductos);
}

const finalizarCompra = (listaProductos) => {

    /* Utilizamos reduce para acumular la suma de la propiedad "precio" y "cantidad" de los elementos del array carrito. 
    El primer parametro es la funcion que cuenta con un acumulador (acc) y el elemento del array que queremos iterar.
    El segundo parametro es el valor inicial del acumulador (0).*/

    const cantidadTotal = carrito.reduce((acc, elemento) => acc + elemento.cantidad, 0);
    const precioTotal = carrito.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0);

    // Se utiliza round para redondear al numero entero mas cercano. Espero en la proxima entrega poder reducir la cantidad
    // de decimales a dos, y no tener que redondear.

    const precioFinal = Math.round((precioTotal + costoEnvio) * valorMetodo);

    alert('Detalle de tu compra:'
        + '\n\n' + listaProductos.join('\n')
        + '\n\nTotal de productos: ' + cantidadTotal
        + '\n\nEl total de la compra es: $' + precioFinal
    );

};

eCommerce()