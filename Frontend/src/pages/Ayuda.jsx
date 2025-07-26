import React, { useState } from "react";
import { FaArrowLeft, FaQuestionCircle, FaBook, FaLifeRing, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const preguntasFrecuentes = [
  {
    pregunta: "¿Cómo inicio una nueva conversación con el asistente?",
    respuesta:
      "Puedes crear una nueva conversación desde el menú lateral izquierdo haciendo clic en 'Nueva conversación'. Así puedes consultar cualquier duda o pedir recomendaciones educativas.",
  },
  {
    pregunta: "¿Puedo personalizar el asistente IA?",
    respuesta:
      "Sí, en la sección de configuración puedes cambiar el nombre, el estilo y el tema del asistente para adaptarlo a tus preferencias y necesidades.",
  },
  {
    pregunta: "¿Qué modelos de IA están disponibles?",
    respuesta:
      "Disponemos de modelos estándar, creativo y rápido para distintas necesidades, desde respuestas rápidas hasta interacciones más elaboradas y detalladas.",
  },
  {
    pregunta: "¿Cómo recibo métricas de mi entrenamiento o progreso?",
    respuesta:
      "En la sección de métricas, el asistente te mostrará información detallada sobre tu avance, áreas fuertes y recomendaciones para mejorar.",
  },
  {
    pregunta: "¿Cómo contacto soporte o ayuda adicional?",
    respuesta:
      "Puedes usar la sección de contacto para enviar un correo electrónico o llamar directamente a nuestro equipo de soporte.",
  },
];

const Ayuda = () => {
  const navigate = useNavigate();
  const [accordionIndex, setAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setAccordionIndex(accordionIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ===== Header igual a ConfiguracionIA ===== */}
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
          Jezt IA - Centro de Ayuda
        </h1>
      </header>

      <div className="p-6 max-w-4xl mx-auto">

        {/* Introducción */}
        <section className="mb-8 mt-12">
          <p className="text-gray-700 max-w-xl">
            Bienvenido al centro de ayuda de Jezt IA. Aquí encontrarás respuestas a las preguntas más frecuentes, tutoriales y formas de contacto para brindarte soporte efectivo en tu experiencia educativa.
          </p>
        </section>

        {/* Secciones principales */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
            <FaQuestionCircle className="text-4xl text-blue-600 mb-3" />
            <h2 className="font-semibold text-lg mb-1">Preguntas frecuentes</h2>
            <p className="text-gray-600 text-sm">
              Resuelve tus dudas más comunes sobre el uso del asistente y la plataforma.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
            <FaBook className="text-4xl text-blue-600 mb-3" />
            <h2 className="font-semibold text-lg mb-1">Tutoriales y guías</h2>
            <p className="text-gray-600 text-sm">
              Aprende a sacar el máximo provecho de Jezt IA con guías paso a paso y tutoriales interactivos.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
            <FaEnvelope className="text-4xl text-blue-600 mb-3" />
            <h2 className="font-semibold text-lg mb-1">Contacto y soporte</h2>
            <p className="text-gray-600 text-sm">
              ¿Necesitas ayuda personalizada? Contáctanos vía email o teléfono.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Preguntas Frecuentes</h2>
          <div className="divide-y divide-gray-200">
            {preguntasFrecuentes.map(({ pregunta, respuesta }, i) => (
              <div key={i} className="py-4 cursor-pointer" onClick={() => toggleAccordion(i)}>
                <h3 className="flex justify-between items-center font-medium text-gray-800">
                  {pregunta}
                  <span className={`transform transition-transform duration-300 ${accordionIndex === i ? "rotate-180" : "rotate-0"}`}>
                    ▼
                  </span>
                </h3>
                {accordionIndex === i && (
                  <p className="mt-2 text-gray-600 leading-relaxed">{respuesta}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contacto rápido */}
        <section className="mt-12 bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-3xl text-blue-700" />
            <div>
              <h3 className="font-semibold text-lg">Teléfono</h3>
              <p className="text-gray-700">+593 962 122 064</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-3xl text-blue-700" />
            <div>
              <h3 className="font-semibold text-lg">Correo electrónico</h3>
              <p className="text-gray-700">JusElk@jeztia.edu.ec</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ayuda;
