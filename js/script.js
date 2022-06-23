//Clase Reserva
class Reserva {

    constructor(id, dni, nombre, apellido, dia, horario, mesa, cantidadPersonas, reservada) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dia = dia;
        this.horario = horario;
        this.mesa = mesa;
        this.cantidadPersonas = cantidadPersonas;
        this.reservada = reservada;
    }

    //Acá van los métodos que van a manejar los objetos de la clase

    //Reservar mesa
    reservarMesa(reserva, array) {
        let indice = array.findIndex(r => {
            return r.id == reserva.id
        });
        array[indice].dni = reserva.dni;
        array[indice].nombre = reserva.nombre;
        array[indice].apellido = reserva.apellido;
        array[indice].reservada = true;
        return array;
    }

    //Buscar reserva x DNI
    buscarReservaXDni(dniIngresado, array) {
        let arrayReservasPorDni = [];
        for (const reserva of array) {
            if (reserva.dni == dniIngresado) {
                arrayReservasPorDni.push(reserva);
            }
        }
        if (arrayReservasPorDni.length != 0) {
            return arrayReservasPorDni;
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'No tiene reservas a su nombre'
            });
            return arrayReservasPorDni;
        }
    }

    //Eliminar reserva
    eliminarReserva(id, array) {
        for (const mesa of array) {
            if (mesa.id == id) {
                mesa.dni = 0;
                mesa.nombre = "";
                mesa.apellido = "";
                mesa.reservada = false;
                break;
            }
        }
        return array;
    }

}

//Esto debería traerse de una API u otro lado más adelante.
let reserva = new Reserva();
let arrayMesas = [];
//Instancia de la lista
//let listaMesas = new ListaMesas(arrayMesas);

//Array usado como manejador, solo sirve a fines de manipulación
let arrayReservasEncontradas = [];
//DNI
let dniIngresado;

//LocalStorage
let existe = localStorage.getItem("arrayMesas");
console.log(existe);
if (existe != null) {
    let arrayMesasLS = JSON.parse(localStorage.getItem("arrayMesas"));
    for (const mesa of arrayMesasLS) {
        arrayMesas.push(new Reserva(mesa.id, mesa.dni, mesa.nombre, mesa.apellido, mesa.dia, mesa.horario, mesa.mesa, mesa.cantidadPersonas, mesa.reservada));
    }
} else {
    arrayMesas = cargarMesas();
    localStorage.setItem("arrayMesas", JSON.stringify(arrayMesas));
}

//DOM
let tabla = document.getElementById("table");
let tablaSecundaria = document.getElementById("tablaSecundaria");
let tablaTerciaria = document.getElementById("tablaTerciaria");

let radiobuttoms = document.getElementsByClassName("radio");

let btnReservar = document.getElementById("btnReservar");
let btnEliminar = document.getElementById("btnEliminar");
let btnBuscar = document.getElementById("btnBuscar");

let divReservar = document.getElementById("divReservar");
let inputDniR = document.getElementById("inputDniR");
let inputNombreR = document.getElementById("inputNombreR");
let inputApellidoR = document.getElementById("inputApellidoR");
let btnConfirmarR = document.getElementById("btnConfirmarR");
let btnCancelarR = document.getElementById("btnCancelarR");

let divEliminar = document.getElementById("divEliminar");
let inputDniE = document.getElementById("inputDniE");
let btnConfirmarE = document.getElementById("btnConfirmarE");
let btnCancelarE = document.getElementById("btnCancelarE");
let divEliminarE = document.getElementById("divEliminarE");
let btnConfirmarEID = document.getElementById("btnConfirmarEID");
let btnCancelarEID = document.getElementById("btnCancelarEID");

let divBuscar = document.getElementById("divBuscar");
let inputDniB = document.getElementById("inputDniB");
let btnConfirmarB = document.getElementById("btnConfirmarB");
let btnCancelarB = document.getElementById("btnCancelarB");
let divBuscarB = document.getElementById("divBuscarB");
let btnConfirmarBID = document.getElementById("btnConfirmarBID");
let btnCancelarBID = document.getElementById("btnCancelarBID");

let sinMesas = document.getElementById("sinMesas");
let conMesas = document.getElementById("conMesas");

