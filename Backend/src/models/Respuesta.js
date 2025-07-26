import mongoose from 'mongoose'

const respuestaSchema = new mongoose.Schema({
    pregunta: { type: String, required: true },
    respuesta: { type: String, required: true }
}, { collection: 'buscar' }) 

const Respuesta = mongoose.model('Respuesta', respuestaSchema)

export default Respuesta
