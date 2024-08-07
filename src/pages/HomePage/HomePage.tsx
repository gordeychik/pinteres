import { Header } from '../../components/Header/Header';
import { Container } from '../../ui/Container/Container';
import { useEffect, useState } from 'react';
import { fetchTabs } from '../../api/getTabs';
import { fetchImages } from '../../api/getItems';
import Masonry from 'react-masonry-css';
import clsx from 'clsx';
import { Login } from '../../components/Login/Login';
import { Registrate } from '../../components/Registrate/Registrate';
import styles from './HomePage.module.scss';

interface IProps {
    activeIndex?: number;
}

interface ImageData {
    image: string;
}

export const HomePage: React.FC<IProps> = ({ activeIndex: initialActiveIndex = 0 }) => {

    const [tabs, setTabs] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>(tabs[initialActiveIndex] || '');
    const [images, setImages] = useState<ImageData[]>([]);

    useEffect(() => {
        const getTabs = async () => {
            try {
                const nameTab: string[] = await fetchTabs();
                setTabs(nameTab);
                setActiveTab(nameTab[initialActiveIndex] || '');
            } catch (error) {
                console.log(error);
            }
        };

        getTabs();
    }, [initialActiveIndex]);

    useEffect(() => {
        const getImages = async () => {
            try {
                const imagesData = await fetchImages(activeTab);
                setImages(imagesData);
                console.log(imagesData);
            } catch (error) {
                console.log(error);
            }
        };

        if (activeTab) {
            getImages();
        }
    }, [activeTab]);

    const handleClick = (tab: string) => {
        setActiveTab(tab);
    };

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
                <div className={styles.home}>
                    <ul>
                        {tabs?.map((elem, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => handleClick(elem)}
                                    className={clsx(styles.button, { [styles.active]: activeTab === elem })}
                                >
                                    {elem}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className={styles.myMasonryGrid}
                        columnClassName={styles.myMasonryGridColumn}
                    >
                        {images.map((image, index) => (
                            <div key={index} className={styles.photoItem}>
                                <img src={image.image} alt={`${index}`} loading='lazy' />
                            </div>
                        ))}
                    </Masonry>
                </div>
                <Login />
                <Registrate />
            </Container>
        </>
    );
};