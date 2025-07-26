import React, { useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ConfiguracionIA = () => {
  const navigate = useNavigate();

  const [tema, setTema] = useState("auto");
  const [modelo, setModelo] = useState("estandar");
  const [nombreIA, setNombreIA] = useState("Asistente Educativo");
  const [modoAvanzado, setModoAvanzado] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ===== Header ===== */}
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
          Jezt IA - Configuración
        </h1>
      </header>

      {/* ===== Contenido principal ===== */}
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          ⚙️ Configuración del Asistente
        </h1>

        {/* Tema */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Tema</label>
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="auto">Automático (sistema)</option>
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>
        </div>

        {/* Modelo de IA */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">
            Estilo de IA
          </label>
          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="estandar">Estándar</option>
            <option value="creativo">Creativo</option>
            <option value="rapido">Rápido</option>
          </select>
        </div>

        {/* Nombre personalizado */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">
            Nombre personalizado del asistente
          </label>
          <input
            type="text"
            value={nombreIA}
            onChange={(e) => setNombreIA(e.target.value)}
            className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Guardar */}
        <div className="text-right">
          <button
            onClick={() => alert("Configuración guardada correctamente 🎉")}
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionIA;
