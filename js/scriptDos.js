//DOM
let inputDNI = document.getElementById("inputDNI");
let inputPassword = document.getElementById("inputPassword");
let btnLogin = document.getElementById("btnLogin");

//LS
let usuarioLS = localStorage.getItem("usuario");

//Evento OnLoad
window.addEventListener("load", function() {
    if (usuarioLS != null) {
        usuarioLS = JSON.parse(usuarioLS);
        inputDNI.value = usuarioLS.dni;
        inputPassword.value = usuarioLS.password;
        inputDNI.disabled = true;
        inputPassword.disabled = true;
        setTimeout(() => {
            window.location.href = "mesas.html";
        }, 5000);
    }
});

//Validación Input
inputDNI.addEventListener("keypress", (e) => {
    e.preventDefault();
    if (e.charCode < 48 || e.charCode > 57) {
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

//Login
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputDNI.value == "" || inputPassword.value == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Tiene que ingresar todos los campos!!!'
        });
    } else {
        traerDatosJSON();
    }
});

//Función para traer datos del JSON
function traerDatosJSON() {
    fetch("usuarios.json")
        .then((res) => res.json())
        .then((data) => {
            let usuario = data.find((usuario) => {
                return usuario.dni == inputDNI.value && usuario.password == inputPassword.value;
            });
            if (usuario != null) {
                agregarAlLocalStorage();
                window.location.href = "mesas.html";
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'El usuario ingresado no existe!!!'
                });
            }
        }).catch(() => {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Hubo un problema al traer los datos. Pruebe nuevamente más tarde!!!'
            });
        });
}

//LocalStorage
function agregarAlLocalStorage() {
    let usuario = {
        dni: inputDNI.value,
        password: inputPassword.value
    };
    localStorage.setItem("usuario", JSON.stringify(usuario));
}