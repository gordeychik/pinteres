import { useState } from 'react'
import { Input } from '../../ui/Input/Input'
import { useAuth } from '../../auth/AuthContext'
import styles from './Login.module.scss'

interface IProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const Login: React.FC<IProps> = ({ onSuccess }) => {
  const { login, error: authError } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    if (!email || !password) return;
    e.preventDefault();
    login(email, password)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((token: any) => {
        if (token) {
          onSuccess();
        } else {
          setError('Something went wrong...');
        }
      })
      .catch(() => {
        setError('Something went wrong...');
      });
    setEmail('');
    setPassword('');
  }

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input__wrapper}>
          <Input className={styles.input} placeholder='E-mail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
        </div>
        <div className={styles.input__wrapper}>
          <Input className={styles.input} placeholder='Пароль' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
        </div>
        <button type='submit'>Enter</button>
        {error && <p className={styles.error}>{error}</p>}
        {authError && <p className={styles.error}>{authError}</p>}
      </form>
    </div>
  )
}