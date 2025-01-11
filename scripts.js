document.addEventListener('DOMContentLoaded', () => {
    const catalogo = document.getElementById('catalogo');
    const menuCarrito = document.getElementById('menu-carrito');
    const verCarritoBtn = document.getElementById('ver-carrito');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Datos de productos predefinidos
    const productos = [
        { nombre: 'Audifonos M25', imagen: 'Imagenes/Producto 01.jpg', descripcion: 'Sonido envolvente y gran comodidad' },
        { nombre: 'Audifonos T2', imagen: 'Imagenes/Producto 02.jpg', descripcion: 'Elegantes, ligeros y de calidad' },
        { nombre: 'Decant', imagen: 'Imagenes/Producto 03.jpg', descripcion: 'Frascos pequeños para llevar fragancias' },
        { nombre: 'Power Bank', imagen: 'Imagenes/Producto 04.jpg', descripcion: 'Carga rápida y portátil confiable' },
        { nombre: 'Microfonos', imagen: 'Imagenes/Producto 05.jpg', descripcion: 'Compacto, inalámbrico y práctico' },
        { nombre: 'Latigo Skandal', imagen: 'Imagenes/Producto 06.jpg', descripcion: 'Latigo Skandal de Flecos' },
        { nombre: 'Producto 7', imagen: 'Imagenes/Producto 07.jpg', descripcion: 'Descripción del producto 7' },
        { nombre: 'Producto 8', imagen: 'Imagenes/Producto 08.jpg', descripcion: 'Descripción del producto 8' },
        { nombre: 'Producto 9', imagen: 'Imagenes/Producto 09.jpg', descripcion: 'Descripción del producto 9' },
        { nombre: 'Producto 10', imagen: 'Imagenes/Producto 10.jpg', descripcion: 'Descripción del producto 10' },
        { nombre: 'Producto 11', imagen: 'Imagenes/Producto 11.jpg', descripcion: 'Descripción del producto 11' },
        { nombre: 'Producto 12', imagen: 'Imagenes/Producto 12.jpg', descripcion: 'Descripción del producto 12' },
        { nombre: 'Producto 13', imagen: 'Imagenes/Producto 13.jpg', descripcion: 'Descripción del producto 13' },
        { nombre: 'Producto 14', imagen: 'Imagenes/Producto 14.jpg', descripcion: 'Descripción del producto 14' },
        { nombre: 'Producto 15', imagen: 'Imagenes/Producto 15.jpg', descripcion: 'Descripción del producto 15' },
        { nombre: 'Producto 16', imagen: 'Imagenes/Producto 16.jpg', descripcion: 'Descripción del producto 16' }
    ];
    

    function cargarProductos() {
        catalogo.innerHTML = '';
        productos.forEach((producto, index) => {
            catalogo.innerHTML += `
                <div class="producto" data-id="${index}" data-imagen="${producto.imagen}">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p class="descripcion">${producto.descripcion}</p> <!-- Usando la descripción específica -->
                    <button class="agregar-carrito">Agregar al Carrito</button>
                    <a href="https://wa.me/+18295721361?text=Hola,%20quiero%20comprar%20el%20${encodeURIComponent(producto.nombre)}" target="_blank" class="boton-agregar">
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
            
            const url = `https://wa.me/+18295721361?text=${encodeURIComponent(mensaje)}`;
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
