// Carrito de compras (Array)

const carrito = [];

// Ordenar productos de menor a mayor
const ordenarMenorMayor = () => {
    componentes.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

// Ordenar productos de mayor a menor
const ordenarMayorMenor = () => {
    componentes.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

// Mostrarmos la lista ordenada de los componentes con sus precios
const mostrarListaOrdenada = () => {
    const listaDeComponentes = componentes.map(componente => {
        return '- '+componente.componente+' $'+componente.precio
    })
    alert('Lista de precios:'+'\n\n'+listaDeComponentes.join('\n'))
    comprarComponentes(listaDeComponentes)
};

const comprarComponentes = (listaDeComponentes) => {
    let nombreComponente = "";
    let cantComponente = 0;
    let otroComponente = false;

    do{
        nombreComponente = prompt("Ingrese componente a comprar" + "\n\n" + listaDeComponentes.join('\n'));
        cantComponente = parseInt(prompt("Ingrese cantidad del componente seleccionado"));

        const componente = componentes.find(componente => componente.componente.toLocaleLowerCase() == nombreComponente.toLocaleLowerCase());

        if(componente){
            agregarAlCarrito(componente, componente.id, cantComponente);
        } else {
            alert("El componente ingresado no se encuentra");
        }
        
        otroComponente = confirm("¿Desea agregar otro componente?");
    }while(otroComponente);

    confirmarCompra();
}

const agregarAlCarrito = (componente, componenteId, cantComponente) => {
    const compRepetido = carrito.find(componente => componente.id === componenteId);

    if (!compRepetido) {
        componente.cantidad += cantComponente;
        carrito.push(componente);
    } else {
        compRepetido.cantidad += productoCantidad;
    }
};

const eliminarProductoCarrito = (nombCompAEliminar) => {
    carrito.forEach((componente, index) => {
        if (componente.componente.toLowerCase() === nombCompAEliminar.toLowerCase()) {
            if (componente.cantidad > 1) {
                componente.cantidad--
            } else {
                componente.splice(index, 1) // Elimina el componente seleccionado por el index
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaComponentesCompr = carrito.map(componente => {
        return '- '+componente.componente+' | Cantidad: '+componente.cantidad
    })

    const isCheckout = confirm('Checkout: '
        +'\n\n'+listaComponentesCompr.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un componente del carrito'
    )

    if (isCheckout) {
        finalizarCompra(listaComponentesCompr)
    } else {
        const nombreComponeteAEliminar = prompt('Ingrese el nombre del componente a eliminar:')
        eliminarProductoCarrito(nombreComponeteAEliminar)
    }
};

const finalizarCompra = (listaComponentes) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
        +'\n\n'+listaComponentes.join('\n')
        +'\n\nTotal de componentes: '+cantidadTotal
        +'\n\nEl total de su compra es: '+precioTotal
        +'\n\nGracias por su compra!'
    )
};

const comprar = () => {
    const componentesBaratos = confirm('¿Querés ordenar la lista de los componentes del mas barato al mas caro?')

    if (componentesBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};


comprar()