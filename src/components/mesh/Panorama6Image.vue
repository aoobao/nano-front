<script>
// 6个面的全景图组件
// path : 全景图目录
import register from '@/components/mixins/register'
export default {
  mixins: [register],
  props: {
    path: {
      type: String,
      default: './textures/panorama/bridge/'
    },
    suf: {
      type: String,
      default: '.jpg'
    }
  },

  computed: {
    sides () {
      let sides = [
        createSide(`${this.path}right${this.suf}`),
        createSide(`${this.path}left${this.suf}`),
        createSide(`${this.path}top${this.suf}`),
        createSide(`${this.path}bottom${this.suf}`),
        createSide(`${this.path}front${this.suf}`),
        createSide(`${this.path}back${this.suf}`)]
      return sides
    }
  },
  methods: {
    init () {
      let loader = new THREE.TextureLoader()

      let textures = this.sides.map(side => {
        let texture = loader.load(side.url)
        return texture
      })

      let materials = textures.map(texture => {
        let material = new THREE.MeshBasicMaterial({ map: texture })
        return material
      })

      this.$mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), materials)

      this.$mesh.geometry.scale(1, 1, -1)

      this.$addObject(this.$mesh)
    }
  }
}

function createSide (url, position, rotation) {
  // position , rotation 在cssRender中会用到,这里暂时考虑用webglRender
  return {
    url,
    position,
    rotation
  }
}
</script>
