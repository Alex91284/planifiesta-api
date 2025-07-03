import { useState, useEffect } from 'react'
import { crearUsuario, obtenerUsuarios } from '../api/api'

export default function Usuarios() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [tipo, setTipo] = useState('invitado')
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    cargarUsuarios()
  }, [])

  async function cargarUsuarios() {
    try {
      const data = await obtenerUsuarios()
      setUsuarios(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function manejarSubmit(e) {
    e.preventDefault()
    try {
      await crearUsuario({ nombre, correo })
      setNombre('')
      setCorreo('')
      setTipo('invitado')
      cargarUsuarios()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>👤 Crear Usuario</h2>
      <form onSubmit={manejarSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="invitado">Invitado</option>
          <option value="anfitrion">Anfitrión</option>
        </select>
        <button type="submit">Registrar</button>
      </form>

      <h3>📋 Lista de usuarios</h3>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            #{u.id} - {u.nombre} ({u.correo})
          </li>
        ))}
      </ul>
    </div>
  )
}
