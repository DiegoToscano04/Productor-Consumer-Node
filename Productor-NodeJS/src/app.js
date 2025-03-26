const express = require("express");
require("dotenv").config();
require("./config/db"); // Importa la conexión a PostgreSQL

const libroRoutes = require("./routes/libro.routes");

const app = express();

app.use(express.json());
app.use("/libros", libroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
