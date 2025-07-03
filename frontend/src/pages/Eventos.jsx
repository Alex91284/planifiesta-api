import { useEffect, useState } from 'react'
import { obtenerEventos, crearEvento } from '../api/api'

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [anfitrionId, setAnfitrionId] = useState('')

  useEffect(() => {
    cargarEventos()
  }, [])

  async function cargarEventos() {
    try {
      const data = await obtenerEventos()
      setEventos(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function manejarSubmit(e) {
    e.preventDefault()
    try {
      await crearEvento({ nombre, descripcion, anfitrion_id: parseInt(anfitrionId) })
      setNombre('')
      setDescripcion('')
      setAnfitrionId('')
      cargarEventos()
    } catch (err) {
      console.error(err)
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
        <input
          type="number"
          placeholder="ID Anfitrión"
          value={anfitrionId}
          onChange={(e) => setAnfitrionId(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>

      <h3>📋 Lista de eventos</h3>
      <ul>
        {eventos.map((ev) => (
          <li key={ev.id}>
            <strong>{ev.nombre}</strong>: {ev.descripcion}
          </li>
        ))}
      </ul>
    </div>
  )
}
