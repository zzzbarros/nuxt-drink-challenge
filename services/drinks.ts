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

  getList(defaultFilter: FilterProps) {
    const router = useRouter()
    const meta = reactive({ loading: false, error: null as string | null })
    const list = ref<DrinkListProps | null>(null)

    async function fetchData(filters: FilterProps) {
      meta.loading = true
      const { category, search } = filters

      const query = { ...(search && { search }), ...(category && { category }) }
      router.push({ query })

      const url = !!category ? `${BASE_URL}/filter.php?c=${category}` : `${BASE_URL}/search.php?s=${search}`

      try {
        const response = await fetch(url)
        const data = (await response.json()) as DrinkListProps

        if (!!category && !!search) {
          list.value = { drinks: data.drinks.filter((d) => d.strDrink.toLowerCase().includes(search)) }
        } else {
          list.value = data
        }
      } catch (error) {
        meta.error = 'drink.list.error'
      } finally {
        meta.loading = false
      }
    }

    onMounted(() => {
      fetchData(defaultFilter)
    })

    return { list, meta, refetch: fetchData }
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
