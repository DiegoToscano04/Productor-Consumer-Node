const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => console.log("✅ Conectado a la base de datos PostgreSQL (barbosa)"))
    .catch((err) => console.error("❌ Error conectando a PostgreSQL:", err));

module.exports = pool;
