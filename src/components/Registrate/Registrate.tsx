import { useState } from 'react'
import { Input } from '../../ui/Input/Input'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/userSlice'
import styles from './Registrate.module.scss'

export const Registrate = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const registration = async () => {
        try {
            const response = await axios.post('https://040a09353dca8c9b.mokky.dev/register', {
                name,
                email,
                password
            }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        if (!name || !email || !password) return;
        e.preventDefault();
        registration();
        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className={styles.reg}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input__wrapper}>
                    <Input placeholder='Имя' type='text' value={name} onChange={(e) => setName(e.target.value)} required={true} />
                </div>
                <div className={styles.input__wrapper}>
                    <Input placeholder='E-mail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                </div>
                <div className={styles.input__wrapper}>
                    <Input placeholder='Пароль' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                </div>
                <button type='submit' onClick={handleSubmit}>Зарегистрироваться</button>
            </form>
        </div>
    )
}