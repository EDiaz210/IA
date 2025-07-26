import Conversacion from "../models/Conversaciones.js";

const obtenerConversaciones = async (req, res) => {
  try {
    const usuario = req.estudianteBDD?._id || req.administradorBDD?._id;
    const conversaciones = await Conversacion.find({ usuario }).lean();
    res.json(conversaciones);
  } catch (error) {
    console.error("Error al obtener conversaciones:", error);
    res.status(500).json({ msg: "Error al obtener conversaciones" });
  }
};

const crearConversacion = async (req, res) => {
  try {
    const usuario = req.estudianteBDD?._id || req.administradorBDD?._id;
    const { primerMensaje } = req.body;
    const titulo = primerMensaje.slice(0, 30);

    const conversacion = new Conversacion({
      usuario,
      titulo,
      mensajes: [{ rol: "Estudiante", contenido: primerMensaje }],
    });

    await conversacion.save();
    res.json({ conversacion });
  } catch (error) {
    console.error("Error al crear conversación:", error);
    res.status(500).json({ msg: "Error al crear conversación" });
  }
};

const eliminarConversacion = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.estudianteBDD?._id || req.administradorBDD?._id;

    const conversacion = await Conversacion.findOneAndDelete({
      _id: id,
      usuario,
    });

    if (!conversacion) {
      return res.status(404).json({ msg: "Conversación no encontrada" });
    }

    res.json({ msg: "Conversación eliminada" });
  } catch (error) {
    console.error("Error al eliminar conversación:", error);
    res.status(500).json({ msg: "Error al eliminar conversación" });
  }
};


const agregarMensaje = async (req, res) => {
  try {
    const usuario = req.estudianteBDD?._id || req.administradorBDD?._id;
    const { id } = req.params; // id de la conversación
    const { rol, contenido } = req.body;

    const conversacion = await Conversacion.findOne({ _id: id, usuario });

    if (!conversacion) {
      return res.status(404).json({ msg: "Conversación no encontrada" });
    }

    conversacion.mensajes.push({ rol, contenido });
    await conversacion.save();

    res.json({ conversacion });
  } catch (error) {
    console.error("Error al agregar mensaje:", error);
    res.status(500).json({ msg: "Error al agregar mensaje" });
  }
};

export {
  obtenerConversaciones,
  crearConversacion,
  eliminarConversacion,
  agregarMensaje,
};




