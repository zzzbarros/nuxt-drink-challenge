import { DrinkServices } from '@/services/drinks'
import { Storage } from '@/utils/storage'
import type { DrinkProps, DrinkListProps, FilterProps } from 'models/drinks.model'

export function useDrinkList() {
  const router = useRouter()
  const route = useRoute()
  const filters = reactive({
    category: (route.query.category as string) || '',
    search: (route.query.search as string) || '',
    onlyFavorites: !!route.query.onlyFavorites,
  })
  const meta = reactive({ loading: false, error: false })
  const list = ref<DrinkListProps | null>(null)
  const favorites = ref([] as DrinkProps[])
  const openedDrink = ref({} as DrinkProps)

  onMounted(() => {
    fetchData(filters)
    fetchFavorites()
  })

  watch(
    () => favorites.value,
    () => {
      fetchData(filters)
    }
  )
  watch(
    () => filters.search,
    useDebounce(() => fetchData(filters), 500)
  )
  watch(
    () => filters.category,
    () => fetchData(filters)
  )
  watch(
    () => filters.onlyFavorites,
    () => fetchData(filters)
  )

  async function fetchData(filters: FilterProps) {
    meta.loading = true
    const { category, search, onlyFavorites } = filters
    const query = {
      ...(search && { search }),
      ...(category && { category }),
      ...(onlyFavorites && { onlyFavorites: 'true' }),
    }

    router.push({ query })

    if (onlyFavorites) {
      filterFavorites(search, category)
      return
    }

    try {
      const response = await DrinkServices.getList(search, category)
      const data = (await response.json()) as DrinkListProps
      if (!!category && !!search) {
        list.value = { drinks: filterSearched(data.drinks, search) }
      } else {
        list.value = data
      }
    } catch (error) {
      meta.error = true
    } finally {
      meta.loading = false
    }
  }

  function filterSearched(data: DrinkProps[], typedText: string) {
    return data.filter((d) => d.strDrink.toLowerCase().includes(typedText))
  }

  function filterCategory(data: DrinkProps[], category: string) {
    return data.filter((d) => d.strCategory.includes(category))
  }

  function filterFavorites(search: string, category: string) {
    meta.error = false
    list.value = { drinks: favorites.value }

    if (!!search) list.value = { drinks: filterSearched(list.value.drinks, search) }
    if (!!category) list.value = { drinks: filterCategory(list.value.drinks, category) }
    meta.loading = false
  }

  function fetchFavorites() {
    const currentFavorites = Storage.get<DrinkProps[]>(Storage.KEYS.FAVORITES) ?? []
    if (!!currentFavorites.length) {
      favorites.value = currentFavorites
    }
  }

  function toggleCategory(category: string) {
    if (filters.category === category) filters.category = ''
    else filters.category = category
  }

  function toggleOnlyFavorite() {
    filters.onlyFavorites = !filters.onlyFavorites
  }

  function updateSearch(typed: string) {
    filters.search = typed
  }

  function showModal(drink: DrinkProps) {
    openedDrink.value = drink
    if (!!filters.category) {
      fetchDrinkById(drink.idDrink)
    }
  }

  function closeModal() {
    openedDrink.value = {} as DrinkProps
  }

  function handleFavorite(drink: DrinkProps) {
    const currentFavorites = favorites.value
    const alreadyFavorite = !!currentFavorites.find((d) => d.idDrink === drink.idDrink)

    if (alreadyFavorite) {
      favorites.value = currentFavorites.filter((d) => d.idDrink !== drink.idDrink)
    } else {
      favorites.value.push(drink)
    }
    Storage.set(Storage.KEYS.FAVORITES, favorites.value)
  }

  async function fetchDrinkById(id: string) {
    const updatedDrink = await DrinkServices.getById(id)
    openedDrink.value = updatedDrink.drinks?.[0]
  }

  return {
    list,
    meta,
    filters,
    openedDrink,
    callbacks: {
      toggleCategory,
      toggleOnlyFavorite,
      updateSearch,
      showModal,
      closeModal,
      handleFavorite,
    },
  }
}
