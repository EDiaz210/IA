// ===== Imports =====
import { useState, useRef, useEffect } from "react";
import { FiPlus, FiTrash2, FiSend } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { FaLaptop, FaBook, FaUniversity, FaUserGraduate, FaUserCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Perfil from "./Perfil";
import TextareaAutosize from 'react-textarea-autosize';
import Logo from '../../public/images/logo.png'
import axios from "axios";


const IA = () => {
 const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ===== Estados =====
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [perfilVisible, setPerfilVisible] = useState(false);
  const messagesEndRef = useRef(null);

  // ===== Restaurar chat seleccionado al cargar =====
  useEffect(() => {
    const savedChatId = localStorage.getItem("selectedChatId");
    if (savedChatId) setSelectedChatId(savedChatId);
  }, []);

  // ===== Cargar conversaciones y mensajes al inicio =====
  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/conversaciones`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const conversaciones = res.data.map((conv) => ({
          id: conv._id,
          title: conv.titulo,
          messages: conv.mensajes || [], // 🔹 cargamos mensajes ya guardados
          isSuggestion: false,
        }));

        setChats(conversaciones);
      } catch (error) {
        console.error("Error al cargar conversaciones:", error);
      }
    };

    fetchConversaciones();
  }, [token]);

  // ===== Crear nueva conversación =====
  const handleNewChat = async () => {
    try {
      if (!input.trim()) return;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/conversaciones/nuevo`,
        { primerMensaje: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { _id, titulo, mensajes } = res.data.conversacion;

      const newChat = {
        id: _id,
        title: titulo,
        messages: mensajes,
        isSuggestion: false,
      };

      setChats([newChat, ...chats]);
      setSelectedChatId(_id);
      localStorage.setItem("selectedChatId", _id); // Guardar en localStorage
      setInput("");
    } catch (error) {
      console.error("Error creando conversación:", error);
    }
  };

  // ===== Enviar mensaje a conversación existente =====
  const handleSendMessage = async () => {
    if (!input.trim() || !selectedChatId) return;

    try {
      // Llamada a backend para agregar el mensaje
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/conversaciones/${selectedChatId}/mensajes`,
        { rol: "Estudiante", contenido: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar el chat con los mensajes actualizados
      const updatedChat = res.data.conversacion;

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === updatedChat._id
            ? { ...chat, messages: updatedChat.mensajes }
            : chat
        )
      );

      setInput("");
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  // ===== Seleccionar un chat =====
  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    localStorage.setItem("selectedChatId", id); // Guardar selección
  };

// ===== Eliminar conversación =====
const handleDeleteChat = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/conversaciones/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    setChats(chats.filter((chat) => chat.id !== id));
    if (selectedChatId === id) {
      setSelectedChatId(null);
      setInput("");
    }
  } catch (error) {
    console.error("Error al eliminar conversación:", error);
  }
};
const [pendienteCorreccion, setPendienteCorreccion] = useState(null) // Guarda query pendiente de corregir
const [corregirId, setCorregirId] = useState(null)

const frasesCorreccion = [
  "esta mal",
  "está mal",
  "incorrecto",
  "no es correcto",
  "no es la respuesta",
  "respuesta incorrecta",
  "error",
  "no sirve",
  "mal",
  "falso",
]

const handleBuscar = async () => {
  if (!input.trim()) return;

  const textoUsuario = input.trim();
  let chatIdToUse = selectedChatId;
  let newChats = [...chats];

  // Si no hay chat seleccionado, crea uno nuevo
  if (!chatIdToUse) {
    chatIdToUse = Date.now();
    const newChat = {
      id: chatIdToUse,
      title: textoUsuario.slice(0, 30),
      messages: [],
      isSuggestion: false,
    };
    newChats.unshift(newChat);
    setSelectedChatId(chatIdToUse);
  }

  // Agrega el mensaje del usuario al chat
  newChats = newChats.map(chat =>
    chat.id === chatIdToUse
      ? {
          ...chat,
          messages: [...chat.messages, { id: Date.now(), text: textoUsuario, author: "user" }],
        }
      : chat
  );
  setChats(newChats);
  setInput("");

  // ------------- Detectar frases de corrección ----------------
  // Si NO estamos ya esperando una corrección y el usuario escribe frase para corregir
  if (!pendienteCorreccion) {
    const textoMinuscula = textoUsuario.toLowerCase();
    const quiereCorregir = frasesCorreccion.some(frase => textoMinuscula.includes(frase));
    if (quiereCorregir) {
      // Para activar corrección, necesitamos la última pregunta que hizo el usuario
      // La buscamos en el chat, mensaje user anterior (penúltimo user message)
      const mensajesUsuario = newChats.find(c => c.id === chatIdToUse)?.messages.filter(m => m.author === "user");
      const ultimaPreguntaUsuario = mensajesUsuario && mensajesUsuario.length > 1
        ? mensajesUsuario[mensajesUsuario.length - 2]?.text
        : textoUsuario;

      setPendienteCorreccion(ultimaPreguntaUsuario || textoUsuario);
      setCorregirId(null);

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === chatIdToUse
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now(),
                    text: "🤖 Por favor, escribe la respuesta correcta para que pueda aprender.",
                    author: "ia",
                  },
                ],
              }
            : chat
        )
      );

      return; // Salimos para esperar que el usuario escriba la corrección en el próximo input
    }
  }

  try {
    if (pendienteCorreccion) {
      // Enviamos la corrección al backend
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/buscar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: pendienteCorreccion,         // pregunta original
          respuesta_correcta: textoUsuario,   // respuesta que está corrigiendo el usuario
          corregir_id: corregirId             // opcional, si tienes id para trackear
        }),
      });

      const data = await res.json();

      // Mostrar mensaje de confirmación que aprendió la corrección
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === chatIdToUse
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now(),
                    text: data.message || "✅ Corrección aprendida correctamente.",
                    author: "ia",
                  },
                ],
              }
            : chat
        )
      );

      // Limpiar estados de corrección para que el siguiente input sea búsqueda normal
      setPendienteCorreccion(null);
      setCorregirId(null);
      return;
    }

    // Caso normal: consulta de búsqueda
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/buscar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: textoUsuario }),
    });

    const data = await res.json();
    console.log("DATA:", data);

    // Mostrar la respuesta del bot
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatIdToUse
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now(),
                  text: data.respuesta || "No tengo respuesta para esa consulta.",
                  author: "ia",
                },
              ],
            }
          : chat
      )
    );

    // Si el microservicio dice que necesita corrección, preparamos el estado para recibir la respuesta correcta del usuario
    if (data.necesita_respuesta) {
      // Guardamos la pregunta original para luego enviarla con la corrección
      setPendienteCorreccion(textoUsuario);
      setCorregirId(data.corregir_id || null);

      // Mostrar mensaje al usuario para que escriba la respuesta correcta
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === chatIdToUse
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now(),
                    text: "🤖 No tengo respuesta para esta pregunta. Por favor, escríbeme la respuesta correcta para aprender.",
                    author: "ia",
                  },
                ],
              }
            : chat
        )
      );

      setInput("");
    }
  } catch (error) {
    console.error("Error al buscar:", error);
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatIdToUse
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now(),
                  text: "⚠️ Error en el servidor. Intenta más tarde.",
                  author: "ia",
                },
              ],
            }
          : chat
      )
    );
  }
};



// ===== Tecla Enter =====
const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleBuscar();
  }
};

// ===== Chat activo =====
const currentChat = chats.find((chat) => chat.id === selectedChatId);
  
  
  // ===== Info de enlaces rápidos (sidebar derecho) =====
  const infoBlocks = [
    {
      icon: <FaBook />,
      title: "SAEW",
      url: "https://saew.epn.edu.ec",
    }, 

  ];

  const nombreEstudiante = "Gabriel Imbaquingo";
  const imagenPerfil = "https://i.pravatar.cc/150?u=gabriel.imbaquingo@example.com";

  // ===== Renderizado principal =====
  return (
    <div className="flex flex-col flex-1 h-screen font-sans bg-gray-50 text-gray-900">

      {/* ===== Header ===== */}
      <header className="bg-gray-950 text-white p-3 px-6 flex justify-between items-center shadow-md border-b-2 border-sky-700">
        <img src={Logo} style={{ width: "50px", height: "50px", padding: "1px"}} />
        <h1 className="text-lg font-bold truncate mx-4 flex-1 text-center sm:text-left">Jezt IA</h1>
        <nav className="hidden sm:block">
          <ul className="flex gap-6 text-sm font-medium">
            <li
              className="hover:text-blue-300 cursor-pointer"
              onClick={() => navigate("/servicios")}
            >
              Servicios
            </li>
            <li className="hover:text-blue-300 cursor-pointer"></li>
          </ul>
        </nav>
        <div className="ml-4 cursor-pointer hover:text-blue-300 transition-colors" title="Perfil">
          <button onClick={() => setPerfilVisible(true)}>
            <FaUserCircle className="text-2xl" />
          </button>
        </div>
      </header>

      {/* ===== Cuerpo Principal ===== */}
      <div className="flex flex-1 overflow-hidden">

        {/* ===== Sidebar Izquierdo: Conversaciones y Sugerencias ===== */}
        <aside className="w-64 bg-gray-950 border-r-2 border-sky-700 shadow-md p-4 flex flex-col">
          <button onClick={handleNewChat} className="flex items-center gap-2 p-2 mb-4 text-sm font-semibold text-gray-100 bg-gradient-to-r from-blue-900 via-sky-800 to-sky-700 rounded hover:scale-105 transition-transform">
            <FiPlus /> Nueva conversación
          </button>

          {/* Lista de conversaciones */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-600 scrollbar-track-gray-100">
            {chats.filter(chat => !chat.isSuggestion).map((chat) => (
            <div
            key={chat.id}
            className={`flex items-center justify-between gap-2 p-2 mb-2 text-sm rounded cursor-pointer transition-colors duration-200 text-gray-400
            ${selectedChatId === chat.id ? "bg-sky-600 text-white " : "hover:bg-sky-600"}`}
            onClick={() => handleSelectChat(chat.id)}
          >
            <div className="flex items-center gap-2 truncate">
            <BsChatDots className="text-gray-400 flex-shrink-0 hover:text-gray-600" />
            <span className="truncate">{chat.title}</span>
            </div>
            <button
            onClick={(e) => {
            e.stopPropagation();
            handleDeleteChat(chat.id);
            }}
            className="text-gray-400 hover:text-sky-700 transition-colors"
            >
              <FiTrash2 />
            </button>
          </div>
          ))}
          

        </div>
          <hr className="border-b-2 border-sky-700" />
        </aside>

        {/* ===== Main Chat (Mensajes) ===== */}
        <main className="bg-gray-950 flex-1 flex flex-col border-r border-sky-600 relative overflow-hidden">
          <div className="flex-1 flex flex-col">
            <section className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-00 scrollbar-track-gray-800 flex flex-col">
              {/* Imagen + Texto centrado */}
              <div className="flex flex-col items-center">
                <img
                src={Logo}
                alt="Logo"
                style={{ width: "125px", height: "125px", padding: "2px" }}
              />
              <h3 className="text-white mt-4">Hola, Yo soy Jezt IA.</h3>
              </div>
              {/* Mensaje si no hay chat activo */}
              {!currentChat && (
                <p className="text-center text-gray-50 mt-20 select-none">
                  Selecciona una conversación o crea una nueva para empezar a chatear.
                </p>
              )}
              {currentChat && currentChat.messages.length === 0 && (
                <p className="text-center text-gray-50 mt-20 select-none">
                  Hola! Quieres que te ayude ?
                </p>
              )}
              {currentChat && currentChat.messages.map((msg) => (
                <div key={msg.id} className={`max-w-[70%] w-fit mb-3 px-5 py-3 rounded-lg shadow-sm whitespace-pre-wrap break-words overflow-x-auto overflow-y-visible
                  ${msg.author === "user" ? "bg-sky-700 text-gray-200 self-end rounded-br-lg border border-gray-900 text-right" : "bg-blue-950 text-gray-200 self-start rounded-bl-lg border border-gray-950 text-left"} animate-slide-in`} style={{ animationDuration: "0.3s" }}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </section>


            {/* ===== Footer (Input + Botón Enviar) ===== */}
            <footer className="bg-gray-950 p-4 border-t border-sky-700 flex items-center gap-2">
              {pendienteCorreccion ? (
                <input
                type="text"
                placeholder="Escribe la respuesta correcta..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="bg-gray-950 border-sky-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all"
            />
            ) : (
            <TextareaAutosize
            minRows={1}
            maxRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Haz tu pregunta"
            className="bg-gray-950 flex-1 border-sky-700 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all text-gray-300"
            />
            )}

              <button onClick={() => {handleBuscar();handleSendMessage();}} className="p-2 bg-gray-950 hover:bg-sky-600 rounded-lg text-white transition-colors">
                <FiSend />
              </button>
            </footer>
            <h5 className="flex justify-center text-center text-sky-800">Jezt IA puede cometer errores. Considera verificar la información importante.</h5>
          </div>
        </main>

        {/* ===== Sidebar Derecho: Enlaces útiles ===== */}
        <aside className="w-96 p-5 overflow-auto bg-gray-950">
          <div className="grid grid-cols-1 gap- max-w-4xl mx-auto">
            {infoBlocks.map((block, index) => (
              <div key={index} className="bg-gray-950 p-4 rounded shadow-md hover:shadow-lg transition duration-300 max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-sky-600">{block.icon}</div>
                    <h2 className="text-lg font-semibold">
                      <a
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-700 hover:underline"
                      >
                        {block.title}
                      </a>
                    </h2>
                </div>
                <iframe src={block.url} className="w-full h-90 border rounded" title={block.title} />
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* ===== Perfil del usuario ===== */}
      <Perfil
        visible={perfilVisible}
        onClose={() => setPerfilVisible(false)}
        nombre={nombreEstudiante}
        imagenUrl={imagenPerfil}
      />

      {/* ===== Estilos personalizados (scrollbars y animaciones) ===== */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 9999px;
          border: 2px solid #f3f4f6;
        }
        @keyframes slide-in {
          0% {opacity: 0; transform: translateY(10px);}
          100% {opacity: 1; transform: translateY(0);}
        }
        .animate-slide-in {
          animation-name: slide-in;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default IA;
