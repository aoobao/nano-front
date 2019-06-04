<template>
  <div class="mask-container" v-if="value" @click="closeMask">
    <div class="mask-context" :style="getStyle()" @click.stop="()=>{}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean,
    width: {
      type: String,
      default: '80%'
    },
    height: {
      type: String,
      default: '70%'
    }
  },
  methods: {
    getStyle () {
      return {
        height: this.height,
        width: this.width
      }
    },
    closeMask () {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.mask-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .mask-context {
    background-color: #fff;
  }
}
</style>
