<template>
  <aside>
    <div class="wrapper">
      <h3>{{ $t('drink.categories') }}</h3>
      <div v-if="pending">Carregando...</div>
      <ul class="wrapper scrolled" v-else>
        <li v-for="category in categories">
          <TagButton @handleClick="emits('toggleCategory',category.strCategory)" :text="category.strCategory" :active="props.filteredCategory === category.strCategory" />
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import type { CategoryListProps } from '@/models/drinks.model'
  
  const emits = defineEmits(['toggleCategory'])
  const props = defineProps({
    categories: Array<CategoryListProps>,
    filteredCategory: String
  })
</script>

<style lang="scss" scoped>
  aside {
    display: none;
    width: fit-content;
    max-width: 100%;
    height: 100%;
    flex-direction: column;
    gap: $xxxs;
    padding: 0 $xxxs;
    position: fixed;
    z-index: 10;

    @include min-xlarge {
      max-width: 20%;
      padding: 0 $xl;
      display: flex;
    }

    @include min-xxlarge {
      max-width: 20%;
      padding: 0 $xl;
      display: flex;
    }

    ul {
      list-style-type: none;
    }

    .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: $xxxs;

      h3 {
        margin-bottom: $xxxs;
      }
    }

    .scrolled {
      max-height: 100%;
      overflow-y: auto;
      padding-right: $nano;
    }
  }
</style>