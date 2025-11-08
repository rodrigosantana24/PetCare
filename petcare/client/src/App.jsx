import React, { useEffect, useState } from 'react'
import Login from './components/Login'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('petcare_auth')
    if (raw) {
      try { setUser(JSON.parse(raw)) } catch (_) { /* ignore */ }
    }
  }, [])

  const handleLogin = (authResp) => {
    setUser(authResp)
  }

  const handleLogout = () => {
    localStorage.removeItem('petcare_auth')
    setUser(null)
  }

  return (
    <div style={{fontFamily: 'sans-serif', padding: 20}}>
      <h1>PetCare</h1>

      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div style={{maxWidth:800}}>
          <h2>Área do usuário</h2>
          <p>Bem-vindo, <strong>{user.nome || user.email}</strong>!</p>
          <p>Tipo: {user.tipo || '—'}</p>
          <p style={{fontSize:13, color:'#666'}}>Token salvo em localStorage (chave <code>petcare_auth</code>).</p>
          <button onClick={handleLogout} style={{padding:'8px 12px'}}>Sair</button>
        </div>
      )}
    </div>
  )
}
