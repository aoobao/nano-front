<script>
export default {
  render () { return null },
  inject: ['global'],
  created () {
    typeof this.init === 'function' && this.init()
  },
  beforeDestroy () {
    if (this.$mesh) {
      this.$removeObject(this.$mesh)
    }
    typeof this.destroy === 'function' && this.destroy()
  },
  methods: {
    $addObject (...objs) {
      let addObject = this.$parent.$addObject
      if (typeof addObject === 'function') {
        addObject(...objs)
      } else {
        console.warn('parent vue component can not find method : $addObject')
      }
    },
    $removeObject (...objs) {
      let removeObject = this.$parent.$removeObject
      if (typeof removeObject === 'function') {
        removeObject(...objs)
      } else {
        console.warn('parent vue component can not find method : $removeObject')
      }
    }
  }
}
</script>
