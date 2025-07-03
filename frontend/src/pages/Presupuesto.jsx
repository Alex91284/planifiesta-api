import { useEffect, useState } from 'react'
import { obtenerEventos, obtenerPresupuesto } from '../api/api'

export default function Presupuesto() {
  const [eventos, setEventos] = useState([])
  const [eventoId, setEventoId] = useState('')
  const [dia, setDia] = useState('')
  const [presupuesto, setPresupuesto] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarEventos() {
      try {
        const evts = await obtenerEventos()
        setEventos(evts)
        if (evts.length > 0) setEventoId(evts[0].id)
      } catch (err) {
        console.error('Error al cargar eventos:', err)
        setError('Error al cargar eventos')
      }
    }

    cargarEventos()
  }, [])

  async function manejarSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const resultado = await obtenerPresupuesto(eventoId, dia)
      setPresupuesto(resultado.total)
    } catch (err) {
      console.error('Error al obtener presupuesto:', err)
      setError('No se pudo obtener el presupuesto')
    }
  }

  return (
    <div>
      <h2>📊 Ver Presupuesto Acumulado</h2>

      <form onSubmit={manejarSubmit} style={{ marginBottom: '2rem' }}>
        <select value={eventoId} onChange={(e) => setEventoId(e.target.value)}>
          {eventos.map((ev) => (
            <option key={ev.id} value={ev.id}>{ev.nombre}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Día (1-60)"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />

        <button type="submit">Consultar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {presupuesto !== null && (
        <p>
          💰 Total aportado hasta el día {dia}: <strong>${presupuesto.toLocaleString()} COP</strong>
        </p>
      )}
    </div>
  )
}
