import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Eventos from './pages/Eventos'
import Usuarios from './pages/Usuarios'
import Invitaciones from './pages/Invitaciones'
import Aportes from './pages/Aportes'
import Presupuesto from './pages/Presupuesto'
import logo from './assets/logo1.png' 
import './App.css' 
export default function App() {
  return (
    <BrowserRouter>
      
      <header >
        <div className="content-title">
          <img src={logo} alt="Planifiesta Logo" style={{ width: '25%' }} />
          <h1 className='header-title'>Planifiesta 🎉</h1>
        </div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/invitaciones">Invitaciones</Link>
          <Link to="/aportes">Aportes</Link>
          <Link to="/presupuesto">Presupuesto</Link>
        </nav>
      </header>

      <main >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/invitaciones" element={<Invitaciones />} />
          <Route path="/aportes" element={<Aportes />} />
          <Route path="/presupuesto" element={<Presupuesto />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
