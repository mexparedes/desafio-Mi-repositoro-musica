const { release } = require("os");
const { Pool } = require("pg"); 


const config = {   
    user: "postgres",
    host: "localhost",
    password: "admin",
    database: "repertorio",
    port: 5432,
    max: 20,
    min: 5,
    idleTimeoutMillis: 5000,
    connetionTimeoutMillis: 2000,
}


const pool = new Pool(config);

const insertar = async (datos) => {

    const consulta = {
        text: "INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3)",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        //console.log(result)
        return result;

    } catch (error) {

        console.log(error.code);
        return error;
    }
    release();
};

const consultar = async () => {

    const consulta =`select id, cancion, artista, tono from repertorio;`
    
    try {
        const result = await pool.query(consulta);
        //console.log(result)
        release();
        return result;

    } catch (error) {

        console.log(error.code);
        return error;
    }

    
};

const modificar = async (datos) => {
    console.log("ya en modificar");
    console.log(datos);
    const consulta = {
        text: "UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        //console.log(result)
        release();
        return result;

    } catch (error) {

        console.log(error.code);
        return error;
    }
    
};


const eliminar = async (id) => {

    const SQLQuery = {
        name: "eliminar-usuario",
        text: "DELETE FROM repertorio WHERE id = $1 RETURNING *",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        //console.log(result)
        release();
        return result;

    } catch (error) {

        console.log(error.code);
        return error;
    }
    
};  


module.exports = { insertar, consultar, modificar, eliminar }; 