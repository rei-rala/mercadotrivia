import axios from 'axios'

type searchFilters = {
  [filters: string]: any
}

export const BASE_URL = 'https://api.mercadolibre.com';

export const getCategories: () => any = async () => (await axios.get(`${BASE_URL}/sites/MLA/categories`))?.data;
export const getItemsByIdByCategory: (categoryId: string) => any = async (categoryId) => (await axios.get(`${BASE_URL}/sites/MLA/search?category=${categoryId}`))?.data;

export const getItemsById: (itemIds: string) => any = async (itemIds) => (await axios.get(`${BASE_URL}/items?ids=${itemIds}`))?.data;
export const searchItems: (query: string, aditionalFilters?: searchFilters) => any = async (query, aditionalFilters) => (await axios.get(`${BASE_URL}/sites/MLA/search?q=${query}${aditionalFilters ? Object.entries(aditionalFilters).map((attribute, value) => `&${attribute}=${value}`) : ''}`))?.data;