//Eventos
//OnLoad
window.addEventListener("load", function() {
    refrescarTablaPrincipal();
    let usuarioLS = localStorage.getItem("usuario");
    usuarioLS = JSON.parse(usuarioLS);
    let arrayReservasIniciales = reserva.buscarReservaXDni(usuarioLS.dni, arrayMesas);
    console.log(arrayReservasIniciales);
    if (arrayReservasIniciales != null) {
        inputDniR.value = usuarioLS.dni;
        inputNombreR.value = arrayReservasIniciales[0].nombre;
        inputApellidoR.value = arrayReservasIniciales[0].apellido;
        inputDniB.value = usuarioLS.dni;
        inputDniE.value = usuarioLS.dni;
        inputDniR.disabled = true;
        inputNombreR.disabled = true;
        inputApellidoR.disabled = true;
        inputDniB.disabled = true;
        inputDniE.disabled = true;
    }
});

btnReservar.addEventListener("click", () => {
    //Se muestra el form para reservar y se deshabilitan los botones principales
    divReservar.classList.remove("display");
    btnReservar.disabled = true;
    btnEliminar.disabled = true;
    btnBuscar.disabled = true;
});

inputDniR.addEventListener("keypress", (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault();
        Toastify({
            text: "Solo puede ingresar números!!!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "red",
            }
        }).showToast();
    }
});

inputNombreR.addEventListener("keypress", (e) => {
    if (e.charCode == 32 || (e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122)) {
        //No hace nada!
    } else {
        e.preventDefault();
        Toastify({
            text: "Solo puede ingresar letras!!!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "red",
            }
        }).showToast();
    }
});

inputApellidoR.addEventListener("keypress", (e) => {
    if (e.charCode == 32 || (e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122)) {
        //No hace nada!
    } else {
        e.preventDefault();
        Toastify({
            text: "Solo puede ingresar letras!!!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "red",
            }
        }).showToast();
    }
});

inputDniE.addEventListener("keypress", (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault();
        Toastify({
            text: "Solo puede ingresar números!!!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "red",
            }
        }).showToast();
    }
});

inputDniB.addEventListener("keypress", (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault();
        Toastify({
            text: "Solo puede ingresar números!!!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "red",
            }
        }).showToast();
    }
});

btnConfirmarR.addEventListener("click", () => {
    Swal.fire({
        title: 'Está seguro de realizar la reserva',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            //Se toman las variables ingresadas
            dniIngresado = inputDniR.value;
            let nombre = inputNombreR.value;
            let apellido = inputApellidoR.value;
            let indice;

            for (let index = 0; index < radiobuttoms.length; index++) {
                if (radiobuttoms[index].checked) {
                    indice = index;
                    break;
                }
            }

            let fecha = tabla.tBodies[0].rows[indice].cells[1].innerHTML;
            let hora = tabla.tBodies[0].rows[indice].cells[2].innerHTML;
            let mesa = tabla.tBodies[0].rows[indice].cells[3].innerHTML;
            let cantidaPersonas = tabla.tBodies[0].rows[indice].cells[4].innerHTML;
            let idMesa = tabla.tBodies[0].rows[indice].cells[5].innerHTML;
            let objetoReserva = new Reserva(idMesa, dniIngresado, nombre, apellido, fecha, hora, mesa, cantidaPersonas, true);

            arrayMesas = reserva.reservarMesa(objetoReserva, arrayMesas);
            localStorage.setItem("arrayMesas", JSON.stringify(arrayMesas));
            console.log(arrayMesas);
            refrescarTablaPrincipal();

            //Se esconde el form para reservar y se habilitan nuevamente los botones
            divReservar.classList.add("display");
            btnReservar.disabled = false;
            btnEliminar.disabled = false;
            btnBuscar.disabled = false;
            //Se limpian los botones
            inputDniR.value = "";
            inputNombreR.value = "";
            inputApellidoR.value = "";
            Swal.fire('Reserva realizada!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('La reserva no se realizó!', '', 'info');
        }
    });
});

