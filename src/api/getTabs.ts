import axios from "axios";

export interface Category {
  id: number;
  name: string;
}

export const fetchTabs = async () => {
  try {
    const response = await axios.get(
      "https://040a09353dca8c9b.mokky.dev/gallery/1"
    );
    return response.data.categories.map((item: { name: string }) => item.name);
  } catch (error) {
    console.error(error);
  }
};