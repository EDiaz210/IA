import { crearTokenJWT } from "../middlewares/JWT.js"
import Estudiante from "../models/Estudiantes.js"

const login = async(req,res) => {
    //! -----> 1
    const {email,password}=req.body
    //! -----> 2
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Todos los campos son obligatorios"})

    const estudianteBDD = await Estudiante.findOne({email}).select("-status -__v -token -createdAt -updatedAt")

    if(!estudianteBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no existe"})

    const verificarPassword = await estudianteBDD.matchPassword(password)

    if (!verificarPassword) return res.status(401).json({msg:"Lo sentimos, el password es incorrecto"})

    //! -----> 3
    const{nombre,apellido,direccion,telefono,_id,rol}=estudianteBDD

    const token = crearTokenJWT(estudianteBDD._id,estudianteBDD.rol)

    //! -----> 4
    res.status(200).json({
        token,
        rol,
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
    })
}

export default login