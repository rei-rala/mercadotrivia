import axios from 'axios';
import { BASE_URL } from '.'
import { SearchFilterObject } from '.';

export const searchItems: (query: string) => any = async (query) => (await axios.get(`${BASE_URL}/sites/MLA/search?q=${query}`))?.data || [];
export const getItemsByCategoryId: (categoryId: string, filters?: SearchFilterObject) => any = async (categoryId, filters) => (await axios.get(`${BASE_URL}/sites/MLA/search?category=${categoryId}${filters ? Object.entries(filters).map((attribute, value) => `&${attribute}=${value}`) : ''}`))?.data || [];

export const getItemsById: (itemIds: string) => any = async (itemIds) => (await axios.get(`${BASE_URL}/items?ids=${itemIds}`))?.data || [];