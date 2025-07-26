// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importar las rutas de estudiantes
import estudiantesRoutes from './routes/estudiantes_routes.js';
import chatRoutes from './routes/respuestas_routes.js'
import conversacionRoutes from './routes/conversaciones_routes.js';

// Inicializaciones
const app = express();
dotenv.config();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz simple para prueba
app.get('/', (req, res) => {
  res.send('Servidor ON');
});

// Usar rutas para estudiantes con prefijo /api
app.use('/api/estudiante', estudiantesRoutes);
app.use('/api', chatRoutes)
app.use("/api/conversaciones", conversacionRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Endpoint no encontrado');
});

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor escuchando en puerto ${app.get('port')}`);
});

// exportar la instancia 
export default app