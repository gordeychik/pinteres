import { MonitorUp, ScreenShareOff } from 'lucide-react'
import { Header } from '../../components/Header/Header'
import { Container } from '../../ui/Container/Container'
import styles from './UploadPage.module.scss'
import { useState } from 'react'
import axios from 'axios';

export const UploadPage = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setSelectedFiles(files);

        if (files) {
            const filePreviews: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onloadend = () => {
                    filePreviews.push(reader.result as string);
                    if (filePreviews.length === files.length) {
                        setPreviews(filePreviews);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            setPreviews([]);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles && selectedFiles.length > 0) {
            const formData = new FormData();
            formData.append('file', selectedFiles[0]);

            try {
                const response = await axios.post('https://040a09353dca8c9b.mokky.dev/uploads', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Успешная отправка:', response.data);
                setModalVisible(true);
            } catch (error) {
                console.error('Ошибка при отправке:', error);
            }
        } else {
            console.log('No files selected');
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedFiles(null);
        setPreviews([]);
    };

    return (
        <>
            <Header />
            <Container>
                {previews.length > 0 ? (
                    <div className={styles.previewContainer}>
                        <div className={styles.imageGrid}>
                            {previews.map((preview, index) => (
                                <img key={index} src={preview} alt={`preview-${index}`} className={styles.previewImage} />
                            ))}
                            <button onClick={handleUpload} className={styles.uploadButton}>Upload</button>
                        </div>
                    </div>
                ) : <div className={styles.title}>
                    <ScreenShareOff />
                    <h1 className={styles.upload}>Uploaded files are empty...</h1>
                </div>}

                <div className={styles.uploadContainer}>

                    <label htmlFor="fileInput" className={styles.customFileInput}><div className={styles.upload__wrapper}><MonitorUp /> Add Files<input type="file" id="fileInput" onChange={handleFileChange} multiple className={styles.hiddenInput} /></div></label>
                </div>

                {modalVisible && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2>Your file has been sent successfully...</h2>
                            <button onClick={closeModal} className={styles.closeButton}>Close</button>
                        </div>
                    </div>
                )}
            </Container>
        </>
    )
}