btnCancelarR.addEventListener("click", () => {
    //Se esconde el form para reservar y se habilitan nuevamente los botones
    divReservar.classList.add("display");
    btnReservar.disabled = false;
    btnEliminar.disabled = false;
    btnBuscar.disabled = false;
    //Se limpian los botones
    inputDniR.value = "";
    inputNombreR.value = "";
    inputApellidoR.value = "";
});

btnEliminar.addEventListener("click", () => {
    //Se muestra el form para eliminar y se deshabilitan los botones principales
    divEliminar.classList.remove("display");
    btnReservar.disabled = true;
    btnEliminar.disabled = true;
    btnBuscar.disabled = true;
});

btnConfirmarE.addEventListener("click", () => {
    dniIngresado = inputDniE.value;
    arrayReservasEncontradas = reserva.buscarReservaXDni(dniIngresado, arrayMesas);
    if (arrayReservasEncontradas.length != 0) {
        //Se carga la tabla secundaria
        creartablaSecundaria(arrayReservasEncontradas);
        divEliminarE.classList.remove("display");
        inputDniE.disabled = true;
        btnConfirmarE.disabled = true;
        btnCancelarE.disabled = true;
    }
});

btnCancelarE.addEventListener("click", () => {
    //Se esconde el form para eliminar y se habilitan nuevamente los botones
    divEliminar.classList.add("display");
    btnReservar.disabled = false;
    btnEliminar.disabled = false;
    btnBuscar.disabled = false;
    inputDniE.value = "";
});

btnConfirmarEID.addEventListener("click", () => {

    Swal.fire({
        title: 'Está seguro de eliminar la reserva?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            //Se ve cual el registro elegido
            for (let index = 0; index < radiobuttoms.length; index++) {
                if (radiobuttoms[index].checked) {
                    indice = index;
                    break;
                }
            }

            let idMesa = tablaSecundaria.tBodies[0].rows[indice].cells[5].innerHTML;

            arrayMesas = reserva.eliminarReserva(idMesa, arrayMesas);
            localStorage.setItem("arrayMesas", JSON.stringify(arrayMesas));
            console.log(arrayMesas);
            refrescarTablaPrincipal();

            //Se esconde el form para eliminar x id y el anterior, y se habilitan nuevamente los botones
            divEliminarE.classList.add("display");
            divEliminar.classList.add("display");
            btnConfirmarE.disabled = false;
            btnCancelarE.disabled = false;
            inputDniE.disabled = false;
            btnReservar.disabled = false;
            btnEliminar.disabled = false;
            btnBuscar.disabled = false;
            Swal.fire('La reserva se elimino con éxito!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('La reserva no ha sido eliminada!', '', 'info');
        }
    })

});

btnCancelarEID.addEventListener("click", () => {
    //Se esconde el form para eliminar x id y se habilitan nuevamente los botones
    divEliminarE.classList.add("display");
    inputDniE.disabled = false;
    btnConfirmarE.disabled = false;
    btnCancelarE.disabled = false;
});

btnBuscar.addEventListener("click", () => {
    //Se muestra el form para eliminar y se deshabilitan los botones principales
    divBuscar.classList.remove("display");
    btnReservar.disabled = true;
    btnEliminar.disabled = true;
    btnBuscar.disabled = true;
});

btnConfirmarB.addEventListener("click", () => {
    dniIngresado = inputDniB.value;
    arrayReservasEncontradas = reserva.buscarReservaXDni(dniIngresado, arrayMesas);
    if (arrayReservasEncontradas != 0) {
        //Se carga la tabla secundaria
        creartablaTerciaria(arrayReservasEncontradas);
        divBuscarB.classList.remove("display");
        btnConfirmarB.disabled = true;
        btnCancelarB.disabled = true;
        inputDniB.disabled = true;
    }
});

btnCancelarB.addEventListener("click", () => {
    //Se esconde el form para eliminar y se habilitan nuevamente los botones
    divBuscar.classList.add("display");
    btnReservar.disabled = false;
    btnEliminar.disabled = false;
    btnBuscar.disabled = false;
    inputDniB.value = "";
});

