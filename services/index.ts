import axios from 'axios'

export type CategoryML = {
  id: string,
  name: string,
}

export type SearchFilterObject = {
  [filters: string]: any
}


export const BASE_URL = 'https://api.mercadolibre.com';

export const getCategories: (filter?: SearchFilterObject) => any = async (filter?: SearchFilterObject) => (await axios.get(`${BASE_URL}/sites/MLA/categories${filter ? Object.entries(filter).map((attribute, value) => `&${attribute}=${value}`) : ''}`))?.data || [];
