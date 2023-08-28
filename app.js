class Menu {
    constructor (plato, precio){
        this.plato = plato;
        this.precio = precio;
    }
}

let menu = [];
menu.push(new Menu("QUESADILLA", 30000));
menu.push(new Menu("TACOS", 20000));
menu.push(new Menu("BURRITO", 40000));
menu.push(new Menu("FLAN", 10000));
menu.push(new Menu("MARGARITA", 10000));

let cuenta = [];
alert('Bienvenido a este simulador de facturas de nuestro restaurante =)');
alert('Para poder disfrutar de toda la experiencia debes de abrir tu consola');
alert('Ahora si, vamos a comer!!!!')
while (true) {
    let selector = prompt(`Menú:\n1. QUESADILLA ($30000)\n2. TACOS ($20000)\n3. BURRITO ($40000)\n4. FLAN ($10000)\n5. MARGARITA ($10000)\n\nSelecciona un producto (1-5) o escribe "PAGAR" para finalizar:`);
    
    if (selector === "PAGAR") {
        break;
    }

    let opcion = parseInt(selector);
    if (opcion >= 1 && opcion <= 5) {
        let cantidad = parseInt(prompt(`Ingresa la cantidad de ${menu[opcion - 1].plato} que deseas:`));
        if (cantidad > 0) {
            let found = false;
            for (const item of cuenta) {
                if (item.plato === menu[opcion - 1].plato) {
                    item.cantidad += cantidad;
                    found = true;
                    break;
                }
            }
            if (!found) {
                menu[opcion - 1].cantidad = cantidad;
                cuenta.push(menu[opcion - 1]);
            }
        } else {
            console.log("Cantidad inválida.");
        }
    } else {
        console.log("Opción inválida.");
    }
}

let subtotal = 0;
for (const item of cuenta) {
    subtotal += item.precio * item.cantidad;
}

let iva = subtotal * 0.19;
let total = subtotal + iva;

console.log("Productos seleccionados:");
for (const item of cuenta) {
    console.log(`${item.plato} x${item.cantidad} - $${item.precio * item.cantidad}`);
}
console.log(`Subtotal: $${subtotal}`);
console.log(`Total IVA (19%): $${iva}`);
console.log(`Total a pagar: $${total}`);