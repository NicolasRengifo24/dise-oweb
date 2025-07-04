
// Datos de ejemplo
const productos = [
    { id: 1, nombre: "Refrigerador Samsung", precio: 899.99, categoria: "Refrigeración", stock: 10, imagen :"/img/Refri. Samsung.webp" },
    { id: 2, nombre: "Lavadora LG", precio: 649.99, categoria: "Lavado", stock: 15, imagen: "/img/Lavadora.webp" },
    { id: 3, nombre: "Horno Eléctrico", precio: 549.99, categoria: "Cocina", stock: 8, imagen: "/img/horno electrico.webp" },
    { id: 4, nombre: "Microondas Panasonic", precio: 129.99, categoria: "Cocina", stock: 20, imagen: "/img/horno microondas.jpg" },
];

const clientes = [
    { id: 1, nombre: "Juan Pérez", identificacion: "123456789", email: "juan@example.com", telefono: "3001234567" },
    { id: 2, nombre: "María Gómez", identificacion: "987654321", email: "maria@example.com", telefono: "3109876543" }
];



// Elementos del DOM
const productosGrid = document.getElementById('productos-grid');
const facturaItems = document.getElementById('factura-items');
const subtotalElement = document.getElementById('subtotal');
const ivaElement = document.getElementById('iva');
const totalElement = document.getElementById('total');
const modalPago = document.getElementById('modal-pago');
const closeModal = document.querySelector('.close');



// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function () {
    renderProductos();
    renderFactura();

    // Event listeners

    document.getElementById('cancelar-venta').addEventListener('click', cancelarVenta);

    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', filtrarPorCategoria);
    });

    closeModal.addEventListener('click', cerrarModalPago);

    metodosPago.forEach(metodo => {
        metodo.addEventListener('click', function () {
            metodosPago.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            metodoPago = this.dataset.metodo;
        });
    });

    montoRecibido.addEventListener('input', calcularCambio);
});

// Renderizar productos
function renderProductos() {
    productosGrid.innerHTML = '';

    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        productoCard.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                    <div class="producto-nombre">${producto.nombre}</div>
                    <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
                    <div class="producto-stock">Stock: ${producto.stock}</div>
                `;

        productoCard.addEventListener('click', () => agregarProductoFactura(producto));
        productosGrid.appendChild(productoCard);
    });
}

// Agregar producto a la factura
function agregarProductoFactura(producto) {
    const itemExistente = itemsFactura.find(item => item.producto.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        itemsFactura.push({
            producto: producto,
            cantidad: 1
        });
    }

    renderFactura();
}

// Renderizar factura
function renderFactura() {
    facturaItems.innerHTML = '';

    itemsFactura.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'factura-item';
        li.innerHTML = `
                    <div class="item-info">${item.producto.nombre}</div>
                    <div class="item-cantidad">${item.cantidad}</div>
                    <div class="item-precio">$${(item.producto.precio * item.cantidad).toFixed(2)}</div>
                    <div class="item-eliminar" data-index="${index}">×</div>
                `;

        facturaItems.appendChild(li);
    });

    // Calcular totales
    const subtotal = itemsFactura.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    ivaElement.textContent = `$${iva.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    // Event listeners para eliminar items
    document.querySelectorAll('.item-eliminar').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            itemsFactura.splice(index, 1);
            renderFactura();
        });
    });
}



// Reiniciar venta
cancelarVenta();
// Cancelar venta
function cancelarVenta() {
    itemsFactura = [];
    renderFactura();
}
