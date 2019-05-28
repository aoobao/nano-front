<template>
  <div class="container">
    <vue-three @render="render" @created="start" ref="three">
      <template v-slot:camera>
        <camera :position="[300,500,0]" :far="10000" />
      </template>
      <template v-slot:light>
        <light />
      </template>
      <template v-slot:default>
        <PointMesh ref="pointMesh" />
      </template>
    </vue-three>
  </div>
</template>
<script>
import VueThree from '@/components/vue-three'
import camera from '@/components/PerspectiveCamera'
import light from '@/components/DirectionalLight'
import PointMesh from '@/components/mesh/PointMesh/index.vue'
export default {
  components: { VueThree, camera, light, PointMesh },
  methods: {
    start () {

    },
    render () {
      if (this.$refs.pointMesh) {
        this.$refs.pointMesh.render()
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
