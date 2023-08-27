import { Storage } from '@/utils/storage'
import type { DrinkProps, DrinkListProps, FilterProps } from 'models/drinks.model'

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

interface CategoryResponseProps {
  drinks: Pick<DrinkProps, 'strCategory'>[]
}

export const DrinkServices = {
  async getCategories() {
    const { data, ...rest } = await useFetch<CategoryResponseProps>(`${BASE_URL}/list.php?c=list`)
    return { categories: data.value?.drinks, ...rest }
  },

  async getList(search: string, category: string) {
    const url = !!category ? `${BASE_URL}/filter.php?c=${category}` : `${BASE_URL}/search.php?s=${search}`
    return fetch(url)
  },

  async getById(id: string): Promise<DrinkListProps> {
    const url = `${BASE_URL}/lookup.php?i=${id}`
    try {
      const response = await fetch(url)
      const data = (await response.json()) as DrinkListProps
      return data
    } catch (err) {
      return {} as DrinkListProps
    }
  },
}
