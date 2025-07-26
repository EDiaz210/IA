import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importar hook

const Perfil = ({ visible, onClose, nombre, imagenUrl }) => {
  const navigate = useNavigate(); // 👈 Inicializar

  if (!visible) return null;

  return (
    <>
      {/* Fondo borroso */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-label="Cerrar perfil"
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        aria-modal="true"
        role="dialog"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Imagen */}
          <div className="flex justify-center mb-4">
            <img
              src={imagenUrl}
              alt={`${nombre} - foto de perfil`}
              className="rounded-full w-24 h-24 object-cover border-2 border-blue-900"
            />
          </div>

          {/* Nombre */}
          <h2 className="text-center text-xl font-semibold mb-6 text-blue-900">
            {nombre}
          </h2>

          {/* Opciones */}
          <div className="flex flex-col gap-4 text-blue-900">
            <button
              onClick={() => {
                onClose();
                navigate("/configuracion"); // ✅ ahora sí funciona
              }}
              className="text-left hover:bg-blue-100 rounded px-3 py-2 transition"
            >
              Configuración
            </button>

            <button
              onClick={() => {
                onClose();
                navigate("/ayuda"); // ✅ Navega a ayuda
              }}
              className="text-left hover:bg-blue-100 rounded px-3 py-2 transition"
            >
              Ayuda
            </button>
            <button
              onClick={() => alert("Cerrando sesión")}
              className="text-left hover:bg-red-100 text-red-600 rounded px-3 py-2 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
