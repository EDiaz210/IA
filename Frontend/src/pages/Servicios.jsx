import React from "react";
import { FaArrowLeft, FaRobot, FaBookOpen, FaGraduationCap, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Servicios = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-blue-900 text-white p-3 px-6 flex justify-between items-center shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:text-blue-300 transition-colors"
          aria-label="Volver"
        >
          <FaArrowLeft />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <h1 className="text-lg font-bold truncate mx-4 flex-1 text-center sm:text-left">
          Jezt IA - Servicios
        </h1>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-xl rounded-xl">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 flex items-center gap-3">
            <FaRobot /> Servicios para estudiantes universitarios
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Jezt IA es tu asistente virtual basado en tecnología GPT diseñado especialmente para ayudar a estudiantes universitarios a resolver dudas académicas, aclarar procesos universitarios y mejorar su experiencia educativa. Nuestro chatbot es tu compañero confiable para superar retos académicos y aprovechar al máximo tu vida universitaria.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">¿Qué puede hacer Jezt IA por ti?</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-3">
              <FaBookOpen className="text-blue-600" />
              Responder preguntas sobre asignaturas, temas y contenidos académicos.
            </li>
            <li className="flex items-center gap-3">
              <FaGraduationCap className="text-blue-600" />
              Brindar información sobre procesos universitarios, inscripciones, horarios y requisitos.
            </li>
            <li className="flex items-center gap-3">
              <FaComments className="text-blue-600" />
              Sugerir consejos personalizados para mejorar hábitos de estudio y organización.
            </li>
            <li className="flex items-center gap-3">
              <FaRobot className="text-blue-600" />
              Proporcionar soporte emocional básico y motivación para enfrentar desafíos académicos.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">¿Cómo usar Jezt IA?</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
            <li>Accede a la sección de chat en la plataforma Jezt IA.</li>
            <li>Escribe tu pregunta o duda relacionada con la universidad o estudios.</li>
            <li>Recibe una respuesta clara, detallada y personalizada al instante.</li>
            <li>Si necesitas, solicita recomendaciones o ayuda adicional para tu situación.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Beneficios para ti</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li>Acceso rápido y sencillo a información confiable y actualizada.</li>
            <li>Mejora tu rendimiento académico con apoyo constante.</li>
            <li>Reduce la incertidumbre y ansiedad al resolver dudas.</li>
            <li>Personaliza tu experiencia educativa con recomendaciones adaptadas a ti.</li>
          </ul>
        </section>

        <section className="text-center">
          <button
            onClick={() => alert("¡Gracias por confiar en Jezt IA! Pronto tendrás acceso al chat.")}
            className="bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-800 transition"
          >
            Probar Jezt IA ahora
          </button>
        </section>
      </main>
    </div>
  );
};

export default Servicios;
