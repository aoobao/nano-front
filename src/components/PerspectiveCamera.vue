<script>
import register from '@/components/mixins/register'
import OrbitControls from '@/assets/js/three-plugin/OrbitControls'
export default {
  mixins: [register],
  props: {
    // width: {
    //   type: Number,
    //   default: 500
    // },
    // height: {
    //   type: Number,
    //   default: 500
    // },
    fov: {
      type: Number,
      default: 45
    },
    near: {
      type: Number,
      default: 1
    },
    far: {
      type: Number,
      default: 50000
    },
    position: {
      type: Array,
      default () {
        return [0, 0, 3]
      }
    }
  },
  computed: {
    aspect () {
      let width = this.$parent.width
      let height = this.$parent.height
      if (height !== 0) {
        return width / height
      } else {
        return 1
      }
    },
    propertyValue () {
      return {
        fov: this.fov,
        aspect: this.aspect,
        near: this.near,
        far: this.far,
        position: this.position
      }
    }
  },
  methods: {
    init () {
      let camera = this.global.$camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far)
      camera.position.set(...this.position)
      camera.lookAt(this.global.$scene)
      // 绑定OrbitControls
      this.controls = new OrbitControls(camera, this.global.$renderer.domElement);

      this.$addObject(this.global.$camera)
    },
    destroy () {
      if (this.controls) {
        this.controls.dispose()
        this.controls = null
      }
    }
  },
  watch: {
    // aspect (val) {
    //   let camera = this.global.$camera
    //   if (!camera) return
    //   camera.aspect = val
    //   camera.updateProjectionMatrix()

    //   this.controls.update()
    // },
    propertyValue (opt) {
      let camera = this.global.$camera
      if (!camera) return
      camera.fov = opt.fov
      camera.aspect = opt.aspect
      camera.near = opt.near
      camera.far = opt.far
      camera.position.set(...opt.position)
      camera.lookAt(this.global.$scene)
      camera.updateProjectionMatrix()
    }
  }
}
</script>
