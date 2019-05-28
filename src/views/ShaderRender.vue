<template>
  <div class="container">
    <vue-three @render="render" @created="start" ref="three">
      <template v-slot:camera>
        <camera :position="[0,0,2750]" :far="4000" />
      </template>
      <template v-slot:light>
        <light />
      </template>
      <template v-slot:default>
        <ShaderMesh />
      </template>
    </vue-three>
  </div>
</template>
<script>
import VueThree from '@/components/vue-three'
import camera from '@/components/PerspectiveCamera'
import light from '@/components/DirectionalLight'
import ShaderMesh from '@/components/mesh/ShaderMesh/ShaderMesh.vue'
export default {
  components: { VueThree, camera, light, ShaderMesh },
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
