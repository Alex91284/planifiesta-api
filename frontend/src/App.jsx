import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Eventos from './pages/Eventos'
import Usuarios from './pages/Usuarios'
import Invitaciones from './pages/Invitaciones'
import Aportes from './pages/Aportes'
import Presupuesto from './pages/Presupuesto'
import './App.css' 
export default function App() {
  return (
    <BrowserRouter>
      <header style={{ margin:'auto', padding: '1rem', background: '#eee' }}>
        <h1 style={{color:'#323332'}}>Planifiesta 🎉</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Inicio</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/invitaciones">Invitaciones</Link>
          <Link to="/aportes">Aportes</Link>
          <Link to="/presupuesto">Presupuesto</Link>
        </nav>
      </header>

      <main style={{ padding: '1rem' }}>
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
