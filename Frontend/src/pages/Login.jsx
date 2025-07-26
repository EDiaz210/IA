import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';
import { FaFacebook, FaSquareInstagram, FaXTwitter } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { fetchDataBackend } = useFetch();
  const { setToken, setRol } = storeAuth();

  const loginUser = async(data) => {
        const url = data.password.includes("")
            ? `${import.meta.env.VITE_BACKEND_URL}/estudiante/login`
            : `${import.meta.env.VITE_BACKEND_URL}/login`
        const response = await fetchDataBackend(url, data,'POST', null)
        setToken(response.token)
        setRol(response.rol)
        if (data.rol === "Estudiante") {
            navigate('/ia');
        } else if (data.rol === "Administrador") {
            navigate('/correos');
        } else {
            navigate('/dashboard');
        }
    }

  return (
    <>
      {/* Header */}
      <header className="bg-blue-900 text-white p-3 px-6 flex justify-between items-center">
        <h1 className="text-lg font-bold">Jezt IA</h1>
        <nav>
          <ul className="flex gap-5 text-sm font-medium">
            <li className="hover:text-blue-300 cursor-pointer">Contacto</li>
          </ul>
        </nav>
      </header>

      {/* Main */}
      <div className="flex flex-col sm:flex-row min-h-[calc(100vh-10rem)]">
        <ToastContainer />

        {/* Izquierda: fondo imagen form.jpg SIN filtro y formulario */}
        <div className="relative w-full sm:w-1/2 h-screen flex justify-center items-center">
          {/* Imagen fondo form.jpg SIN filtro */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/public/images/form.jpg')" }}
          />

          {/* Formulario con fondo semi-transparente y blur */}
          <div className="relative w-4/5 max-w-md border border-gray-300 rounded-xl shadow-md p-8 bg-white/90 backdrop-blur-sm space-y-6 z-10">
            <h1 className="text-3xl font-semibold text-center uppercase text-gray-600">Inicia Sesión</h1>
            <small className="block text-gray-500 text-sm text-center">Por favor ingresa tus datos</small>

            <form onSubmit={handleSubmit(loginUser)} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo"
                  className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-600 px-3 py-2 text-gray-700"
                  {...register("email", { required: "El correo es obligatorio" })}
                />
                {errors.email && <p className="text-red-800 text-sm">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold">Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********************"
                  className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-600 px-3 py-2 text-gray-700 pr-10"
                  {...register("password", { required: "La contraseña es obligatoria" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M13.875 18.825A9.956 9.956 0 0112 19c-4.418 0-8.165-2.928-9.53-7a10.005 10.005 0 0119.06 0 9.956 9.956 0 01-1.845 3.35M9.9 14.32a3 3 0 114.2-4.2m.5 3.5l3.8 3.8m-3.8-3.8L5.5 5.5" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.95 0a9.96 9.96 0 0119.9 0M3 3l18 18" />
                    </svg>
                  )}
                </button>
                {errors.password && <p className="text-red-800 text-sm">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold">Selecciona tu rol</label>
                <select
                  className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-600 px-3 py-2 text-gray-700"
                  {...register("rol", { required: "Selecciona un rol" })}
                >
                  <option value="">-- Selecciona una opción --</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Estudiante">Estudiante</option>
                </select>
                {errors.rol && <p className="text-red-800 text-sm">{errors.rol.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 text-white py-2 rounded-xl font-semibold shadow
                    bg-gradient-to-r from-blue-900 via-purple-800 to-rose-700
                    hover:from-blue-800 hover:to-rose-800
                    transition-transform hover:scale-105"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>

            <div className="text-center mt-3">
              <Link to="/" className="text-gray-400 text-sm underline hover:text-gray-900">Regresar</Link>
            </div>
          </div>
        </div>

        {/* Derecha: imagen est-epn.jpeg con filtro oscuro */}
        <div className="hidden sm:block w-full sm:w-1/2 h-screen relative">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/public/images/est-epn.jpeg')" }}
          />
          {/* Overlay oscuro para contraste */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-blue-700 to-red-700 opacity-60 mix-blend-multiply z-10" />
          {/* Texto con sombra para mejorar lectura */}
          <div className="absolute z-20 inset-0 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Impulsa tu futuro desde la EPN
            </h2>
            <p className="mt-3 text-white text-sm md:text-base max-w-md drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Innovación, conocimiento y excelencia para transformar el mundo
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center p-4">
        <p className="text-sm font-semibold">Gabriel Imbaquingo | Proyecto Final</p>
        <div className="flex justify-center gap-4 mt-2 text-xl">
          <FaFacebook className="hover:text-blue-500 cursor-pointer" />
          <FaSquareInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaXTwitter className="hover:text-gray-300 cursor-pointer" />
        </div>
        <p className="text-xs text-gray-300 mt-2">© 2025 Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default Login;
