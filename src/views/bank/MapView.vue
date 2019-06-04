<template>
  <div class="container">
    <AMap />
  </div>
</template>
<script>
import AMap from '@/components/map/AMap'
export default {
  components: { AMap },
  data () {
    return {
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
