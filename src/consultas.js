async function productosMasVendidos(db) {
    const resultado = await db.collection("ventas").aggregate([
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.nombre",
                cantidad_vendida: { $sum: "$items.cantidad" },
                total_recaudado: { $sum: "$items.subtotal" }
            }
        },
        {
            $project: {
                _id: 0,
                producto: "$_id",
                cantidad_vendida: 1,
                total_recaudado: 1
            }
        },
        { $sort: { cantidad_vendida: -1 } }
    ]).toArray();

    console.log("\n=== Productos más vendidos ===");
    console.table(resultado);
}

async function ventasPorCategoria(db) {
    const resultado = await db.collection("ventas").aggregate([
        {
            $match: {
                fecha: {
                    $gte: new Date("2026-06-01"),
                    $lt: new Date("2026-07-01")
                }
            }
        },
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.categoria",
                total_vendido: { $sum: "$items.subtotal" },
                cantidad_productos: { $sum: "$items.cantidad" }
            }
        },
        {
            $project: {
                _id: 0,
                categoria: "$_id",
                total_vendido: 1,
                cantidad_productos: 1
            }
        },
        { $sort: { total_vendido: -1 } }
    ]).toArray();

    console.log("\n=== Ventas por categoría ===");
    console.table(resultado);
}

async function clientesQueMasGastaron(db) {
    const resultado = await db.collection("ventas").aggregate([
        {
            $lookup: {
                from: "clientes",
                localField: "clienteId",
                foreignField: "_id",
                as: "cliente"
            }
        },
        { $unwind: "$cliente" },
        {
            $group: {
                _id: "$cliente.nombre",
                ciudad: { $first: "$cliente.ciudad" },
                cantidad_compras: { $sum: 1 },
                total_gastado: { $sum: "$total" }
            }
        },
        {
            $project: {
                _id: 0,
                cliente: "$_id",
                ciudad: 1,
                cantidad_compras: 1,
                total_gastado: 1
            }
        },
        { $sort: { total_gastado: -1 } }
    ]).toArray();

    console.log("\n=== Clientes que más gastaron ===");
    console.table(resultado);
}

module.exports = {
    productosMasVendidos,
    ventasPorCategoria,
    clientesQueMasGastaron
};