btnConfirmarBID.addEventListener("click", () => {
    console.log(arrayMesas);
    //Se esconde el form para eliminar x id y el anterior, y se habilitan nuevamente los botones
    divBuscarB.classList.add("display");
    divBuscar.classList.add("display");
    inputDniB.disabled = false;
    btnConfirmarB.disabled = false;
    btnCancelarB.disabled = false;
    btnReservar.disabled = false;
    btnEliminar.disabled = false;
    btnBuscar.disabled = false;
});

btnCancelarBID.addEventListener("click", () => {
    //Se esconde el form para buscar y se habilitan nuevamente los botones
    divBuscarB.classList.add("display");
    inputDniB.disabled = false;
    btnConfirmarB.disabled = false;
    btnCancelarB.disabled = false;
});

//Funciones

//Se carga el array de mesas hardcodeado
function cargarMesas() {
    let arrayMesas = [];
    arrayMesas.push(new Reserva(1, 0, "", "", "23/05/2022", "22:00 hs", 1, 4, false));
    arrayMesas.push(new Reserva(2, 0, "", "", "24/05/2022", "22:00 hs", 1, 4, false));
    arrayMesas.push(new Reserva(3, 0, "", "", "25/05/2022", "22:00 hs", 1, 4, false));
    arrayMesas.push(new Reserva(4, 0, "", "", "26/05/2022", "22:00 hs", 1, 4, false));
    arrayMesas.push(new Reserva(5, 0, "", "", "27/05/2022", "22:00 hs", 1, 4, false));
    arrayMesas.push(new Reserva(6, 0, "", "", "28/05/2022", "22:00 hs", 1, 4, false));
    arrayMesas.push(new Reserva(7, 0, "", "", "29/05/2022", "22:00 hs", 1, 4, false));
    arrayMesas.push(new Reserva(8, 12345678, "Juan", "Pérez", "30/05/2022", "22:00 hs", 1, 4, true));
    arrayMesas.push(new Reserva(9, 23456789, "Marcelo", "Juárez", "31/05/2022", "22:00 hs", 1, 4, true));
    arrayMesas.push(new Reserva(10, 34567891, "Nicolas", "Márquez", "01/06/2022", "22:00 hs", 1, 4, true));
    arrayMesas.push(new Reserva(11, 45678912, "Martín", "López", "02/06/2022", "22:00 hs", 1, 4, true));
    return arrayMesas;
}

