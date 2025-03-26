const { publishToQueue } = require("../services/rabbitmq.service");

async function agregarLibro(req, res) {
    try {
        const { titulo, autor, descripcion } = req.body;

        if (!titulo || !autor || !descripcion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const mensaje = { accion: "agregar", titulo, autor, descripcion };
        await publishToQueue(mensaje);

        return res.json({ message: "📤 Libro agregado enviado a RabbitMQ", data: mensaje });
    } catch (error) {
        console.error("🚨 Error en agregarLibro:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

async function actualizarLibro(req, res) {
    try {
        const { titulo, nuevoAutor, nuevaDescripcion } = req.body;

        if (!titulo || !nuevoAutor || !nuevaDescripcion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const mensaje = { accion: "actualizar", titulo, nuevoAutor, nuevaDescripcion };
        await publishToQueue(mensaje);

        return res.json({ message: "📤 Actualización enviada a RabbitMQ", data: mensaje });
    } catch (error) {
        console.error("🚨 Error en actualizarLibro:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

async function eliminarLibro(req, res) {
    try {
        const { titulo } = req.body;

        if (!titulo) {
            return res.status(400).json({ error: "El título del libro es obligatorio" });
        }

        const mensaje = { accion: "eliminar", titulo };
        await publishToQueue(mensaje);

        return res.json({ message: "📤 Eliminación enviada a RabbitMQ", data: mensaje });
    } catch (error) {
        console.error("🚨 Error en eliminarLibro:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = { agregarLibro, actualizarLibro, eliminarLibro };
