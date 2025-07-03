import { useEffect, useState } from 'react'
import { obtenerEventos, crearEvento, obtenerUsuarios } from '../api/api'

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [anfitriones, setAnfitriones] = useState([])
  const [anfitrionId, setAnfitrionId] = useState('')

  useEffect(() => {
    async function cargarDatos() {
      try {
        const usuarios = await obtenerUsuarios()
        const anfitrionesFiltrados = usuarios.filter((u) => u.tipo_usuario === 'anfitrion')
        setAnfitriones(anfitrionesFiltrados)

        if (anfitrionesFiltrados.length > 0) {
          setAnfitrionId(anfitrionesFiltrados[0].id)
        }

        const eventos = await obtenerEventos()
        setEventos(eventos)
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }

    cargarDatos()
  }, [])

  async function manejarSubmit(e) {
    e.preventDefault()
    try {
      await crearEvento({ nombre, descripcion, anfitrion_id: parseInt(anfitrionId) })
      setNombre('')
      setDescripcion('')
      const eventosActualizados = await obtenerEventos()
      setEventos(eventosActualizados)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>📅 Crear nuevo evento</h2>
      <form onSubmit={manejarSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <select value={anfitrionId} onChange={(e) => setAnfitrionId(e.target.value)}>
          {anfitriones.map((anfitrion) => (
            <option key={anfitrion.id} value={anfitrion.id}>
              {anfitrion.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Crear</button>
      </form>

      <h3>📋 Lista de eventos</h3>
      <ul>
        {eventos.map((ev) => {
          const anfitrion = anfitriones.find((a) => Number(a.id) === Number(ev.anfitrion_id))
         
          return (
            <li key={ev.id}>
              <strong>{ev.nombre}</strong>: {ev.descripcion}{' '}
              {anfitrion ? (
                <span style={{ marginLeft: '0.5rem' }}>
                  👤 Anfitrión: <strong>{anfitrion.nombre}</strong>
                </span>
              ) : (
                <span style={{ color: 'red' }}>💔 Anfitrión no encontrado</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
