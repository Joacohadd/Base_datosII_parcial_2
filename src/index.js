// const conectarDB = require("./db");

// async function main() {

//     const db = await conectarDB();

//     const colecciones = await db.listCollections().toArray();

//     console.log("Colecciones:");

//     console.log(colecciones);
// }

// main();

const conectarDB = require("./db");

const {
    productosMasVendidos,
    ventasPorCategoria,
    clientesQueMasGastaron
} = require("./consultas");

async function main() {
    const db = await conectarDB();

    await productosMasVendidos(db);
    await ventasPorCategoria(db);
    await clientesQueMasGastaron(db);

    process.exit();
}

main();