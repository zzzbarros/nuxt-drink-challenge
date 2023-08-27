<template>
  <div class="filter-mobile-container">
    <div class="fav-container">
      <h3>{{ $t('drink.favorites') }}</h3>
        <Switch :isChecked="onlyFavorites" @update:checked="$emit('toggle:favorite')"/>
    </div>
    <h4>Filter por categorias</h4>
    <ul>
      <li v-for="category in categories">
        <TagButton @handleClick="$emit('toggle:category',category.strCategory)" :text="category.strCategory" :active="filteredCategory === category.strCategory" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import type { CategoryListProps } from '@/models/drinks.model'
  
  defineEmits(['toggle:category','toggle:favorite'])
  defineProps({
    categories: Array<CategoryListProps>,
    filteredCategory: String,
    onlyFavorites: Boolean
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
    @include min-xlarge {
      display: none;
    }
    @include min-xxlarge {
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

    .fav-container {
      display: flex;
      justify-content:space-between;
    }
  }
</style>