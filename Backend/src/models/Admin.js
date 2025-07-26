import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Esto agrega `createdAt` y `updatedAt`
});

// Método para encriptar contraseña
adminSchema.methods.encryptPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Método para comparar contraseña ingresada con la de la BD
adminSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export default model('Admin', adminSchema);
