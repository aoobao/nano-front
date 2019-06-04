<template>
  <MaskDialog :value="value" @input="(e)=>{this.$emit('input',e)}">
    <MapSelect :longitude="x" :latitude="y" @click="changePosition" />
  </MaskDialog>
</template>
<script>
import MapSelect from '@/components/map/MapSelect'
import MaskDialog from '@/components/bank/MaskDialog'
export default {
  components: { MapSelect, MaskDialog },
  props: {
    value: Boolean,
    latitude: {
      type: [Number, String],
      default: null
    },
    longitude: {
      type: [Number, String],
      default: null
    },
    imageSrc: {
      type: String,
      default: './images/point3d.png'
    }
  },
  computed: {
    x () {
      return this.longitude
    },
    y () {
      return this.latitude
    }
  },
  methods: {
    closeMask () {
      this.$emit('input', false)
    },
    changePosition (e) {
      // console.log(e)
      let lnglat = e.lnglat
      let longitude = lnglat.getLng()
      let latitude = lnglat.getLat()
      this.$emit('change', { longitude, latitude })
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .context {
    width: 80%;
    height: 70%;
    background-color: #fff;
  }
}
</style>
