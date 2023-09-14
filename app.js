const cart = {
    items: [],
    total: 0,
};

// Agregar un producto al carrito
function addToCart(productName, price) {
    const existingItem = cart.items.find(item => item.productName === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const item = { productName, price, quantity: 1 };
        cart.items.push(item);
    }

    updateCart();
}
    // Eliminar un producto del carrito
    function removeFromCart(index) {
        cart.items.splice(index, 1);
        updateCart();
    }

    // Actualizar el contenido del carrito y calcular el total
    function updateCart() {
        let cartHTML = '';
        let cartTotal = 0;

        cart.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            cartTotal += itemTotal;
            cartHTML += `
                <div class="cart-item">
                    <span>${item.productName} - ${item.price} COP x ${item.quantity}</span>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
        });

        const iva = cartTotal * 0.19;
        const totalConIva = cartTotal + iva;

        cartHTML += `
            <p>Subtotal: ${cartTotal} COP</p>
            <p>IVA (19%): ${iva} COP</p>
            <p>Total: ${totalConIva} COP</p>
        `;

        document.getElementById('cart').innerHTML = cartHTML;
        document.getElementById('total').textContent = totalConIva;
    }