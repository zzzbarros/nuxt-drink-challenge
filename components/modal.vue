<template>
  <Teleport to="body">
    <div class="modal" role="dialog" aria-modal="true" :aria-hidden="!visible" v-if="visible">
      <div class="overlay" @click="handleClose" />
      <div class="content" role="document">
        <div class="close-wrapper">
          <button @click="handleClose" class="close-button"><X /></button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { X } from 'lucide-vue-next';

  const emits = defineEmits(['close'])
  const props = defineProps({
    visible: Boolean,
  })

  function disableBodyScroll(){
    document.body.style.overflow = 'hidden';
  };

  function enableBodyScroll(){
    document.body.style.overflow = '';
  };

  function handleClose() {
    return emits('close')
  }

  function closeModalOnEsc(event: KeyboardEvent) {
    if (event.key === 'Escape' && props.visible) {
      handleClose();
    }
  }

  watch(() => props.visible, () => props.visible ? disableBodyScroll() : enableBodyScroll() )

  onMounted(() => {
    window.addEventListener('keydown', closeModalOnEsc);
  });

  onUnmounted(() => {
      window.removeEventListener('keydown', closeModalOnEsc);
  });
</script>

<style lang="scss" scoped>
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .overlay {
      background: $overlay;
      width: 100%;
      height: 100vh;
      position: fixed;
      display: block;
      top: 0;
      left: 0;
      z-index: 20;
    }
    .content {
      position: fixed;
      background: $white;
      border-radius: $xxxs;
      width: 90%;
      max-width: 60%;
      z-index: 20;
      padding: $md;
    }
    .close-wrapper {
      display: flex;
      justify-content: flex-end;
    }
    .close-button {
      position: absolute;
      background: transparent;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-radius: $nano;
      cursor: pointer;
    }
    .close-button:hover {
      border: 1px solid $gray;
    }
  }
</style>
