import { getCategories } from "services";
import type { CategoryML } from "services";

import { EXCLUDED_CATEGORIES_KEYS, EXCLUDED_PROPERTIES_KEYS, INCLUDED_PROPERTIES } from 'constants/gameConstraints'
import { getItemsByCategoryId } from "./explorer";


export const getGameItems: (aditionalCatIdFilter?: string[]) => Promise<any[]> = async (aditionalCatIdFilter = []) => {
  const categories: CategoryML[] = await getCategories()
  const categoriesFiltered = categories.filter(category => EXCLUDED_CATEGORIES_KEYS.concat(aditionalCatIdFilter).includes(category.id) === false)
  const categoriesIdFiltered = categoriesFiltered.map(category => category.id)

  let items = await Promise.all(
    categoriesIdFiltered.map(async (categoryId) => {
      const itemsByCategory = await getItemsByCategoryId(categoryId, INCLUDED_PROPERTIES)
      return itemsByCategory.results || []
    })
  )

  const itemsFiltered = items.flat().filter(item => EXCLUDED_PROPERTIES_KEYS.map(propKey => item[propKey] === propKey))
  return itemsFiltered
}