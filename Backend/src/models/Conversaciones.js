import mongoose from "mongoose";
const { Schema, model } = mongoose;

const mensajeSchema = new Schema({
  rol: {
    type: String,
    default: "Estudiante",
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const conversacionSchema = new Schema({
  usuario: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Estudiantes'
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  mensajes: [mensajeSchema]
}, {
  timestamps: true 
});

export default model("Conversacion", conversacionSchema);
