import express from 'express'
import {obtenerConversaciones, crearConversacion, eliminarConversacion, agregarMensaje} from "../controllers/conversacionesController.js";
import { verificarTokenJWT } from "../middlewares/JWT.js";

const router = express.Router()

router.get("/",verificarTokenJWT, obtenerConversaciones);
router.post("/nuevo",verificarTokenJWT, crearConversacion);
router.delete("/:id",verificarTokenJWT, eliminarConversacion);
router.post("/:id/mensajes", verificarTokenJWT, agregarMensaje);

export default router