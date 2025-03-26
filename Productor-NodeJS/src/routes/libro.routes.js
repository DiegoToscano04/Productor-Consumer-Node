const express = require("express");
const { agregarLibro, actualizarLibro, eliminarLibro } = require("../controllers/libro.controller");

const router = express.Router();

router.post("/agregar", agregarLibro);
router.post("/actualizar", actualizarLibro);
router.post("/eliminar", eliminarLibro);

module.exports = router;
