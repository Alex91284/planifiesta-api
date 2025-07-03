import { useState, useEffect } from 'react'
import {
  obtenerInvitaciones,
  obtenerUsuarios,
  obtenerEventos,
  crearInvitacion,  
  actualizarInvitacion,
} from '../api/api'

export default function Invitaciones() {
  const [eventoId, setEventoId] = useState('')
  const [usuarioId, setUsuarioId] = useState('')
  const [invitaciones, setInvitaciones] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      const [invits, usrs, evts] = await Promise.all([
        obtenerInvitaciones(),
        obtenerUsuarios(),
        obtenerEventos(),
      ])
      setInvitaciones(invits)
      setUsuarios(usrs.filter((u) => u.tipo_usuario === 'invitado'))
      setEventos(evts)
    } catch (err) {
      console.error('Error cargando datos:', err)
    }
  }

  async function manejarSubmit(e) {
    e.preventDefault()
    try {
      await crearInvitacion({
        usuario_id: parseInt(usuarioId),
        evento_id: parseInt(eventoId),
        estado: 'pendiente',
      })
      setUsuarioId('')
      setEventoId('')
      cargarDatos()
    } catch (err) {
      console.error('Error al crear invitación:', err)
    }
  }

  async function manejarCambioEstado(id, nuevoEstado) {
    try {
      await actualizarInvitacion(id, nuevoEstado)
      cargarDatos()
    } catch (err) {
      console.error('Error al actualizar invitación:', err)
    }
  }

  function obtenerNombreUsuario(id) {
    const usuario = usuarios.find((u) => u.id === id)
    return usuario ? usuario.nombre : `#${id}`
  }

  function obtenerNombreEvento(id) {
    const evento = eventos.find((e) => e.id === id)
    return evento ? evento.nombre : `#${id}`
  }

  return (
    <div>
      <h2>✉️ Crear invitación</h2>
      <form onSubmit={manejarSubmit} style={{ marginBottom: '2rem' }}>
        <select
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        >
          <option value="">Seleccionar invitado</option>
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

        <button type="submit">Invitar</button>
      </form>

      <h3>📋 Lista de invitaciones</h3>
      <ul>
        {invitaciones.map((inv) => (
          <li key={inv.id}>
            {obtenerNombreUsuario(inv.usuario_id)} fue invitado a{' '}
            <strong>{obtenerNombreEvento(inv.evento_id)}</strong> – Estado:{' '}
            <select
              value={inv.estado}
              onChange={(e) => manejarCambioEstado(inv.id, e.target.value)}
            >
              <option value="pendiente">pendiente</option>
              <option value="aceptada">aceptada</option>
              <option value="rechazada">rechazada</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  )
}
