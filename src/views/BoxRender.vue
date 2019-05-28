<template>
  <div class="container">
    <vue-three @render="render" @created="start" ref="three">
      <template v-slot:camera>
        <camera />
      </template>
      <template v-slot:light>
        <light />
      </template>
    </vue-three>
  </div>
</template>
<script>
import VueThree from '@/components/vue-three'
import camera from '@/components/PerspectiveCamera'
import light from '@/components/DirectionalLight'
export default {
  components: { VueThree, camera, light },
  data () {
    return {
      created: false
    }
  },
  mounted () {
    let loader = new THREE.TextureLoader()
    loader.load('./textures/disturb.jpg', texture => {
      var material = new THREE.MeshBasicMaterial({ map: texture });

      var geometry = new THREE.BoxGeometry(1, 1, 1);

      this.cube = new THREE.Mesh(geometry, material);

      if (this.created) {
        this.$refs.three.$addObject(this.cube)
      }
    })
  },
  methods: {
    start () {
      this.created = true
      if (this.cube) {
        this.$refs.three.$addObject(this.cube)
      }
    },
    render () {
      // let cube = this.cube
      // // let global = this.$refs.three.global
      // // console.log(global)
      // if (cube) {
      //   cube.rotation.x += 0.02
      //   cube.rotation.y += 0.02
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 500px;
  height: 500px;
}
</style>
