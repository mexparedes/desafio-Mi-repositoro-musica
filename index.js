const http = require("http");
const { insertar, consultar, modificar, eliminar }  = require("./consultas");
const fs = require("fs");
const url = require("url")

http.createServer(async (req, res) => {


    if (req.url == "/" && req.method === "GET") {

        res.setHeader("content-type", "text/html");
        const html = fs.readFileSync("index.html", "utf8");
        res.end(html);
       // console.log(await getDate());
    }

    if ((req.url == "/cancion" && req.method == "POST")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body));
            //console.log(datos);
            try{
            const respuesta = await insertar(datos);
            res.end(JSON.stringify(respuesta));
            } catch (error){
                console.log(error.code);
                return error;
            }
        });
    }

    if ((req.url == "/canciones" && req.method == "GET")) {
        
        const resultado = await consultar();
        //console.log(resultado.rows);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(resultado.rows));
    }

    if ((req.url == "/cancion" && req.method == "PUT")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body));
            //console.log(datos);
            try{
            await modificar(datos);
            res.end();
            } catch (error){
                console.log(error.code);
                return error;
            }
        });
    }

    if (req.url.includes("/cancion?id=") && req.method == "DELETE") {
        
        const { id } = url.parse(req.url, true).query
        //console.log(id);
        await eliminar(id);
        res.end(); 
    }


})
.listen(3000 ,()=> console.log('Escuchando en el puerto 3000'));