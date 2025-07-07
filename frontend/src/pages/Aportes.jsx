import { useEffect, useState } from 'react'
import { obtenerUsuarios, obtenerEventos, crearAporte, obtenerAportes } from '../api/api'

export default function Aportes() {
  const [usuarios, setUsuarios] = useState([])
  const [eventos, setEventos] = useState([])
  const [aportes, setAportes] = useState([])

  const [usuarioId, setUsuarioId] = useState('')
  const [eventoId, setEventoId] = useState('')
  const [dia, setDia] = useState('')
  const [monto, setMonto] = useState('')

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      const [usrs, evts, aps] = await Promise.all([
        obtenerUsuarios(),
        obtenerEventos(),
        obtenerAportes(),
      ])
      setUsuarios(usrs)
      setEventos(evts)
      setAportes(aps)

    } catch (error) {
      console.error(error)
    }
  }

  async function manejarSubmit(e) {
    e.preventDefault()
    try {
      await crearAporte({
        usuario_id: parseInt(usuarioId),
        evento_id: parseInt(eventoId),
        dia: parseInt(dia),
        monto: parseInt(monto),
      })
      setUsuarioId('')
      setEventoId('')
      setDia('')
      setMonto('')
      cargarDatos()
    } catch (error) {
      console.error('Error al crear aporte:', error)
    }
  }

  function obtenerNombreUsuario(id) {
    if (!id) return 'Usuario Desconocido'
    const usuario = usuarios.find((u) => u.id === Number(id))
   
    return usuario ? usuario.nombre : `#${id}`
  }

  function obtenerNombreEvento(id) {
    const evento = eventos.find((e) => e.id === Number(id))
    return evento ? evento.nombre : `#${id}`
  }

  return (
    <div className="container">
      <h2>💰 Registrar Aporte</h2>
      <form onSubmit={manejarSubmit}>
        <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
          <option value="">Seleccionar usuario</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>

        <select value={eventoId} onChange={(e) => setEventoId(e.target.value)}>
          <option value="">Seleccionar evento</option>
          {eventos.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Día (1-60)"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />

        <input
          type="number"
          placeholder="Monto (COP)"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <button type="submit">Guardar</button>
      </form>

      <h3>📋 Lista de Aportes</h3>
      <ul>
      {aportes.map((a) => {
        return (
          <li key={a.id}>
            💵 {obtenerNombreUsuario(a.usuario_id)} aportó <strong>${a.monto.toLocaleString()}</strong>{' '}
            para <strong>{obtenerNombreEvento(a.evento_id)}</strong> en el día {a.dia}
          </li>
        )
      })}
      </ul>
    </div>
  )
}
