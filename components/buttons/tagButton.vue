<template>
  <button @click="emits('handleClick',text)" :data-active="active" :title="text">
    {{ text }}
    <X :size="14" />
  </button>
</template>

<script setup lang="ts">
  import { X } from 'lucide-vue-next'
  const emits = defineEmits(['handleClick'])
  const props = defineProps({
    text: String,
    active: Boolean,
  })
</script>

<style lang="scss" scoped>
  button {
    width: 100%;
    color: white;
    text-align: left;
    background: transparent;
    border-radius: $nano;
    border: 1px solid transparent;
    padding: $xxxs $xxs;
    display: flex;
    gap: $xxxs;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
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
</style>