import React, { useState } from 'react'
import AuthService from '../services/AuthService'

export default function Login({ onLogin }) {
  // restore saved credentials if present
  let saved = null
  try { saved = JSON.parse(localStorage.getItem('petcare_credentials') || 'null') } catch (_) { saved = null }

  const [email, setEmail] = useState(saved?.email || '')
  const [password, setPassword] = useState(saved?.senha || '')
  const [remember, setRemember] = useState(!!saved)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Preencha email e senha')
      return
    }
    setLoading(true)
    try {
      const resp = await AuthService.login({ email, senha: password })
      localStorage.setItem('petcare_auth', JSON.stringify(resp))

      // save or remove credentials according to checkbox
      if (remember) {
        try { localStorage.setItem('petcare_credentials', JSON.stringify({ email, senha: password })) } catch (_) {}
      } else {
        localStorage.removeItem('petcare_credentials')
      }

      onLogin(resp)
    } catch (err) {
      let msg = 'Erro ao efetuar login'
      try { msg = err.message || JSON.stringify(err) } catch (_) {}
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Entrar no PetCare 🐾</h2>
        <form onSubmit={submit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
              placeholder="exemplo@email.com"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          <div style={{textAlign:'left'}}>
            <label style={{fontSize:13}}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />{' '}
              Lembrar minhas credenciais
            </label>
            <div style={{fontSize:11, color:'#666', marginTop:6}}>
              {remember ? (
                <span style={{color:'#a00'}}>Atenção: salvar senha no navegador não é seguro em dispositivos compartilhados.</span>
              ) : (
                <span>As credenciais não serão salvas.</span>
              )}
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    padding: '1rem',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '380px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s',
  },
  error: {
    background: '#ffe5e5',
    color: '#d00',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    background: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
}

styles.input[':focus'] = {
  border: '1px solid #4a90e2',
}
