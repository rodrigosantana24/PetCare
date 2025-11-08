const BASE = 'http://localhost:8080'

async function request(path, body) {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    let text = await res.text()
    try { text = JSON.parse(text) } catch (_) {}
    throw new Error(text && text.message ? text.message : (text || res.statusText))
  }
  return res.json()
}

export default {
  login: (payload) => request('/api/auth/login', payload),
  register: (payload) => request('/api/auth/register', payload),
}
