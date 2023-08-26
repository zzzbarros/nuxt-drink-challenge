<template>
  <div class="details-container scroll">
    <div class="details-container col ">
      <div class="image-wrapper">
        <img class="img" :src="drink.strDrinkThumb"/> 
        <h2>{{drink.strDrink}}</h2>
      </div>
      <h3 class="category" v-if="!drink.strCategory">
        <div class="skeleton" />
      </h3>
      <h3 class="category" v-else>{{ drink.strCategory }}</h3>
    </div>
    <div class="details-container col info ">
      <div class="details-container col">
        <h3>{{ $t('drink.ingredients') }}:</h3>
        <div v-if="!ingredients.length" class="skeleton-wrapper">
          <div class="skeleton" />
          <div class="skeleton"/>
        </div>
        <ul v-else>
          <li v-for="i in ingredients">{{i}}</li>
        </ul>
      </div>
      <div class="details-container col">
        <h3>{{ $t('drink.method') }}:</h3>
        <div v-if="!ingredients.length" class="skeleton-wrapper">
          <div class="skeleton" />
          <div class="skeleton" />
          <div class="skeleton" />
        </div>
        <p v-else class="justify-text">{{drink.strInstructions}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrinkProps } from '@/models/drinks.model'

const props = withDefaults(defineProps<{ drink: DrinkProps }>(), {})
const drink = ref(props.drink)
const ingredients = ref<string[]>([])

watch(() => props.drink, (newDrink) => {
  drink.value = newDrink
  updateIngredients()
})

function updateIngredients() {
  const keys = Object.keys(drink.value) as Array<keyof DrinkProps>
  keys.forEach(key => {
    if ((key as string).includes('strIngredient') && drink.value[key]) {
      ingredients.value.push(drink.value[key]!)
    }
  })
}

updateIngredients()
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
      padding-top: $xxs;
      padding-bottom: $xxs;
      gap: $xl;
      @include min-large {
        height: 100%;
        overflow-y: auto;
        margin-right: $lg;
        padding-right: $sm;
        padding-bottom: $lg;
      }
    }

    h2, h3 {
      width: fit-content;
      background-color: $dark;
      color: white;
      text-transform: uppercase;
      padding: $nano $xxs;
    }

    ul, ol {
      padding: $nano $md;
    } 

    .image-wrapper {
      position: relative;
      .img {
        width: 100%;
        border-radius: $xxxs $xxxs 0 0;
        @include min-medium  {
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
      @include min-medium  {
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