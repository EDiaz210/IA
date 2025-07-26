import {Schema , model} from 'mongoose'
import bcrypt from 'bcryptjs'


const estudianteSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    token:{
        type:String,
        default:null,
    },
    rol:{
        type:String,
        default:"Estudiante",
    }
},{
    timestamps:true 
})


// Método para cifrar el password del estudiante
estudianteSchema.methods.encrypPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Método para verificar si el password ingresado es el mismo de la BDD
estudianteSchema.methods.matchPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Método para crear un token 
estudianteSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(32).slice(2)
    return tokenGenerado
}
export default model('Estudiante', estudianteSchema);