function refrescarTablaPrincipal() {

    if (arrayMesas.find(x => x.reservada == false)) {

        let theadAnterior = document.getElementById("theadPrincipal");
        let tbodyAnterior = document.getElementById("tbodyPrincipal");
        if (theadAnterior && theadAnterior) {
            tabla.removeChild(theadAnterior);
            tabla.removeChild(tbodyAnterior);
        }

        //Si hay mesas disponibles, crear tabla y mostrar. Caso contrario, no hacer nada!
        //Se crean filas y columnas estáticas para formar la tabla
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        let trCabecera = document.createElement("tr");
        let trPrincipal = document.createElement("tr");
        let thAntelacion = document.createElement("th");
        let thReserva = document.createElement("th");
        let thDia = document.createElement("th");
        let thHorario = document.createElement("th");
        let thMesaDisponible = document.createElement("th");
        let thCantidadPersonas = document.createElement("th");
        let thIdMesa = document.createElement("td");
        let contador = 0;

        //Se le setean atributos a los campos de arriba
        thead.setAttribute("id", "theadPrincipal");
        tbody.setAttribute("id", "tbodyPrincipal");
        thAntelacion.setAttribute("colspan", "5");
        thReserva.setAttribute("scope", "col");
        thDia.setAttribute("scope", "col");
        thHorario.setAttribute("scope", "col");
        thMesaDisponible.setAttribute("scope", "col");
        thCantidadPersonas.setAttribute("scope", "col");
        thIdMesa.setAttribute("scope", "col");
        thIdMesa.classList.add("display");

        //Se setea contenido
        thAntelacion.innerHTML = "Las reservas ofrecidas son con una semana de antelación";
        thReserva.innerHTML = "¿Reservar?";
        thDia.innerHTML = "Día";
        thHorario.innerHTML = "Horario";
        thMesaDisponible.innerHTML = "Mesa disponible";
        thCantidadPersonas.innerHTML = "Cantidad Personas";
        thIdMesa.innerHTML = "Id de la mesa";

        //Se adicionan todos los registros en cascada
        tabla.appendChild(thead);
        tabla.appendChild(tbody);
        thead.appendChild(trCabecera);
        thead.appendChild(trPrincipal);
        trCabecera.appendChild(thAntelacion);
        trPrincipal.appendChild(thReserva);
        trPrincipal.appendChild(thDia);
        trPrincipal.appendChild(thHorario);
        trPrincipal.appendChild(thMesaDisponible);
        trPrincipal.appendChild(thCantidadPersonas);
        trPrincipal.appendChild(thIdMesa);

        //Se crean las filas de la tabla dinámicamente
        for (const mesa of arrayMesas) {
            if (mesa.reservada == false) {
                //Se crean los elementos
                let tr = document.createElement("tr");
                let thRadio = document.createElement("th");
                let inputRadio = document.createElement("input");
                let thFecha = document.createElement("th");
                let thHora = document.createElement("th");
                let tdMesa = document.createElement("td");
                let tdCantPersonas = document.createElement("td");
                let tdIdMesa = document.createElement("td");

                //Se setean atributos varios
                inputRadio.setAttribute("type", "radio");
                inputRadio.setAttribute("name", "mesasLibres");
                if (contador < 1) {
                    inputRadio.setAttribute("checked", "");
                    contador++;
                }
                inputRadio.classList.add("radio");
                thFecha.setAttribute("scope", "row");
                tdIdMesa.classList.add("display");

                //Se define el contenido
                thFecha.innerHTML = mesa.dia;
                thHora.innerHTML = mesa.horario;
                tdMesa.innerHTML = mesa.mesa;
                tdCantPersonas.innerHTML = mesa.cantidadPersonas;
                tdIdMesa.innerHTML = mesa.id;

                //Se agrega los append
                tbody.appendChild(tr);
                tr.appendChild(thRadio);
                thRadio.appendChild(inputRadio);
                tr.appendChild(thFecha);
                tr.appendChild(thHora);
                tr.appendChild(tdMesa);
                tr.appendChild(tdCantPersonas);
                tr.appendChild(tdIdMesa);
            }
        }
        sinMesas.classList.add("display");
        conMesas.classList.remove("display");
    } else {
        sinMesas.classList.remove("display");
        conMesas.classList.add("display");
        btnReservar.disabled = true;
    }
}

