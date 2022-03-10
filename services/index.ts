import axios from 'axios'

type searchFilters = {
  [filters: string]: any
}

export const BASE_URL = 'https://api.mercadolibre.com';

export const getCategories: () => any = async () => (await axios.get(`${BASE_URL}/sites/MLA/categories`))?.data;
export const getItemsByIdByCategory: (categoryId: string) => any = async (categoryId) => (await axios.get(`${BASE_URL}/sites/MLA/search?category=${categoryId}`))?.data;

export const getItemsById: (itemIds: string) => any = async (itemIds) => (await axios.get(`${BASE_URL}/items?ids=${itemIds}`))?.data;
export const searchItems: (query: string, filters?: searchFilters) => any = async (query, filters) => (await axios.get(`${BASE_URL}/sites/MLA/search?q=${query}${filters ? Object.entries(filters).map((attribute, value) => `&${attribute}=${value}`) : ''}`))?.data;
