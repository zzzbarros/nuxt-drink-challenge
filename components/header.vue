<template>
  <header>
    <h1 class="neonText uppercase">{{ $t('drink.welcome') }}</h1>
    <search-input :search="search" @update:search="(search: string) => emits('searching', search)" />
  </header>
</template>

<script setup lang="ts">
  defineProps({
    search: String,
  });
  const emits = defineEmits(['searching'])
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    position: sticky;
    padding: $md 0;
    background-color: $dark;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid $dark-gray;
    flex-direction: column;
    gap: $sm;
    text-align: center;
    font-size: $xxs;
    @include min-large() {
      font-size: $xs;
    }
    @include min-xlarge {
      flex-direction: row;
      padding: $md $xl;
      font-size: $xs;
    }
    @include min-xxlarge {
      flex-direction: row;
      padding: $md $xl;
      font-size: $xs;
    }
  }
</style>