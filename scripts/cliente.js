
document.addEventListener('DOMContentLoaded', function () {
    const carrito = [];
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const botonVaciar = document.getElementById('vaciar-carrito');

    // Función para actualizar el carrito
    function actualizarCarrito() {
        // Limpiar el carrito
        carritoItems.innerHTML = '';

        // Calcular total
        let total = 0;

        // Agregar items al carrito
        carrito.forEach(item => {
            total += item.precio;

            const li = document.createElement('li');
            li.className = 'carrito-item';
            li.innerHTML = `
                        <span>${item.nombre}</span>
                        <span>$${item.precio.toFixed(2)}</span>
                    `;
            carritoItems.appendChild(li);
        });

        // Actualizar total
        carritoTotal.textContent = total.toFixed(2);
    }

    // Agregar producto al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const nombre = this.getAttribute('data-nombre');
            const precio = parseFloat(this.getAttribute('data-precio'));

            carrito.push({ id, nombre, precio });
            actualizarCarrito();
        });
    });

    // Vaciar carrito
    botonVaciar.addEventListener('click', function () {
        carrito.length = 0;
        actualizarCarrito();
    });
});
