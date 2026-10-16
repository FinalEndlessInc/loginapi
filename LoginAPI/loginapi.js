const http = require("node:http");
const jwt = require("jsonwebtoken");
const puerto = 3000;

var usuario_nombre = "zurberus";
var usuario_contrasena = "francesco";
var usuario_frase = "Shakira Shakira, I never really knew that she could dance like that"

const llave_secreta_para_firmar_jwt = "OnjkmFESM623523PamongusMG8512kem";

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "*");

    const authHeader = request.headers['authorization'];

    switch(request.method){
        case "GET":
            if(!authHeader || authHeader == null || authHeader == undefined || authHeader == "undefined" || authHeader == "null"){
                response.statusCode = 401;
                response.getHeader("Content-Type", "application/json");
                response.end(JSON.stringify({
                    mensaje: "Token no proporcionado",
                }));
            }else{
                jwt.verify(authHeader, llave_secreta_para_firmar_jwt, (err, decoded) => {
                    if(err){
                        response.statusCode = 401;
                        response.getHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            mensaje: "Token invalido o expirado",
                        }));
                    }else{
                        response.statusCode = 200;
                        response.getHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            mensaje: "Acceso concedido",
                            usuario: decoded,
                            frase: usuario_frase
                        }));
                    }
                });
            }
        break;
        case "POST":
            request.on("data", info => {
                const objeto_login = JSON.parse(info);
                if(objeto_login.nombre == usuario_nombre && objeto_login.contrasena == usuario_contrasena){
                    
                    const token = jwt.sign({username: usuario_nombre}, llave_secreta_para_firmar_jwt, {expiresIn: "1h"});

                    response.statusCode = 200;
                    response.getHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({
                        mensaje: "login exitoso",
                        token_acceso: token
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
            request.on("data", info => {
                const objeto_nueva_frase = JSON.parse(info);
                console.log(objeto_nueva_frase);

                if(!authHeader || authHeader == null || authHeader == undefined || authHeader == "undefined" || authHeader == "null"){
                    response.statusCode = 401;
                    response.getHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({
                        mensaje: "Token no proporcionado",
                    }));
                }else{
                    jwt.verify(authHeader, llave_secreta_para_firmar_jwt, (err, decoded) => {
                        if(err){
                            response.statusCode = 401;
                            response.getHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({
                                mensaje: "Token invalido o expirado",
                            }));
                        }else{
                            usuario_frase = objeto_nueva_frase.frase;
                            response.statusCode = 200;
                            response.getHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({
                                mensaje: "La frase fue cambiada good",
                                frase: usuario_frase
                            }));
                        }
                    });
                }
            });
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