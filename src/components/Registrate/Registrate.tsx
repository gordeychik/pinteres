import { useState } from 'react'
import { Input } from '../../ui/Input/Input'
import styles from './Registrate.module.scss'
import { useAuth } from '../../auth/AuthContext'

interface IProps {
  onSuccess: () => void;
}

export const Registrate: React.FC<IProps> = ({ onSuccess }) => {
  const { register } = useAuth();

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    if (!name || !email || !password) return;
    e.preventDefault();
    register(name, email, password).then(() => {
      onSuccess();
    });
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className={styles.reg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input__wrapper}>
          <Input className={styles.input} placeholder='Имя' type='text' value={name} onChange={(e) => setName(e.target.value)} required={true} />
        </div>
        <div className={styles.input__wrapper}>
          <Input className={styles.input} placeholder='E-mail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
        </div>
        <div className={styles.input__wrapper}>
          <Input className={styles.input} placeholder='Пароль' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
        </div>
        <button type='submit' onClick={handleSubmit}>Create</button>
      </form>
    </div>
  )
}