import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const buscarRespuesta = async (req, res) => {
  const { query, respuesta_correcta, corregir_id } = req.body

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Falta el parámetro de búsqueda' })
  }

  try {
    let responseData

    if (respuesta_correcta) {
      // Cuando el usuario corrige, enviamos a /corregir
      responseData = await axios.post(`${process.env.FASTAPI_URL}/corregir`, {
        pregunta: query,
        respuesta_correcta,
        metadata: { corregir_id: corregir_id || null }
      })
      // Retornamos el mensaje de confirmación del microservicio
      return res.json(responseData.data)
    } else {
      // Solo búsqueda normal en /buscar
      responseData = await axios.post(`${process.env.FASTAPI_URL}/buscar`, { query })
      const data = responseData.data

      // Aquí decides qué hacer si no hay respuesta
      // Por ejemplo, podrías añadir un campo necesita_respuesta si quieres
      if (!data.respuesta || data.respuesta === "No tengo respuesta para esa consulta.") {
        return res.json({ necesita_respuesta: true, mensaje: "🤖 No tengo respuesta. Por favor enséñame la respuesta correcta." })
      }

      // Retornamos la respuesta encontrada
      return res.json(data)
    }

  } catch (error) {
    console.error("Error en buscarRespuesta:", error.response?.data || error.message)
    return res.status(500).json({ error: 'Error en el servidor' })
  }
}

export { buscarRespuesta }




