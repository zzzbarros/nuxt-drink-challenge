<template>
  <main class="main">
    <Header :search="filters.search" @searching="updateSearch"/>
    <section>
      <DrinkFilter  :categories="categories" :filtered-category="filters.category" :only-favorites="filters.onlyFavorites" @toggle:category="toggleCategory" @toggle:favorite="toggleOnlyFavorite" />
      <DrinkList :drinks="list?.drinks" :filtered-category="filters.category" :has-error="meta.error"  :is-loading="meta.loading" @open-drink="showModal">
        <MobileDrinkFilter :categories="categories" :filtered-category="filters.category" :only-favorites="filters.onlyFavorites" @toggle:category="toggleCategory" @toggle:favorite="toggleOnlyFavorite"/>
      </DrinkList>
    </section>
    <modal :visible="!!openedDrink.idDrink" @close="closeModal">
      <DrinkDetails :drink="openedDrink" @on:favorite="handleFavorite"/>
    </modal>
  </main>
</template>

<script setup lang="ts">
  import {useDrinkList} from '@/composables/useDrinkList'
  import { DrinkServices } from '@/services/drinks'
  const {  categories } = await DrinkServices.getCategories()
  const {
    list,
    meta,
    filters,
    openedDrink,
    callbacks
} = useDrinkList()
  
  const {
    toggleCategory,
    toggleOnlyFavorite,
    updateSearch,
    showModal,
    closeModal,
    handleFavorite,
  } = callbacks
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