const BASE_URL = 'http://localhost:8000/api'

export async function obtenerEventos() {
  const res = await fetch(`${BASE_URL}/eventos`)
  if (!res.ok) throw new Error('Error al obtener eventos')
  return await res.json()
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
  return await res.json()
}

export async function crearInvitacion(data) {
  const res = await fetch(`${BASE_URL}/invitaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear invitación')
  return await res.json()
}

export async function obtenerInvitaciones() {
  const res = await fetch(`${BASE_URL}/invitaciones`)
  if (!res.ok) throw new Error('Error al obtener invitaciones')
  return await res.json()
}

export async function actualizarInvitacion(id, nuevoEstado) {
  const res = await fetch(`${BASE_URL}/invitaciones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: nuevoEstado }),
  })
  if (!res.ok) throw new Error('No se pudo actualizar la invitación')
  return await res.json()
}

export async function crearAporte(datos) {
  const res = await fetch(`${BASE_URL}/aportes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('No se pudo registrar el aporte')
  return await res.json()
}

export async function obtenerAportes() {
  const res = await fetch(`${BASE_URL}/aportes`)
  if (!res.ok) throw new Error('No se pudieron obtener los aportes')
  return await res.json()
}

export async function obtenerPresupuesto(eventoId, dia) {
  const res = await fetch(
    `${BASE_URL}/presupuesto?evento_id=${eventoId}&dia=${dia}`,
  )
  if (!res.ok) throw new Error('No se pudo obtener el presupuesto')
  return await res.json()
}

