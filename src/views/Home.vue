<template>
  <div class="home">
    <!-- <p>
      <router-link to="/test">Go to test</router-link>
    </p> -->
    <p v-for="router in routers" :key="router.name">
      <router-link :to="router.path">{{router.name}} - {{router.text}}</router-link>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import routers from '../router.config'
export default {
  name: 'home',
  data () {
    return {
      routers: routers.map(t => {
        return {
          path: t.path,
          name: t.name,
          text: t.text
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