function creartablaSecundaria(arrayReservasEncontradas) {

    let theadAnterior = document.getElementById("theadSecundario");
    let tbodyAnterior = document.getElementById("tbodySecundario");
    if (theadAnterior && theadAnterior) {
        tablaSecundaria.removeChild(theadAnterior);
        tablaSecundaria.removeChild(tbodyAnterior);
    }

    //Se crean filas y columnas estáticas para formar la tabla
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let trCabecera = document.createElement("tr");
    let trPrincipal = document.createElement("tr");
    let thAntelacion = document.createElement("th");
    let thReserva = document.createElement("th");
    let thDia = document.createElement("th");
    let thHorario = document.createElement("th");
    let thMesaDisponible = document.createElement("th");
    let thCantidadPersonas = document.createElement("th");
    let thIdMesa = document.createElement("th");
    let contador = 0;

    //Se le setean atributos a los campos de arriba
    thead.setAttribute("id", "theadSecundario");
    tbody.setAttribute("id", "tbodySecundario");
    thAntelacion.setAttribute("colspan", "6");
    thReserva.setAttribute("scope", "col");
    thDia.setAttribute("scope", "col");
    thHorario.setAttribute("scope", "col");
    thMesaDisponible.setAttribute("scope", "col");
    thCantidadPersonas.setAttribute("scope", "col");
    thIdMesa.setAttribute("scope", "col");
    thIdMesa.classList.add("display");

    //Se setea contenido
    thAntelacion.innerHTML = "Las reservas ofrecidas son con una semana de antelación";
    thReserva.innerHTML = "¿Reservar?";
    thDia.innerHTML = "Día";
    thHorario.innerHTML = "Horario";
    thMesaDisponible.innerHTML = "Mesa disponible";
    thCantidadPersonas.innerHTML = "Cantidad Personas";
    thIdMesa.innerHTML = "Id de la mesa";

    //Se adicionan todos los registros en cascada
    tablaSecundaria.appendChild(thead);
    tablaSecundaria.appendChild(tbody);
    thead.appendChild(trCabecera);
    thead.appendChild(trPrincipal);
    trCabecera.appendChild(thAntelacion);
    trPrincipal.appendChild(thReserva);
    trPrincipal.appendChild(thDia);
    trPrincipal.appendChild(thHorario);
    trPrincipal.appendChild(thMesaDisponible);
    trPrincipal.appendChild(thCantidadPersonas);
    trPrincipal.appendChild(thIdMesa);

    //Se crean las filas de la tabla dinámicamente
    for (const mesa of arrayReservasEncontradas) {
        //Se crean los elementos
        let tr = document.createElement("tr");
        let thRadio = document.createElement("th");
        let inputRadio = document.createElement("input");
        let thFecha = document.createElement("th");
        let thHora = document.createElement("th");
        let tdMesa = document.createElement("td");
        let tdCantPersonas = document.createElement("td");
        let tdIdMesa = document.createElement("td");

        //Se setean atributos varios
        inputRadio.setAttribute("type", "radio");
        inputRadio.setAttribute("name", "mesasOcupadasE");
        if (contador < 1) {
            inputRadio.setAttribute("checked", "");
            contador++;
        }
        inputRadio.classList.add("radio");
        thFecha.setAttribute("scope", "row");
        tdIdMesa.classList.add("display");

        //Se define el contenido
        thFecha.innerHTML = mesa.dia;
        thHora.innerHTML = mesa.horario;
        tdMesa.innerHTML = mesa.mesa;
        tdCantPersonas.innerHTML = mesa.cantidadPersonas;
        tdIdMesa.innerHTML = mesa.id;

        //Se agrega los append
        tbody.appendChild(tr);
        tr.appendChild(thRadio);
        thRadio.appendChild(inputRadio);
        tr.appendChild(thFecha);
        tr.appendChild(thHora);
        tr.appendChild(tdMesa);
        tr.appendChild(tdCantPersonas);
        tr.appendChild(tdIdMesa);
    }
}

