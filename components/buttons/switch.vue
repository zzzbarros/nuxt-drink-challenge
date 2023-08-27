<template>
  <label class="switch">
    <input type="checkbox" :checked="isChecked" @change="$emit('update:checked', $event)">
    <span class="slider round"></span>
  </label>
</template>

<script setup lang="ts">
  defineProps({
    isChecked: Boolean
  })
  defineEmits(['update:checked'])
</script>

<style scoped lang="scss">
  $width: 56px;
  $translate: calc($width / 2);
  .switch {
    position: relative;
    display: inline-block;
    width: $width;
    height: $sm;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $gray;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    content: "";
    position: absolute;
    height: $xs;
    width: $xs;
    left: $nano;
    bottom: $nano;
    background-color: $light-blue;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: $pink;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px $pink;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX($translate);
    -ms-transform: translateX($translate);
    transform: translateX($translate);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: $lg;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>