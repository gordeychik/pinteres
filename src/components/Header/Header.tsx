import { Bolt, Star, Moon, UserX, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAuth } from '../ModalAuth/ModalAuth';
import { clearUser } from '../../store/userSlice';
import { RootState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import { Container } from '../../ui/Container/Container';

export const Header = () => {
    const [theme, setTheme] = useState('light');
    const user = useSelector((state: RootState) => state.user.user);
    const [userIcon, setUserIcon] = useState(<UserX stroke='#128a58' />);
    const dispatch = useDispatch<AppDispatch>();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setUserIcon(<div className={styles.actions}>
                <Link to='/account' className={styles.link}>My profile</Link>
                <button className={styles.logout} onClick={handleLogout}>Log Out</button></div>
            );
            setIsModalOpen(false)
        } else {
            setUserIcon(<div className={styles.actions__enter}><button className={styles.logout} onClick={openModal}>Log In</button></div>);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleLogout = () => {
        dispatch(clearUser())
        localStorage.removeItem('user')
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
                <Container>
                    <div className={styles.header__wrapper}>
                        <div className={styles.header__info}>
                            <Link to='/' className={styles.header__logo}>
                                <div className={styles.header__logoImage}>
                                    <Bolt stroke='#128a58' />
                                </div>
                                <p>pinteres</p>
                            </Link>
                            <p className={styles.header__title}>This resource is a fake of the original – <Link to='https://www.pinterest.com/' target='_blanc'>Pinterest</Link>...</p>
                        </div>
                        <div className={styles.header__actions}>
                            <Link to='/upload' className={styles.upload}>
                                <Upload />
                                Upload
                            </Link>
                            <Link to='/favorite' className={styles.favorite}>
                                <Star stroke='#128a58' />
                            </Link>
                            <button className={`${styles.moon} ${theme === 'dark' ? styles.dark : ''}`} onClick={toggleTheme}>
                                <Moon stroke='#128a58' />
                            </button>
                            <Link to='/' className={styles.profile}>
                                {userIcon}
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
            {isModalOpen && <ModalAuth onClose={closeModal} />}
        </>
    );
};