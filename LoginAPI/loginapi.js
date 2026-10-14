const http = require("node:http");
const puerto = 3000;

var usuario_nombre = "zurberus";
var usuario_contrasena = "francesco";
var usuario_frase = "Shakira Shakira, I never really knew that she could dance like that"

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    const authHeader = request.headers['authorization'];

    switch(request.method){
        case "GET":
            
        break;
        case "POST":
            request.on("data", info => {
                const objeto_login = JSON.parse(info);
                if(objeto_login.nombre == usuario_nombre && objeto_login.contrasena == usuario_contrasena){
                    response.statusCode = 200;
                    response.getHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({
                        mensaje: "login exitoso"
                    }));
                }else{
                    response.statusCode = 401;
                    response.getHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({
                        mensaje: "usuario o contraseña incorrecta"
                    }));
                }
            });
        break;
        case "PUT":
            
        break;
        case "OPTIONS":
            response.writeHead(204);
            response.end();
        break;
    }

    /*
    
    */
});

server.listen(puerto, () =>{
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});