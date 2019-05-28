<template>
  <div class="vue-three-container" ref="container">
    <template v-if="isRegister">
      <slot name="camera"></slot>
      <slot name="light"></slot>
      <slot></slot>
    </template>
  </div>
</template>
<script>
// import camera from './PerspectiveCamera'
// import light from './DirectionalLight'
export default {
  name: 'vue-three',
  // components: { light, camera },
  render () {
    /*
<template>
  <div class="vue-three-container" ref="container">
    <template v-if="isRegister">
      <slot name="camera"></slot>
      <!-- <camera :width="width" :height="height"  /> -->
      <!-- <light /> -->
      <slot name="light"></slot>
      <slot></slot>
    </template>
  </div>
</template>
*/
    let context = []
    if (this.isRegister) {
      //let camera = this.$slots.camera ? this.$slots.camera : <camera width={this.width} height={this.height} />
      context.push(<slot name="camera"></slot>)
      context.push(<slot name="light" ></slot>)
      context.push(<slot></slot>)
    }
    return (
      <div class="vue-three-container" ref="container">
        {context}
      </div>
    )
  },
  provide () {
    return {
      global: this.global
    }
  },
  data () {
    let global = {}
    return {
      global,
      animateIndex: null,
      isAnimate: true,
      width: 0,
      height: 0,
      isRegister: false
    }
  },
  mounted () {
    this._initThree()
    this.$emit('created')
    if (this.isAnimate) this.render()
  },
  destroyed () {
    window.removeEventListener('resize', this.resetSize, false)
    if (this.animateIndex) {
      cancelAnimationFrame(this.animateIndex)
      this.animateIndex = null
    }

    if (this.global.$scene) {
      this.global.$scene.dispose()
      delete this.global.$scene
    }
  },
  methods: {
    $addObject (...objs) {
      // console.log(objs)
      // debugger
      if (this.global.$scene) {
        this.global.$scene.add(...objs)
      } else {
        console.warn('add objects after created event!')
      }
    },
    $removeObject (...objs) {
      if (this.global.$scene) {
        this.global.$scene.remove(...objs)
      }
    },
    $addRender (func) {
      if (this.global.$renderFuncs) {
        this.global.$renderFuncs.push(func)
      } else {
        console.warn('add function after created event!')
      }

    },
    _initThree () {
      this.global.$renderFuncs = []
      this.global.$scene = new THREE.Scene()
      this.global.$renderer = new THREE.WebGLRenderer({
        antialias: true
      })

      // this.global.$renderer.setClearColor(0xff0000, 1.0);

      let height = this.$refs.container.offsetHeight
      let width = this.$refs.container.offsetWidth
      this.width = width
      this.height = height
      this.global.$renderer.setSize(width, height)

      this.$refs.container.appendChild(this.global.$renderer.domElement)

      this.isRegister = true

      // 暂时监听window大小变化,不监听dom大小
      window.addEventListener('resize', this.resetSize, false)

    },
    getGlobalObject (name) {
      return this.global[name] || null
    },
    render () {
      if (this.isAnimate) {
        let camera = this.global.$camera
        if (camera) {
          this.$emit('render')
          this.global.$renderer.render(this.global.$scene, camera)
        } else {
          console.warn('等待相机加载')
        }
        this.animateIndex = requestAnimationFrame(this.render)
      }
    },
    resetSize () {
      if (this.global.$renderer) {
        this.height = this.$refs.container.offsetHeight
        this.width = this.$refs.container.offsetWidth
        this.global.$renderer.setSize(this.width, this.height)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-three-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
