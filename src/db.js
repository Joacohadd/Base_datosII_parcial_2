require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function conectarDB() {
    try {
        await client.connect();
        console.log(" Conectado a MongoDB Atlas");

        const db = client.db("sistema_ventas");

        return db;
    }
    catch (error) {
        console.error(" Error de conexión");
        console.error(error);
    }
}

module.exports = conectarDB;