import jwt from "jsonwebtoken"
import Estudiante from "../models/Estudiantes.js"
import Administrador from "../models/Admin.js"


const crearTokenJWT = (id, rol) => {

    return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const verificarTokenJWT = async (req, res, next) => {

		const { authorization } = req.headers
		
    if (!authorization) return res.status(401).json({ msg: "Acceso denegado: token no proporcionado o inválido" })

    try {
        const token = authorization.split(" ")[1];
        const { id, rol } = jwt.verify(token,process.env.JWT_SECRET)
        console.log(id,rol)
        if (rol.toLowerCase() === "Estudiante") {

            req.estudianteBDD = await Estudiante.findById(id).lean().select("-password")
            next()
        }
        else{
            req.administradorBDD = await Administrador.findById(id).lean().select("-password")
            next()
        }
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
}


export { 
    crearTokenJWT,
    verificarTokenJWT 
}

