<template>
  <div class="drink-card">
    <img :src="drink.strDrinkThumb" />
    <p>{{ drink.strDrink }}</p>
  </div>
</template>

<script setup lang="ts">
  import type { DrinkProps } from '@/models/drinks.model'
  withDefaults(defineProps<{ drink: DrinkProps }>(), {})
</script>

<style lang="scss" scoped>
  .drink-card {
    padding: $xxs;
    border-radius: $xxxs;
    border: $quark solid transparent;
    overflow: hidden;
    transition: border ease-in-out;
    img {
      width: 100%;
      border-top-left-radius: $xxxs;
      border-top-right-radius: $xxxs;
    }
    p {
      padding-top: $xxs;
    }
  }
  .drink-card:hover {
    cursor: pointer;
    border: $quark solid $dark-gray;
    box-shadow: $box-neon-pink;
  }
</style>