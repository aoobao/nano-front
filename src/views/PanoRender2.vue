<template>
  <div class="container">
    <vue-three @render="render" @created="start">
      <template v-slot:camera>
        <camera />
      </template>
      <template v-slot:light>
        <light />
      </template>
      <template v-slot:default>
        <Panorama path="./textures/panorama/room.jpg" />
      </template>
    </vue-three>
  </div>
</template>
<script>
import Panorama from '@/components/mesh/Panorama1Image.vue'
import VueThree from '@/components/vue-three'
import camera from '@/components/PanoCamera'
import light from '@/components/DirectionalLight'
export default {
  components: { Panorama, VueThree, camera, light },
  methods: {
    start () {

    },
    render () {

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
