<script>
// 单张图片的全景图组件(720度图片)
import register from '@/components/mixins/register'
export default {
  mixins: [register],
  props: {
    path: {
      type: String,
      default: './textures/panorama/room.jpg'
    }
  },
  methods: {
    init () {
      // 暂时写死宽高半径
      let geometry = new THREE.SphereBufferGeometry(500, 60, 40);
      geometry.scale(- 1, 1, 1)

      let texture = new THREE.TextureLoader().load(this.path)

      let material = new THREE.MeshBasicMaterial({ map: texture })

      this.$mesh = new THREE.Mesh(geometry, material)

      this.$addObject(this.$mesh)

    }
  }
}
</script>
