const BASE_URL = 'http://localhost:8000/api'

export async function obtenerEventos() {
  const res = await fetch(`${BASE_URL}/eventos`)
  if (!res.ok) throw new Error('Error al obtener eventos')
  return res.json()
}

export async function crearEvento(evento) {
  const res = await fetch(`${BASE_URL}/eventos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento),
  })
  if (!res.ok) throw new Error('Error al crear evento')
  return res.json()
}

export async function crearUsuario(usuario) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  })
  if (!res.ok) throw new Error('Error al crear usuario')
  return res.json()
}

export async function obtenerUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`)
  if (!res.ok) throw new Error('Error al obtener usuarios')
  return res.json()
}
