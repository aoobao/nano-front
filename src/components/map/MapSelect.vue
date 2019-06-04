<script>
import AMap from '@/components/map/AMap'
import ImageMap from '@/components/map/ImageMap'
import MarkerPoint from '@/assets/js/amap/MarkerPoint/MarkerPoint'
export default {
  render () {
    if (this.imageSrc) {
      return (
        <ImageMap opts={this.opts}
          imageSrc={this.imageSrc}
          imageWidth={this.imageWidth}
          imageHeight={this.imageHeight}
          on-created={this.init}
          ref="map">
        </ImageMap>
      )
    } else {
      return (
        <a-map opts={this.opts} on-created={this.init} ref="map">

        </a-map>
      )
    }
  },
  components: { AMap, ImageMap },
  props: {
    latitude: {
      type: [Number, String],
      default: null
    },
    longitude: {
      type: [Number, String],
      default: null
    },
    zoom: {
      type: Number,
      default: 12
    },
    pointSrc: {
      type: String,
      default: './images/point.png'
    },
    pointWidth: {
      type: Number,
      default: 40
    },
    pointHeight: {
      type: Number,
      default: 40
    },
    imageSrc: String,
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
    return {
      setX: null,
      setY: null
    }
  },
  computed: {
    opts () {
      let opt = {
        zoom: this.zoom,
        viewMode: '2D'
      }

      return opt
    },
    x () {
      if (!this.longitude) {
        return this.setX
      } else {
        return parseFloat(this.longitude) || 0
      }
    },
    y () {
      if (!this.latitude) {
        return this.setY
      } else {
        return parseFloat(this.latitude) || 0;
      }
    },
    location () {
      if (this.x !== null && this.y !== null) {
        return `${this.x},${this.y}`
      } else {
        return null
      }
    }
  },
  beforeDestroy () {
    if (this.$map) {
      this.$map.off('click', this.clickHandle, this)
    }
    if (this.$point) {
      this.$point.destroy()
      this.$point = null
    }
  },
  methods: {
    init () {
      // console.log(this)
      this.$map = this.$refs.map.getMap()
      if (this.location !== null) {
        this.setSelectPoint(this.x, this.y)
      }
      // 添加点击事件
      this.$map.on('click', this.clickHandle, this)
    },
    clickHandle (e) {
      // console.log('click', e)
      let lnglat = e.lnglat
      this.$emit('click', {
        lnglat,
        e
      })
    },
    setSelectPoint (x, y) {
      if (!this.$map) return
      // 居中
      this.$map.setCenter([x, y])

      if (this.$point) {
        // 修改点位位置
        this.$point.setPosition([x, y])
      } else {
        this.$point = new MarkerPoint({
          imageSrc: this.pointSrc,
          imageWidth: this.pointWidth,
          imageHeight: this.pointHeight,
          position: [x, y],
          map: this.$map
        })
      }
    }
  },
  watch: {
    location (val) {
      if (val === null) {
        if (this.$point) {
          this.$point.destroy()
          this.$point = null
        }
      } else {
        this.setSelectPoint(this.longitude, this.latitude)
      }
    }
  }
}
</script>
