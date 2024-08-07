import { useState } from 'react'
import { Input } from '../../ui/Input/Input'
import styles from './Login.module.scss'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../store/userSlice'

export const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = async () => {
        try {
            const response = await axios.post('https://040a09353dca8c9b.mokky.dev/auth', {
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
        if ( !email || !password) return;
        e.preventDefault();
        login();
        setEmail('');
        setPassword('');
    }

    

    return (
        <div className={styles.login}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input__wrapper}>
                    <Input placeholder='E-mail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                </div>
                <div className={styles.input__wrapper}>
                    <Input placeholder='Пароль' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                </div>
                <button type='submit' onClick={handleSubmit}>Войти</button>
            </form>
        </div>
    )
}