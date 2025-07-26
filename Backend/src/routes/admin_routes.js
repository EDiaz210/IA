import express from 'express'
const router = express.Router()

// Ruta GET para listar administradores
router.get('/', (req, res) => {
    res.json({ message: 'Lista de administradores' })
})

// Ruta POST para crear un administrador
router.post('/', (req, res) => {
    const nuevoAdmin = req.body
    res.json({ message: 'Administrador creado', admin: nuevoAdmin })
})

export default router
