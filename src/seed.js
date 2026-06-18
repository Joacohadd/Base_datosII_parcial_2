const conectarDB = require("./db");

async function seed() {
    const db = await conectarDB();

    const productos = db.collection("productos");
    const clientes = db.collection("clientes");
    const ventas = db.collection("ventas");

    await productos.deleteMany({});
    await clientes.deleteMany({});
    await ventas.deleteMany({});

    const resultadoProductos = await productos.insertMany([
        { nombre: "Coca Cola 500ml", categoria: "Bebidas", precio: 1500, stock: 50 },
        { nombre: "Pepsi 500ml", categoria: "Bebidas", precio: 1400, stock: 40 },
        { nombre: "Agua Mineral 500ml", categoria: "Bebidas", precio: 1000, stock: 60 },
        { nombre: "Alfajor Triple", categoria: "Golosinas", precio: 1200, stock: 35 },
        { nombre: "Chocolate con Leche", categoria: "Golosinas", precio: 1800, stock: 25 },
        { nombre: "Papas Fritas", categoria: "Snacks", precio: 2200, stock: 30 },
        { nombre: "Maní Salado", categoria: "Snacks", precio: 1600, stock: 20 },
        { nombre: "Galletitas Dulces", categoria: "Alimentos", precio: 1900, stock: 45 },
        { nombre: "Yerba Mate 1kg", categoria: "Alimentos", precio: 4200, stock: 18 },
        { nombre: "Café Instantáneo", categoria: "Alimentos", precio: 3500, stock: 15 }
    ]);

    const idsProductos = Object.values(resultadoProductos.insertedIds);

    const resultadoClientes = await clientes.insertMany([
        { nombre: "Juan Pérez", telefono: "1122334455", ciudad: "Avellaneda" },
        { nombre: "Sofía Gómez", telefono: "1133445566", ciudad: "Lanús" },
        { nombre: "Carlos López", telefono: "1144556677", ciudad: "Quilmes" },
        { nombre: "Martina Díaz", telefono: "1155667788", ciudad: "CABA" },
        { nombre: "Lucas Fernández", telefono: "1166778899", ciudad: "Avellaneda" }
    ]);

    const idsClientes = Object.values(resultadoClientes.insertedIds);

    await ventas.insertMany([
        {
            clienteId: idsClientes[0],
            fecha: new Date("2026-06-01"),
            metodo_pago: "efectivo",
            items: [
                { productoId: idsProductos[0], nombre: "Coca Cola 500ml", categoria: "Bebidas", cantidad: 2, precio_unitario: 1500, subtotal: 3000 },
                { productoId: idsProductos[3], nombre: "Alfajor Triple", categoria: "Golosinas", cantidad: 1, precio_unitario: 1200, subtotal: 1200 }
            ],
            total: 4200
        },
        {
            clienteId: idsClientes[1],
            fecha: new Date("2026-06-02"),
            metodo_pago: "debito",
            items: [
                { productoId: idsProductos[5], nombre: "Papas Fritas", categoria: "Snacks", cantidad: 2, precio_unitario: 2200, subtotal: 4400 },
                { productoId: idsProductos[1], nombre: "Pepsi 500ml", categoria: "Bebidas", cantidad: 1, precio_unitario: 1400, subtotal: 1400 }
            ],
            total: 5800
        },
        {
            clienteId: idsClientes[2],
            fecha: new Date("2026-06-03"),
            metodo_pago: "mercado pago",
            items: [
                { productoId: idsProductos[8], nombre: "Yerba Mate 1kg", categoria: "Alimentos", cantidad: 1, precio_unitario: 4200, subtotal: 4200 },
                { productoId: idsProductos[9], nombre: "Café Instantáneo", categoria: "Alimentos", cantidad: 1, precio_unitario: 3500, subtotal: 3500 }
            ],
            total: 7700
        },
        {
            clienteId: idsClientes[3],
            fecha: new Date("2026-06-04"),
            metodo_pago: "efectivo",
            items: [
                { productoId: idsProductos[4], nombre: "Chocolate con Leche", categoria: "Golosinas", cantidad: 3, precio_unitario: 1800, subtotal: 5400 }
            ],
            total: 5400
        },
        {
            clienteId: idsClientes[4],
            fecha: new Date("2026-06-05"),
            metodo_pago: "credito",
            items: [
                { productoId: idsProductos[2], nombre: "Agua Mineral 500ml", categoria: "Bebidas", cantidad: 4, precio_unitario: 1000, subtotal: 4000 },
                { productoId: idsProductos[6], nombre: "Maní Salado", categoria: "Snacks", cantidad: 2, precio_unitario: 1600, subtotal: 3200 }
            ],
            total: 7200
        },
        {
            clienteId: idsClientes[0],
            fecha: new Date("2026-06-06"),
            metodo_pago: "mercado pago",
            items: [
                { productoId: idsProductos[7], nombre: "Galletitas Dulces", categoria: "Alimentos", cantidad: 2, precio_unitario: 1900, subtotal: 3800 },
                { productoId: idsProductos[0], nombre: "Coca Cola 500ml", categoria: "Bebidas", cantidad: 1, precio_unitario: 1500, subtotal: 1500 }
            ],
            total: 5300
        },
        {
            clienteId: idsClientes[1],
            fecha: new Date("2026-06-07"),
            metodo_pago: "efectivo",
            items: [
                { productoId: idsProductos[3], nombre: "Alfajor Triple", categoria: "Golosinas", cantidad: 4, precio_unitario: 1200, subtotal: 4800 }
            ],
            total: 4800
        }
    ]);

    console.log("Datos cargados correctamente");
    process.exit();
}

seed();