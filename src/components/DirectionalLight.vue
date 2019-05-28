<script>
import register from '@/components/mixins/register'
export default {
  mixins: [register],
  data () {
    return {
      color: 0xffffff,
      intensity: 1,
      position: [0, 0, 5]
    }
  },
  methods: {
    init () {
      this.global.$light = new THREE.DirectionalLight(this.color, this.intensity)
      this.global.$light.position.set(...this.position)

      this.$addObject(this.global.$light)
    }
  }
}
</script>
