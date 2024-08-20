document.addEventListener('DOMContentLoaded', () => {
    const catalogo = document.getElementById('catalogo');
    const menuCarrito = document.getElementById('menu-carrito');
    const verCarritoBtn = document.getElementById('ver-carrito');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Datos de productos predefinidos
    const productos = [
        { nombre: 'Producto 1', imagen: 'Imagenes/imagen1.png' },
        { nombre: 'Producto 2', imagen: 'Imagenes/1.webp' },
        { nombre: 'Producto 3', imagen: 'Imagenes/1234.png' },
        { nombre: 'Producto 4', imagen: 'Imagenes/imagen4.jpg' },
        { nombre: 'Producto 5', imagen: 'Imagenes/imagen5.jpg' },
        { nombre: 'Producto 6', imagen: 'Imagenes/imagen6.jpg' },
        { nombre: 'Producto 7', imagen: 'Imagenes/imagen7.jpg' },
        { nombre: 'Producto 8', imagen: 'Imagenes/imagen8.jpg' },
        { nombre: 'Producto 9', imagen: 'Imagenes/imagen9.jpg' },
        { nombre: 'Producto 10', imagen: 'Imagenes/imagen10.jpg' },
        { nombre: 'Producto 11', imagen: 'Imagenes/imagen11.jpg' },
        { nombre: 'Producto 12', imagen: 'Imagenes/imagen12.jpg' },
        { nombre: 'Producto 13', imagen: 'Imagenes/imagen13.jpg' },
        { nombre: 'Producto 14', imagen: 'Imagenes/imagen14.jpg' },
        { nombre: 'Producto 15', imagen: 'Imagenes/imagen15.jpg' },
        { nombre: 'Producto 16', imagen: 'Imagenes/imagen16.jpg' }
    ];

    function cargarProductos() {
        catalogo.innerHTML = '';
        productos.forEach((producto, index) => {
            catalogo.innerHTML += `
                <div class="producto" data-id="${index}" data-imagen="${producto.imagen}">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p class="descripcion">Descripción breve del ${producto.nombre}</p>
                    <button class="agregar-carrito">Agregar al Carrito</button>
                    <a href="https://wa.me/+18094598683?text=Hola,%20quiero%20comprar%20el%20${encodeURIComponent(producto.nombre)}" target="_blank" class="boton-agregar">
                        Enviar al WhatsApp
                    </a>
                </div>
            `;
        });
    
        // Añadir eventos a los botones del carrito
        document.querySelectorAll('.agregar-carrito').forEach(button => {
            button.addEventListener('click', (event) => {
                const productoElement = event.target.closest('.producto');
                const id = productoElement.getAttribute('data-id');
                const imagen = productoElement.getAttribute('data-imagen');
                agregarAlCarrito(id, imagen);
            });
        });
    }
    

    function agregarAlCarrito(id, imagen) {
        const existingProductIndex = carrito.findIndex(item => item.id === id);
    
        if (existingProductIndex > -1) {
            carrito[existingProductIndex].cantidad++;
        } else {
            carrito.push({ id, imagen, cantidad: 1 });
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarMenuCarrito();
    }
    

    function actualizarMenuCarrito() {
        menuCarrito.innerHTML = '';
        carrito.forEach((item, index) => {
            menuCarrito.innerHTML += `
                <div class="item-carrito">
                    <img src="${item.imagen}" alt="Producto en el carrito">
                    <p>Cantidad: <input type="number" value="${item.cantidad}" min="1" class="cantidad-carrito" data-index="${index}"></p>
                </div>
            `;
        });
    
        // Añadir botones de borrar y enviar a WhatsApp
        menuCarrito.innerHTML += `
            <button id="borrar-carrito">Borrar Todo</button>
            <button id="enviar-whatsapp">Enviar a WhatsApp</button>
        `;
    
        // Eventos para los botones y actualización de cantidades
        document.querySelectorAll('.cantidad-carrito').forEach(input => {
            input.addEventListener('change', (event) => {
                const index = event.target.getAttribute('data-index');
                carrito[index].cantidad = parseInt(event.target.value);
                localStorage.setItem('carrito', JSON.stringify(carrito));
            });
        });
    
        document.getElementById('borrar-carrito').addEventListener('click', () => {
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarMenuCarrito();
        });
    
        document.getElementById('enviar-whatsapp').addEventListener('click', () => {
            let mensaje = 'Hola, quiero comprar los siguientes productos:\n\n';
            carrito.forEach(item => {
                const producto = productos[item.id];
                mensaje += `${producto.nombre} - Cantidad: ${item.cantidad}\n`;
            });
            
            const url = `https://wa.me/+18094598683?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        });
    }
    

    verCarritoBtn.addEventListener('click', () => {
        menuCarrito.style.display = menuCarrito.style.display === 'none' || menuCarrito.style.display === '' ? 'block' : 'none';
    });

    // Inicializar la página
    cargarProductos();
    actualizarMenuCarrito();
});
