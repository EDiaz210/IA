import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import IA from './pages/IA'
import Correos from './pages/Correos'
import Configuracion from './pages/Configuracion'
import Ayuda from './pages/Ayuda'
import Servicios from './pages/Servicios'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/IA" element = {<IA/>} />
        <Route path="/Correos" element = {<Correos/>}/>
        <Route path="/Configuracion" element = {<Configuracion/>}/>
        <Route path="/Ayuda" element = {<Ayuda/>}/>
        <Route path="/Servicios" element = {<Servicios/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
