<template>
  <div class="map" ref="map">
    <slot></slot>
  </div>
</template>
<script>
import requireMap from '@/assets/js/importAmap'
export default {
  props: {
    // 地图初始化参数
    opts: {
      type: Object,
      default () {
        return {
          zoom: 8,//级别
          pitch: 60,
          viewMode: '2D'//使用3D视图
        }
      }
    },
    imageSrc: {
      type: String,
      default: './images/default_bank.jpg'
    },
    imageWidth: {
      type: Number,
      default: 1000
    },
    imageHeight: {
      type: Number,
      default: 1000
    }
  },
  data () {
    let amap = {}
    return {
      amap
    }
  },
  provide () {
    return {
      amap: this.amap
    }
  },
  mounted () {
    requireMap(this.initMap)
  },
  beforeDestroy () {
    if (this.amap.$map) {
      this.amap.$map.destroy()
      delete this.amap.$map
    }
  },
  methods: {
    initMap () {
      this.$store.commit('setMobile', AMap.Browser.mobile)
      // emit before map create (change opts)
      this.$emit('beforeCreate')
      let imgOpt = createImageLayer(this.imageWidth, this.imageHeight, this.imageSrc)
      this.amap.$map = new AMap.Map(this.$refs.map, {
        ...this.opts,
        ...imgOpt
      })

      // 设置可见范围
      let bound = new AMap.Bounds([0, 0], [this.imageWidth / 1000, this.imageHeight / 1000])
      this.amap.$map.setLimitBounds(bound)
      this.amap.$map.setBounds(bound)

      setTimeout(() => {
        this.$emit('created')
      }, 1);
    },
    getMap () {
      return this.amap.$map || null
    }
  }
}

function createImageLayer (x = 1000, y = 1000, url = './images/default_bank.jpg') {
  let cx = x / 1000
  let cy = y / 1000
  let bounds = new AMap.Bounds([0, 0], [cx, cy])
  let imageLayer = new AMap.ImageLayer({
    bounds,
    url: url,
    opacity: 1,
    visible: true,
    zIndex: 1
  })
  let mapOpts = {
    center: [cx / 2, cy / 2],
    layers: [imageLayer]
  }
  return mapOpts
}

</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
