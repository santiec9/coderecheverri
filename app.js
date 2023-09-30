document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const listaInvitados = document.getElementById("listaInvitados");

    let invitados = JSON.parse(localStorage.getItem("invitados")) || [];

    function mostrarInvitados() {
        listaInvitados.innerHTML = "";
        invitados.forEach((invitado, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.backgroundColor = invitado.confirmado ? "#4CAF50" : ""; 
            card.innerHTML = `
                <p>Apellido: ${invitado.apellido}</p>
                <p>Número de invitados: ${invitado.numInvitados}</p>
                <p>Alojamiento: ${invitado.alojamiento}</p>
                <button class="confirmar" data-index="${index}">Confirmar</button>
                <button class="desconfirmar" data-index="${index}">Desconfirmar</button>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            listaInvitados.appendChild(card);
        });

        const confirmarBotones = document.querySelectorAll(".confirmar");
        const desconfirmarBotones = document.querySelectorAll(".desconfirmar");
        const eliminarBotones = document.querySelectorAll(".eliminar");

        confirmarBotones.forEach((boton) => {
            boton.addEventListener("click", confirmarInvitado);
        });

        desconfirmarBotones.forEach((boton) => {
            boton.addEventListener("click", desconfirmarInvitado);
        });

        eliminarBotones.forEach((boton) => {
            boton.addEventListener("click", eliminarInvitado);
        });
    }

    function agregarInvitado(e) {
        e.preventDefault();

        const apellido = document.getElementById("apellido").value;
        const numInvitados = document.getElementById("numInvitados").value;
        const alojamiento = document.getElementById("alojamiento").value;

        const invitado = {
            apellido,
            numInvitados,
            alojamiento,
            confirmado: false,
        };

        invitados.push(invitado);

        localStorage.setItem("invitados", JSON.stringify(invitados));

        formulario.reset();

        mostrarInvitados();
    }

    function confirmarInvitado(e) {
        const index = e.target.getAttribute("data-index");
        invitados[index].confirmado = true;

        const card = e.target.parentElement;
        card.style.backgroundColor = "#4CAF50"; 

        localStorage.setItem("invitados", JSON.stringify(invitados));

        mostrarInvitados();
    }

    function desconfirmarInvitado(e) {
        const index = e.target.getAttribute("data-index");
        invitados[index].confirmado = false;

        const card = e.target.parentElement;
        card.style.backgroundColor = ""; 

        localStorage.setItem("invitados", JSON.stringify(invitados));

        mostrarInvitados();
    }

    function eliminarInvitado(e) {
        const index = e.target.getAttribute("data-index");
        const invitado = invitados[index];

        Swal.fire({
            title: "¿Estás seguro?",
            text: `¿Quieres eliminar al invitado ${invitado.apellido}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                invitados.splice(index, 1);

                localStorage.setItem("invitados", JSON.stringify(invitados));

                mostrarInvitados();
            }
        });
    }

    mostrarInvitados();

    formulario.addEventListener("submit", agregarInvitado);
});