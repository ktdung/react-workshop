import { useState, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { Heading } from 'course-platform/Heading'
import { Loading } from 'course-platform/Loading'
import { Notice } from 'course-platform/Notice'
import { api } from 'course-platform/utils/api'
import type { User } from 'course-platform/utils/types'

type Props = {
  onSuccess(user: User): void
}

export const Login = ({ onSuccess }: Props) => {
  // const [showPassword, setShowPassword] = useState(false)
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, loading: true }
        case 'LOGIN_FAILED':
          return { ...state, loading: false, error: action.error }
        default:
          return state
      }
    },
    {
      loading: false,
      showPassword: false,
      error: null,
      username: '',
      password: '',
    }
  )

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    dispatch({ type: 'LOGIN' })

    api.auth
      .login(username, password)
      .then((user: User) => {
        onSuccess(user)
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_FAILED', error })
      })
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        <Notice>
          <div>
            Login with username <b>admin</b> and password <b>admin</b>
          </div>
        </Notice>
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div>
          <input
            className="form-field"
            aria-label="Username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <input
            className="form-field"
            aria-label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label className="vertical-middle horizontal-spacing">
            <input
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />
            <span>show password</span>
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <Loading />
            )}
          </button>
        </footer>
      </form>
    </div>
  )
}
