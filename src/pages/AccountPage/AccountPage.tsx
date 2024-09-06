import {  Loader } from 'lucide-react'
import { Header } from '../../components/Header/Header'
import styles from './AccountPage.module.scss'
import { Container } from '../../ui/Container/Container'

export const AccountPage = () => {
    return (
        <>
            <Header />
            <Container>
                <div className={styles.wrapper}>
                    <Loader stroke='#128a58' />
                    <h1>Coming soon...</h1>
                </div>
            </Container>
        </>
    )
}
