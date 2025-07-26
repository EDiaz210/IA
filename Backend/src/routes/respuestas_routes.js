import express from 'express'
import { buscarRespuesta } from '../controllers/respuestasController.js'

const router = express.Router()

router.post('/buscar', buscarRespuesta)

export default router

