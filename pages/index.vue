<template>
  <main class="main">
    <Header :search="filters.search" @searching="updateSearch"/>
    <section>
      <CategoryFilter  :categories="categories" :filtered-category="filters.category" @toggle-category="toggleCategory"/>
      <div class="container">
        <CategoryFilterMobile :categories="categories" :filtered-category="filters.category" @toggle-category="toggleCategory"/>
        <h4>[ {{ list?.drinks.length ?? 0 }} ] {{ $t('drink.list.results-found') }} - {{ filters.category }}</h4>
        <ul class="drink-list">
          <li v-if="meta.loading">
            <DrinkCardSkeleton />
          </li>
          <li v-if="meta.loading">
            <DrinkCardSkeleton />
          </li>
          <li v-for="drink in list?.drinks" @click="showModal(drink)">
            <DrinkCard :drink="drink" />
          </li>
        </ul>
      </div>
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
  const filters = reactive({
    category: (route.query.category as string) || '',
    search: (route.query.search as string) || '',
  })
  const openedDrink = ref({} as DrinkProps)
  const isVisibleModal = ref(false)
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
    .container {
      display: flex;
      position: relative;
      flex-direction: column;
      gap: $sm;
      padding-left: $sm;
      padding-right: $sm;
      width: 100%;
      flex: 1;
      @include min-xlarge {
        padding-left: 20%;
      }
      @include min-xxlarge {
        padding-left: 20%;
      }
      
      h4 {
        font-weight: 500;
        padding: 0 $xxs;
      }
    }

    ul.drink-list {
      width: 100%;
      height: 100%;
      display: grid;
      list-style-type: none;
      grid-template-columns: repeat(2, 1fr);
      @include min-large {
        grid-template-columns: repeat(3, 1fr);
      }
      @include min-xlarge {
        grid-template-columns: repeat(3, 1fr);
      }
      @include min-xxlarge {
        grid-template-columns: repeat(4, 1fr);
      }

      li {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
models/drinks.model