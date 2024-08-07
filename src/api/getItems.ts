import axios from 'axios';

export const fetchImages = async (category: string) => {
    try {
        const response = await axios.get(`https://040a09353dca8c9b.mokky.dev/gallery/2`);
        const filteredCategory = category.split(' ').join('').toLowerCase();
        console.log(filteredCategory)
        return response.data.products.filter((product: any) => product.category === filteredCategory);
    } catch (error) {
        console.log(error);
        throw error;
    }
};