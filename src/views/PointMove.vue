<template>
  <div class="container">
    <vue-three @render="render" @created="start" ref="three">
      <template v-slot:camera>
        <camera :position="[500,2000,10000]" :far="50000" />
      </template>
      <template v-slot:light>
        <light />
      </template>
      <template v-slot:default>
        <PointMove ref="PointMove" />

      </template>
    </vue-three>
  </div>
</template>
<script>
import VueThree from '@/components/vue-three'
import camera from '@/components/PerspectiveCamera'
import light from '@/components/DirectionalLight'
import PointMove from '@/components/mesh/PointMove.vue'

export default {
  components: { VueThree, camera, light, PointMove },
  methods: {
    start () {

    },
    render () {
      let p = this.$refs.PointMove
      if (p) {
        p.render()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vw;
  max-width: 80vh;
  max-height: 80vh;
}
</style>
