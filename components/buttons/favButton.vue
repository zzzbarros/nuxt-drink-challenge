<template>
  <button @:click="handleFavorite" :data-is-favorite="data.isFavorite">
    <Heart />
    <p>{{  $t(`drink.details.fav.${data.isFavorite ? 'remove' : 'add'}`) }}</p>
  </button>
</template>

<script setup lang="ts">
  import { Heart } from 'lucide-vue-next'
  import type { DrinkProps } from '@/models/drinks.model'

  const emits = defineEmits(['on:favorite'])
  const props = withDefaults(defineProps<{ initialDrink: DrinkProps, initialFavorite:Boolean }>(), {})
  const data = reactive({
    drink: props.initialDrink,
    isFavorite: props.initialFavorite,
  })
  watch(() => props.initialDrink, () => {
    data.drink = props.initialDrink
    data.isFavorite = props.initialFavorite
  })

  function handleFavorite(drink: DrinkProps) {
    emits('on:favorite', drink)
    data.isFavorite = !data.isFavorite
  }
</script>

<style lang="scss" scoped>
  button {
    border: none;
    background-color:transparent;
    width: fit-content;
    display: flex;
    gap: $xxs;
    align-items: center;
    padding: $nano 0;
    background: $white;
    color: $dark;
    padding: $nano $xxs;
    cursor: pointer;
    p {
      position: relative;
      left: -5px;
      transition: left 0.3s ease-in;
    }
  }
  button:hover, button[data-is-favorite=true] {
    background: $pink;
    color: $white;
    padding: $nano $xxs;
    p {
      left: 0;
    }
  }
  button[data-is-favorite=true]:hover {
    filter: brightness(90%);
  }
</style>