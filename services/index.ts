import axios from 'axios'

export const BASE_URL = 'https://api.mercadolibre.com';

export const getCategories: () => any = async () => (await axios.get(`${BASE_URL}/sites/MLA/categories`))?.data;
export const getItemsByCategory: (categoryId: string) => any = async (categoryId) => (await axios.get(`${BASE_URL}/sites/MLA/search?category=${categoryId}`))?.data;

export const getItems: (itemIds: string) => any = async (itemIds) => (await axios.get(`${BASE_URL}/items?ids=${itemIds}`))?.data;
