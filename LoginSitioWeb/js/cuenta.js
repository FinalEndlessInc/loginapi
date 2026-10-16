const input_frase = document.querySelector("input");
const SaludoUsuario = document.querySelector("#SaludoUsuario");

const url_endpoint = "http://localhost:3000";

fetch(url_endpoint + "/obtener_info", {
    method: "GET",
    headers: {
        Authorization: localStorage.getItem("token_sesion")
    }
}).then(recurso => {
    if(recurso.status == 200){
        recurso.json().then(respuesta => {
            console.log(respuesta);
            SaludoUsuario.innerHTML = "Hola " + respuesta.usuario.username + "<br>";
            input_frase.value = respuesta.frase;
        });
    }else{
        recurso.json().then(respuesta => {
            alert(respuesta.mensaje);
            window.location.href = "error.html";
        });
    }
});

function CambiarFrase(){
    const objeto_frase_nueva = {
        frase: input_frase.value
    }
    fetch(url_endpoint + "/cambiar_frase", {
        method: "PUT",
        body: JSON.stringify(objeto_frase_nueva),
        headers: {
            Authorization: localStorage.getItem("token_sesion")
        }
    }).then(recurso => {
        if(recurso.status == 200){
            recurso.json().then(respuesta => {
                alert(respuesta.mensaje);
                input_frase.value = respuesta.frase;
            });
        }else{
            recurso.json().then(respuesta => {
                alert(respuesta.mensaje);
                window.location.href = "cuenta.html";
            });
        }
    });
}

function CerrarSesion(){
    localStorage.removeItem("token_sesion");
    window.location.href = "index.html";
}