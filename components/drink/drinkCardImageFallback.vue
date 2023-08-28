<template>
  <img :src="src" v-if="!data.hasError" @error="handleFallback" @load="onLoaded" />
  <div v-else-if="data.isLoading" class="img-boundary skeleton" />
  <div v-else class="img-boundary">
    <Image :size="44"/>
    <span>{{$t('drink.card.image-fallback')}}</span>
  </div>
</template>

<script setup lang="ts">
  import { Image } from 'lucide-vue-next';
  defineProps({
    src: String
  })
  const data = reactive({
    hasError: false,
    isLoading: true
  })
  function handleFallback() {
    data.hasError = true
    data.isLoading = false    
  }
  function onLoaded() {
    data.isLoading = false    
  }
</script>

<style scoped lang="scss">
  .img-boundary {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 144px;
    border-bottom: 1px solid $gray;
    flex-direction: column;
    gap: $xxxs;
    border-top-left-radius: $xxxs;
    border-top-right-radius: $xxxs;
    min-height: 144px;
    @include min-small {
      min-height: 238px;
    }
    @include min-medium {
      min-height: 312px;
    }
    @include min-large {
      min-height: 308px;
    }
    @include min-xlarge {
      min-height: 362px;
    }
    @include min-xxlarge {
      min-height: 272px;
    }
  }
</style>