<template>
  <div class="wrapper">
    <input ref="searchInput" :value="search" @input="handleSearch" :placeholder="$t('drink.searchInput.placeholder')" />
    <button v-if="!search" @click="setFocus">
      <SearchIcon :size="18" />
    </button>
    <button v-else @click="clearSearch">
      <TrashIcon :size="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Search as SearchIcon, Trash as TrashIcon } from 'lucide-vue-next';

defineProps(['search']);
const emits = defineEmits();
const searchInput = ref<HTMLInputElement | null>(null);

function setFocus() {
  searchInput.value?.focus();
}

function clearSearch() {
  emits('update:search', '');
  setFocus();
}

function handleSearch(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  emits('update:search', inputValue);
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    width: 100%;
    justify-content: center;

    @include min-xlarge {
      width: 50%;
      justify-content: flex-end;
    }
    @include min-xxlarge {
      width: 50%;
      justify-content: flex-end;
    }

    button {
      padding: $nano $xxs;
      border-radius:  0 $xxxs $xxxs 0;
      border: 2px solid $pink;
      background-color: $pink;
      color: $light-blue;
      cursor: pointer;
    }

    button:hover {
      filter: brightness(80%);
    }

    input {
      height: $xl;
      border-radius: $xxxs 0 0 $xxxs;
      padding: $nano;
      padding-left: $xxs;
      border: 1px solid $gray;
      width: 50%;
      background-color: $light-blue;
    }

    input:focus {
      outline-color: $dark-blue;
    }
  }
</style>
