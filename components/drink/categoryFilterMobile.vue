<template>
  <div class="filter-mobile-container">
    <h4>Filter por categorias</h4>
    <ul>
      <li v-for="category in categories">
        <TagButton @handleClick="emits('toggleCategory',category.strCategory)" :text="category.strCategory" :active="props.filteredCategory === category.strCategory" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import type { CategoriesProps } from '@/models/drinks.models'
  
  const emits = defineEmits(['toggleCategory'])
  const props = defineProps({
    categories: Array<CategoriesProps>,
    filteredCategory: String
  })
</script>

<style lang="scss" scoped>
  .filter-mobile-container {
    display: flex;
    flex-direction: column;
    height: fit-content;
    white-space: nowrap;
    gap: $sm;
    border-bottom: 1px solid $dark-gray;
    padding: 0 $xxs;
    @include xlarge {
      display: none;
    }
    @include xxlarge {
      display: none;
    }

    ul {
      list-style-type: none;
      display: flex;
      gap: $sm;
      overflow-x: auto;
      padding-bottom: $xxxs;
    }

    button {
      width: max-content;
      background: transparent;
      padding: $xxxs $xxs;
      color: white;
      border-radius: $nano;
      cursor: pointer;
      border: 1px solid transparent;
      text-align: left;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease-in-out;
      gap: $xxxs;
      svg {
        visibility: hidden;
        transition: visibility ease-in-out;
      }
    }
    button[data-active='true'] {
      background: $light-blue;
      color: $dark-gray;
      svg {
        visibility: visible;
      }
    }
    button:hover {
      background: $pink;
      color: $white;
      border-color: transparent;
    }
  }
</style>