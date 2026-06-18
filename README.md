# Sistema de Ventas con MongoDB

## Descripción

Este proyecto fue desarrollado para el Parcial 2 de Bases de Datos II.

Se trata de un sistema de ventas simple que permite almacenar información de productos, clientes y ventas utilizando MongoDB como base de datos. El objetivo principal es aplicar conceptos de modelado NoSQL, relaciones entre colecciones y consultas mediante Aggregation Pipeline.

El sistema se conecta a una base de datos MongoDB Atlas y ejecuta distintas consultas para obtener estadísticas e información relevante sobre las ventas realizadas.

---

## Tecnologías utilizadas

- Node.js
- MongoDB Atlas
- MongoDB Driver para Node.js
- MongoDB Compass

---

## Estructura de la base de datos

La base de datos utilizada se llama:

```txt
sistema_ventas
```

Y está compuesta por las siguientes colecciones:

### productos

Almacena la información de los productos disponibles para la venta.

Ejemplo:

```json
{
  "nombre": "Coca Cola 500ml",
  "categoria": "Bebidas",
  "precio": 1500,
  "stock": 50
}
```

### clientes

Almacena la información de los clientes.

Ejemplo:

```json
{
  "nombre": "Juan Pérez",
  "telefono": "1122334455",
  "ciudad": "Avellaneda"
}
```

### ventas

Registra cada venta realizada.

Ejemplo:

```json
{
  "clienteId": "ObjectId",
  "fecha": "2026-06-01",
  "metodo_pago": "efectivo",
  "items": [
    {
      "productoId": "ObjectId",
      "nombre": "Coca Cola 500ml",
      "categoria": "Bebidas",
      "cantidad": 2,
      "precio_unitario": 1500,
      "subtotal": 3000
    }
  ],
  "total": 3000
}
```

---

## Decisiones de modelado

Para el desarrollo del proyecto se utilizó una combinación de embedding y referencing.

### Embedding

Los productos vendidos se almacenan dentro del campo `items` de cada venta.

Se eligió esta estrategia porque los artículos vendidos forman parte de la venta y normalmente se consultan junto con ella.

### Referencing

Se utilizaron referencias para relacionar:

- Ventas con Clientes (`clienteId`)
- Ventas con Productos (`productoId`)

Esta decisión permite evitar la duplicación innecesaria de información y facilita la reutilización de datos entre diferentes documentos.

---

## Aggregation Pipelines implementados

### 1. Productos más vendidos

Obtiene la cantidad total vendida y el total recaudado por cada producto.

Operadores utilizados:

- `$unwind`
- `$group`
- `$project`
- `$sort`

### 2. Ventas por categoría

Calcula el total vendido por categoría de producto.

Operadores utilizados:

- `$match`
- `$unwind`
- `$group`
- `$project`
- `$sort`

### 3. Clientes que más gastaron

Obtiene el total gastado y la cantidad de compras realizadas por cada cliente.

Operadores utilizados:

- `$lookup`
- `$unwind`
- `$group`
- `$project`
- `$sort`

---

## Instalación

Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` con la cadena de conexión de MongoDB Atlas:

```env
MONGODB_URI=tu_cadena_de_conexion
```

---

## Ejecución

Cargar datos de prueba:

```bash
node src/seed.js
```

Ejecutar las consultas:

```bash
node src/index.js
```

---

## Objetivo del proyecto

El objetivo de este trabajo fue aplicar los conceptos vistos durante la cursada relacionados con bases de datos NoSQL, modelado orientado a documentos y consultas avanzadas utilizando MongoDB.

Además, se buscó justificar las decisiones de diseño tomadas y comparar las ventajas de este enfoque frente a una solución basada en bases de datos relacionales.