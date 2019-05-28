<script>
import register from '@/components/mixins/register'
import OrbitControls from '@/assets/js/three-plugin/OrbitControls'
export default {
  mixins: [register],
  computed: {
    aspect () {
      let width = this.$parent.width
      let height = this.$parent.height
      if (height !== 0) {
        return width / height
      } else {
        return 1
      }
    }
  },
  methods: {
    init () {
      let camera = this.global.$camera = new THREE.PerspectiveCamera(90, this.aspect, 0.1, 2000)
      camera.position.z = 0.01  // 不能在原点,因为orbitcontrols是围绕原点去旋转

      let controls = this.controls = new OrbitControls(camera, this.global.$renderer.domElement)

      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.rotateSpeed = - 0.25;

      this.$addObject(camera)

    },
    destroy () {
      if (this.controls) {
        this.controls.dispose()
        this.controls = null
      }
    }
  }
}
</script>
