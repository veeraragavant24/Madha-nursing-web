import { useEffect, useState } from 'react'

interface Props {
  goToDashboard: () => void
  goHome: () => void
}

export default function AdminLogin({ goToDashboard, goHome }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
  const token = localStorage.getItem('adminToken')

  if (token) {
    goToDashboard()
  }
}, [goToDashboard])

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setError(null)

  if (!email || !password) {
    setError('Please enter your email and password.')
    return
  }

  setSubmitting(true)

  try {
    const response = await fetch(
      'http://localhost:5021/api/admin/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(
        data?.message || 'Invalid email or password.'
      )
      return
    }

    // Save authentication information
    localStorage.setItem('adminToken', data.token)

    if (data.admin) {
      localStorage.setItem(
        'adminUser',
        JSON.stringify(data.admin)
      )
    }

    // Go to admin dashboard
    goToDashboard()

  } catch (error) {
    console.error('Admin login error:', error)

    setError(
      'Unable to connect to the server. Please try again.'
    )
  } finally {
    setSubmitting(false)
  }
}

  return (
    <div className="admin-login-page">
      <style>{`
  .admin-login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(160deg, #071A36 0%, #0B2545 100%);
    position: relative;
    overflow: hidden;
  }

  .admin-login-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(circle at 50% 20%, rgba(24,198,200,.14) 0%, transparent 55%);
  }

  .admin-login-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 440px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.30);
    padding: 48px 44px;
  }

  .admin-login-logo {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    background: linear-gradient(135deg, #18C6C8 0%, #10A9AC 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #062B3A;
    margin-bottom: 22px;
  }

  .admin-login-title {
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 30px;
    line-height: 1.15;
    letter-spacing: -.01em;
    color: #0B2545;
    margin-bottom: 6px;
  }

  .admin-login-sub {
    font-family: var(--font-sans);
    font-size: 15px;
    color: #475569;
    margin-bottom: 30px;
  }

  .admin-login-field {
    margin-bottom: 18px;
  }

  .admin-login-label {
    display: block;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #0B2545;
    margin-bottom: 8px;
  }

  .admin-login-input {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid rgba(11,37,69,.16);
    border-radius: 12px;
    background: #F8FAFD;
    font-family: var(--font-sans);
    font-size: 16px;
    color: #0B2545;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }

  .admin-login-input:focus {
    border-color: #18C6C8;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(24,198,200,.18);
  }

  .admin-login-input::placeholder {
    color: #94A3B8;
  }

  .admin-login-error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 12px;
    background: #FEF2F2;
    border: 1px solid rgba(220,38,38,.18);
    color: #B91C1C;
    font-family: var(--font-sans);
    font-size: 14px;
    margin-bottom: 18px;
  }

  .admin-login-btn {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    background: linear-gradient(135deg, #18C6C8 0%, #10A9AC 100%);
    color: #062B3A;
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 16px;
    letter-spacing: .03em;
    box-shadow: 0 14px 30px rgba(24,198,200,.35);
    transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s;
    margin-top: 6px;
  }

  .admin-login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px rgba(24,198,200,.45);
  }

  .admin-login-btn:disabled {
    opacity: .7;
    cursor: not-allowed;
  }

  .admin-login-spinner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(6,43,58,.25);
    border-top-color: #062B3A;
    border-radius: 50%;
    animation: admin-login-rotate .7s linear infinite;
    vertical-align: -3px;
  }

  @keyframes admin-login-rotate {
    to { transform: rotate(360deg); }
  }

  .admin-login-back {
    display: block;
    width: 100%;
    margin-top: 20px;
    text-align: center;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 600;
    color: #64748B;
    transition: color .2s;
  }

  .admin-login-back:hover {
    color: #0B2545;
  }

  .admin-login-note {
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid rgba(11,37,69,.08);
    font-family: var(--font-sans);
    font-size: 12px;
    line-height: 1.6;
    color: #94A3B8;
    text-align: center;
  }

  @media (max-width: 480px) {
    .admin-login-card {
      padding: 36px 26px;
    }
  }
`}</style>

      <div className="admin-login-glow" />
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-logo" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
          </svg>
        </div>

        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-sub">Sign in to manage News &amp; Events</p>

       

        {error && (
          <div className="admin-login-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            {error}
          </div>
        )}

        <div className="admin-login-field">
          <label className="admin-login-label" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className="admin-login-input"
            type="email"
            autoComplete="email"
            placeholder="admin@madha.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        <div className="admin-login-field">
          <label className="admin-login-label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="admin-login-input"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        <button className="admin-login-btn" type="submit" disabled={submitting}>
          {submitting ? <span className="admin-login-spinner" /> : 'Login'}
        </button>

        <button className="admin-login-back" type="button" onClick={goHome}>
          ← Back to website
        </button>

        <p className="admin-login-note">
          Authorized administrators only. This area is protected and access is restricted.
        </p>
      </form>
    </div>
  )
}
