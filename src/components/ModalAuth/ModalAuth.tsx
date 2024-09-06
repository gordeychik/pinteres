import { useState } from 'react'
import styles from './ModalAuth.module.scss'
import { Login } from '../Login/Login';
import { Registrate } from '../Registrate/Registrate';
import { CircleX } from 'lucide-react';

interface IProps {
    onClose: () => void;
}

export const ModalAuth: React.FC<IProps> = ({ onClose }) => {

    const [activeTab, setActiveTab] = useState<string>('signin');

    const handleLogin = () => {
        setActiveTab('login')
    }

    const handleSignin = () => {
        setActiveTab('signin')
    }

    return (
        <div className={styles.modal__overlay}>
            <div className={styles.modal__wrapper}>
                <ul className={styles.tabs}>
                    <li><button onClick={handleLogin} className={activeTab === 'login' ? styles.active : ''}>Log In</button></li>
                    <li><button onClick={handleSignin} className={activeTab === 'signin' ? styles.active : ''}>Sign In</button></li>
                </ul>
                {activeTab === 'login' ? <Login onSuccess={onClose} onClose={function (): void {
                    throw new Error('Function not implemented.');
                } } /> : <Registrate onSuccess={onClose} />}
                <button className={styles.btn__close} onClick={onClose}><CircleX /></button>
            </div>
        </div>
    )
}