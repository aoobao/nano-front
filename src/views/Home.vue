<template>
  <div class="home">
    <mt-header title="全景场景分享">
      <mt-button slot="right" @click="getLogin">登录</mt-button>
      <!-- <mt-button plain>plain</mt-button> -->
    </mt-header>
    <div class="body">
      <AMap />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import AMap from '@/components/map/AMap'
export default {
  name: 'home',
  components: { AMap },
  data () {
    return {
    }
  },
  methods: {
    getLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .body {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>
