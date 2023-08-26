<template>
  <main class="main">
    <Header :search="filters.search" @searching="updateSearch"/>
    <section>
      <CategoryFilter  :categories="categories" :filtered-category="filters.category" @toggle-category="toggleCategory"/>
      <DrinkList :drinks="list?.drinks" :filtered-category="filters.category" :has-error="meta.error"  :is-loading="meta.loading" @open-drink="showModal">
        <CategoryFilterMobile :categories="categories" :filtered-category="filters.category" @toggle-category="toggleCategory"/>
      </DrinkList>
    </section>
    <modal :visible="isVisibleModal" @close="closeModal">
      <DrinkDetails :drink="openedDrink" />
    </modal>
  </main>
</template>

<script setup lang="ts">
  import { DrinkServices } from '@/services/drinks'
  import { type DrinkProps } from 'models/drinks.model'

  const route = useRoute()
  const openedDrink = ref({} as DrinkProps)
  const isVisibleModal = ref(false)
  const filters = reactive({
    category: (route.query.category as string) || '',
    search: (route.query.search as string) || '',
  })
  const {  categories } = await DrinkServices.getCategories()
  const { list, meta, refetch } = DrinkServices.getList(filters)

  watch(
    () => filters.search,
    useDebounce(() => refetch(filters), 500)
  )
  watch(
    () => filters.category,
    () => refetch(filters)
  )

  function toggleCategory(category: string) {
    if (filters.category === category) filters.category = ''
    else filters.category = category
  }

  function updateSearch(typed: string) {
    filters.search = typed
  }

  function showModal(drink: DrinkProps) {
    openedDrink.value = drink
    isVisibleModal.value = true
    if (!!filters.category) {
      fetchDrinkById(drink.idDrink)
    }
  }

  function closeModal() {
    isVisibleModal.value = false
  }

  async function fetchDrinkById(id: string) {
    const updatedDrink = await DrinkServices.getById(id)
    openedDrink.value = updatedDrink.drinks?.[0]
  }
</script>

<style lang="scss" scoped>
  main {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: $dark;
    color: $light-blue;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $sm;
  }

  section {
    width: 100%;
    display: flex;
    position: relative;
    flex: 1;
  }
</style>