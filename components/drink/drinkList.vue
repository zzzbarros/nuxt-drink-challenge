<template>
  <div class="drink-list">
    <slot />
    <h4>[ {{ drinks?.length ?? 0 }} ] {{ $t('drink.list.results-found') }} - {{ filteredCategory }}</h4>
    <div class="boundary neonBox" v-if="hasError">
      <ServerCrash :size="80" />
      <h2 class="hint">{{$t('drink.list.error.title')}}</h2>
      <h3 class="hint">{{$t('drink.list.error.description')}}</h3>
    </div>
    <ul class="container" v-if="!!drinks?.length || isLoading">
      <li v-if="isLoading">
        <DrinkCardSkeleton />
      </li>
      <li v-if="isLoading">
        <DrinkCardSkeleton />
      </li>
      <li v-for="drink in drinks" @click="emits('openDrink',drink)">
        <DrinkCard :drink="drink" />
      </li>
    </ul>
    <div class="boundary" v-else>
      <PackageOpen :size="80" />
      <h2 class="hint">{{$t('drink.list.empty.title')}}</h2>
      <h3 class="hint">{{$t('drink.list.empty.description')}}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ServerCrash, PackageOpen } from 'lucide-vue-next'
  import type { DrinkProps } from '@/models/drinks.model'
  defineProps({
    drinks: Array<DrinkProps>,
    hasError: Boolean,
    isLoading: Boolean,
    filteredCategory: String
  })
  const emits= defineEmits(['openDrink'])
</script>

<style scoped lang="scss">
  .drink-list {
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
    ul.container {
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
    .boundary{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      padding: $xl 0;
      gap: $sm;
      .hint {
        text-align: center;
        width: 60%;
      }
    }
  }
</style>