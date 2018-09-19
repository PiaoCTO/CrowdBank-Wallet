<template>
  <div class="aph-token-icon">
    <img :src="imageUrl" @load="imageLoadOnComplete" class="image-preloader"/>
    <img src="~@/assets/img/token-icons/SCE.png" v-if="symbol === 'SCE'">
    <img src="~@/assets/img/token-icons/CBK.png" v-else-if="symbol === 'CBK'">
    <img src="~@/assets/img/token-icons/GAS.png" v-else-if="symbol === 'GAS'">
    <img src="~@/assets/img/token-icons/NEO.png" v-else-if="symbol === 'NEO'">
    <img :src="imageUrl" v-else-if="useImage" />
    <div class="placeholder" v-else>
      <div class="placeholder-text">{{ symbol }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    symbol: {
      type: String,
    },
  },
  computed: {
    imageUrl() {
      return null;
    },
  },

  data() {
    return {
      useImage: false,
    };
  },

  methods: {
    imageLoadOnComplete() {
      this.useImage = true;
    },
  },
};
</script>


<style lang="scss">
.aph-token-icon {
  $iconSize: toRem(50px);

  font-size: 0;

  .image-preloader {
    display: none;
  }

  img, .placeholder {
    height: $iconSize;
    width: $iconSize;
    border-radius: 50%;
  }

  .placeholder {
    align-items: center;
    background: $grey;
    color: white;
    display: flex;
    font-size: 0;
    height: $iconSize;
    justify-content: center;

    > * {
      display: block;
      font-size: toRem(14px);
      position: relative;
      top: toRem(1px);
    }
  }
}
</style>
