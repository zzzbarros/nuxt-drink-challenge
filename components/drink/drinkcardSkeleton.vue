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
  height: 100%;
  display: flex;
  flex-direction: column;
  .skeleton {
    width: 100%;
    background-color: $gray;
    animation: pulse 1.5s infinite;
  }
  .img {
    min-height: 22vh;
    min-width: 40vw;
    border-radius: $xxxs $xxxs 0 0;
    margin-bottom: 14px;

    @include small {
      min-height: 22vh;
      min-width: 43vw;
    }
    @include medium {
      min-height: 60vh;
      min-width: 45vw;
    }
    @include large {
      min-height: 50vh;
      min-width: 30vw;
    }
    @include xlarge {
      min-height: 59vh;
      min-width: 24.5vw;
    }
    @include xxlarge {
      min-height: 37.5vh;
      min-width: 38vh;
    }
  }
  .p{
    height: 24px;
    border-radius: 0 0 $nano $nano;
  }
}

</style>