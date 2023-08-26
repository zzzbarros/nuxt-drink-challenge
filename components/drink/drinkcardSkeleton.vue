<template>
  <div class="card-skeleton">
    <div class="skeleton img"/>
    <p class="skeleton p" /> 
  </div>
</template>

<style lang="scss" scoped>
  .card-skeleton{
    padding: $xxs;
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    .skeleton {
      width: 100%;
      background-color: $gray;
      animation: pulse 1.5s infinite;
    }
    .img {
      border-radius: $xxxs $xxxs 0 0;
      margin-bottom: 14px;
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
    .p{
      height: 24px;
      border-radius: 0 0 $nano $nano;
    }
  }
</style>