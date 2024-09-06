import { Header } from '../../components/Header/Header'
import { Container } from '../../ui/Container/Container'
import styles from './FavoritePage.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Masonry from 'react-masonry-css';

export const FavoritePage = () => {
    const favorites = useSelector((state: RootState) => state.favorite.items);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <>
            <Header />
            <Container>
                <div className={styles.favorite}>
                    {favorites.length > 0 ? <><h1>My favorites</h1>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className={styles.myMasonryGrid}
                            columnClassName={styles.myMasonryGridColumn}
                        >
                            {favorites.map((image, index) => (
                                <div key={index} className={styles.photoItem}>
                                    <img src={image.image} alt={`${index}`} loading='lazy' />
                                </div>
                            ))}
                        </Masonry></> : <h1>Your favorites is empty...</h1>}

                </div>
            </Container>
        </>
    )
}