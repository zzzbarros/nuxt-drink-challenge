<template>
  <div class="details-container scroll">
    <div class="details-container col">
      <div class="fav-mobile">
        <FavButton :initial-drink="drink" :initial-favorite="isFavorite" @on:favorite="$emit('on:favorite', drink)" /> 
      </div>
      <div class="image-wrapper">
        <img class="img" :src="drink.strDrinkThumb" />
        <h2>{{ drink.strDrink }}</h2>
      </div>
      <h3 class="category" v-if="!drink.strCategory">
        <div class="skeleton" />
      </h3>
      <h3 class="category" v-else>{{ drink.strCategory }}</h3>
    </div>
    <div class="details-container col info">
      <div class="fav-desktop">
        <FavButton :initial-drink="drink" :initial-favorite="isFavorite" @on:favorite="$emit('on:favorite', drink)"/> 
      </div>
      <div class="details-container col">
        <h3>{{ $t('drink.details.ingredients') }}:</h3>
        <div v-if="!ingredients.length" class="skeleton-wrapper">
          <div class="skeleton" />
          <div class="skeleton" />
        </div>
        <ul v-else>
          <li v-for="(ingredient, index) in ingredients">
            {{ `${ingredient} | ${measures[index] ?? $t('drink.details.undefined')}` }}
          </li>
        </ul>
      </div>
      <div class="details-container col">
        <h3>{{ $t('drink.details.method') }}:</h3>
        <div v-if="!ingredients.length" class="skeleton-wrapper">
          <div class="skeleton" />
          <div class="skeleton" />
          <div class="skeleton" />
        </div>
        <p v-else class="justify-text">{{ drink.strInstructions }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DrinkProps } from '@/models/drinks.model'
  import { Storage } from '@/utils/storage'
  
  const props = withDefaults(defineProps<{ drink: DrinkProps}>(), {})
  defineEmits(['on:favorite'])
  const drink = ref(props.drink)
  const isFavorite = ref(false)
  const ingredients = ref<string[]>([])
  const measures = ref<string[]>([])

  watch(
    () => props.drink,
    (newDrink) => {
      drink.value = newDrink
      updateData()
    }
  )

  function updateData() {
    const favoriteList = Storage.get<DrinkProps[]>(Storage.KEYS.FAVORITES) 
    if (!!favoriteList) {
      isFavorite.value = !!favoriteList.find(d => d.idDrink === drink.value.idDrink)
    }
    const keys = Object.keys(drink.value) as Array<keyof DrinkProps>
    keys.forEach((key) => {
      if ((key as string).includes('strIngredient') && drink.value[key]) {
        ingredients.value.push(drink.value[key])
      }
      if ((key as string).includes('strMeasure') && drink.value[key]) {
        measures.value.push(drink.value[key])
      }
    })
  }

  updateData()
</script>

<style lang="scss" scope>
  .details-container {
    width: 100%;
    gap: $md;
    display: flex;

    @include max-medium {
      margin-top: $sm;
    }

    @include max-medium {
      flex-direction: column;
    }

    .col {
      flex-direction: column;
      gap: $xxs;
    }

    .info {
      gap: $sm;
      @include min-medium {
        padding-top: $xxs;
        padding-bottom: $xxs;
        gap: $xl;
        height: 100%;
        overflow-y: auto;
        margin-right: $lg;
        padding-right: $sm;
        padding-bottom: $lg;
      }
    }

    .fav-desktop {
      display: flex;
      @include max-small {
        display: none;
      }
    }
    
    .fav-mobile {
      display: none;
      width: 100%;
      @include max-medium {
        display: flex;
      }
    }

    h2,
    h3 {
      width: fit-content;
      background-color: $dark;
      color: white;
      text-transform: uppercase;
      padding: $nano $xxs;
    }

    ul {
      padding: $nano $md;
    }

    .image-wrapper {
      position: relative;
      .img {
        width: 100%;
        border-radius: $xxxs $xxxs 0 0;
        @include min-medium {
          border-radius: $xxxs 0 0;
        }
      }
      h2 {
        position: absolute;
        bottom: 0;
        margin: $sm;
      }
    }

    .category {
      width: 100%;
      text-align: right;
      background-color: $dark;
      color: white;
      padding: $xxxs $sm;
      text-transform: uppercase;
      border-radius: 0;
      @include min-medium {
        border-radius: 0 0 0 $xxxs;
      }
    }

    .skeleton {
      height: 16px;
    }

    .skeleton-wrapper {
      display: flex;
      flex-direction: column;
      gap: $nano;
    }
  }

  .details-container.scroll {
    @include max-medium {
      height: 100%;
      overflow-y: auto;
      padding-bottom: 10rem;
    }
  }
</style>