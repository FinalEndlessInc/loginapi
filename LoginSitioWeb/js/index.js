const input_nombre = document.querySelector("#input_nombre");
const input_contrasena = document.querySelector("#input_contrasena");

const url_endpoint = "http://localhost:3000";

function HacerLogin(){
    const objeto_login = {
        nombre: input_nombre.value,
        contrasena: input_contrasena.value
    }
    fetch(url_endpoint + "/login", {
        method: "POST",
        body: JSON.stringify(objeto_login)
    }).then(recurso => {
        if(recurso.status == 200){
            recurso.json().then(respuesta => {
                window.location.href = "cuenta.html";
            });
        }
        else{
            recurso.json().then(respuesta => {
                alert(respuesta.mensaje);
            });
        }
    });
}