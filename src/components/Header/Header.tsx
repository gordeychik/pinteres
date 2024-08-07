import { Bolt, Star, Moon, UserCheck, UserX } from 'lucide-react';
import { Input } from '../../ui/Input/Input';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

export const Header = () => {
    const [theme, setTheme] = useState('light');
    const user = useSelector((state: any) => state.user.user);
    const [userIcon, setUserIcon] = useState(<UserX stroke='#128a58' />);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        if (user) {
            setUserIcon(<UserCheck stroke='#128a58' />);
        } else {
            setUserIcon(<UserX stroke='#128a58' />);
        }
    }, [user]);

    return (
        <div className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
            <Link to='/' className={styles.header__logo}>
                <div className={styles.header__logoImage}>
                    <Bolt stroke='#128a58' />
                </div>
                <p>pinteres</p>
            </Link>
            <Input placeholder='Поиск' onChange={handleInputChange} value="" />
            <Link to='/' className={styles.favorite}>
                <Star stroke='#128a58' />
            </Link>
            <button className={`${styles.moon} ${theme === 'dark' ? styles.dark : ''}`} onClick={toggleTheme}>
                <Moon stroke='#128a58' />
            </button>
            <Link to='/' className={styles.profile}>
                {userIcon}
            </Link>
        </div>
    );
};