function creartablaTerciaria(arrayReservasEncontradas) {

    let theadAnterior = document.getElementById("theadTerciaria");
    let tbodyAnterior = document.getElementById("tbodyTerciaria");
    if (theadAnterior && theadAnterior) {
        tablaTerciaria.removeChild(theadAnterior);
        tablaTerciaria.removeChild(tbodyAnterior);
    }

    //Se crean filas y columnas estáticas para formar la tabla
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let trCabecera = document.createElement("tr");
    let trPrincipal = document.createElement("tr");
    let thAntelacion = document.createElement("th");
    let thReserva = document.createElement("th");
    let thDia = document.createElement("th");
    let thHorario = document.createElement("th");
    let thMesaDisponible = document.createElement("th");
    let thCantidadPersonas = document.createElement("th");
    let thIdMesa = document.createElement("th");
    let contador = 0;

    //Se le setean atributos a los campos de arriba
    thead.setAttribute("id", "theadTerciaria");
    tbody.setAttribute("id", "tbodyTerciaria");
    thAntelacion.setAttribute("colspan", "6");
    thReserva.setAttribute("scope", "col");
    thDia.setAttribute("scope", "col");
    thHorario.setAttribute("scope", "col");
    thMesaDisponible.setAttribute("scope", "col");
    thCantidadPersonas.setAttribute("scope", "col");
    thIdMesa.setAttribute("scope", "col");
    thIdMesa.classList.add("display");

    //Se setea contenido
    thAntelacion.innerHTML = "Las reservas ofrecidas son con una semana de antelación";
    thReserva.innerHTML = "¿Reservar?";
    thDia.innerHTML = "Día";
    thHorario.innerHTML = "Horario";
    thMesaDisponible.innerHTML = "Mesa disponible";
    thCantidadPersonas.innerHTML = "Cantidad Personas";
    thIdMesa.innerHTML = "Id de la mesa";

    //Se adicionan todos los registros en cascada
    tablaTerciaria.appendChild(thead);
    tablaTerciaria.appendChild(tbody);
    thead.appendChild(trCabecera);
    thead.appendChild(trPrincipal);
    trCabecera.appendChild(thAntelacion);
    trPrincipal.appendChild(thReserva);
    trPrincipal.appendChild(thDia);
    trPrincipal.appendChild(thHorario);
    trPrincipal.appendChild(thMesaDisponible);
    trPrincipal.appendChild(thCantidadPersonas);
    trPrincipal.appendChild(thIdMesa);

    //Se crean las filas de la tabla dinámicamente
    for (const mesa of arrayReservasEncontradas) {
        //Se crean los elementos
        let tr = document.createElement("tr");
        let thRadio = document.createElement("th");
        let inputRadio = document.createElement("input");
        let thFecha = document.createElement("th");
        let thHora = document.createElement("th");
        let tdMesa = document.createElement("td");
        let tdCantPersonas = document.createElement("td");
        let tdIdMesa = document.createElement("td");

        //Se setean atributos varios
        inputRadio.setAttribute("type", "radio");
        inputRadio.setAttribute("name", "mesasOcupadasB");
        if (contador < 1) {
            inputRadio.setAttribute("checked", "");
            contador++;
        }
        inputRadio.classList.add("radio");
        thFecha.setAttribute("scope", "row");
        tdIdMesa.classList.add("display");

        //Se define el contenido
        thFecha.innerHTML = mesa.dia;
        thHora.innerHTML = mesa.horario;
        tdMesa.innerHTML = mesa.mesa;
        tdCantPersonas.innerHTML = mesa.cantidadPersonas;
        tdIdMesa.innerHTML = mesa.id;

        //Se agrega los append
        tbody.appendChild(tr);
        tr.appendChild(thRadio);
        thRadio.appendChild(inputRadio);
        tr.appendChild(thFecha);
        tr.appendChild(thHora);
        tr.appendChild(tdMesa);
        tr.appendChild(tdCantPersonas);
        tr.appendChild(tdIdMesa);
    }
}

// -- - Tareas a realiazar-- -
// 1 - Capturar elementos para modificar.Listo
// 2 - Hacer eventos sobre ellos.Listo
//     -- - Funciones específicas-- -
//     1 - Al cargar la página, si no hay reservas disponibles, mostrarselo al usuario.Listo
// 2 - Botón Agregar: mostrar inputs para pedir DNI(validar), nombre y apellido.Con estos datos y los que obtengo de la mesa seleccionada, modificar los datos de la tabla.
// En caso de que le de OK a la reserva, mostrar cartel y hacer lo anterior, pero, si le da cancelar, comprimir menú de inputs, al igual que si toca nuevamente el botón
// en cuestión.Listo
// 3 - Botón Eliminar: solicitar DNI a través de input, si existe mostrar los registros para que pueda seleccionar cúal reserva eliminar, caso contrario, avisar que
// no tiene mesas a su nombre.Misma lógica que el anterior.Si apreta cancelar o el botón nuevamente, el menú se comprime.Listo
// 4 - Botón Buscar: Similar al eliminar, ya que se buscan las mesas según DNI, también, en caso de que estén mostrarla, y sino, avisar que no tiene mesas a su nombre.
// También funciona lo de OK y cancelar.Listo
// Aclaraciones: Todos los menú son desplegables y replegables.Al presionar un botón se desactivam los otros botones hasta no terminar el flujo con ese botón o volver
// para atrás.Además, en caso de que no haya mesas, se debe desactivar el botón de reservas y solo volverse a activar en caso de vuelva a haber o que el usuario libere
// para su uso.Listo
// IMPORTANTE!!la tabla principal debe ser dinámica, ya que el usuario debe poder reservar, eliminar, etc.y que la tabla se adapte a los cambios que hace el usuario.
// Agregado: el seteo dinámico de toda la tabla y el filtrado(otro feature), se dejará para más adelante por cuestiones de tiempo!Listo
// También de ver de hacer pop - ups en vez de desplegables y plegables.Esto me quedo pendiente!!
//     5 - Arreglar los radiobuttoms para selección individual.Esto también!