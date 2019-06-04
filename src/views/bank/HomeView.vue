<template>
  <vue-drawer-layout ref="drawerLayout" :drawer-width="200" @mask-click="handleToggleDrawer(false)">
    <!-- <div class="drawer" slot="drawer">

    </div> -->
    <menu-container slot="drawer" @change="handleToggleDrawer(false)" />
    <div class="content" slot="content">
      <mt-header title="景点后台管理">
        <mt-button slot="left" icon="more" @click="handleToggleDrawer"></mt-button>
      </mt-header>
      <p class="text" v-if="mobile">
        后台管理很多操作还是去电脑上打开操作吧...
      </p>
      <div class="body">
        <router-view/>
      </div>
    </div>
  </vue-drawer-layout>
</template>
<script>
import MenuContainer from './MenuContainer'
import { mapGetters } from 'vuex'
export default {
  components: { MenuContainer },
  computed: {
    ...mapGetters(['mobile'])
  },
  methods: {
    handleToggleDrawer (flag) {
      this.$refs.drawerLayout.toggle(flag);
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  .text {
    font-size: 12px;
    color: #999;
    flex-shrink: 0;
  }
  .body {
    width: 100%;
    height: 100%;
  }
}
</style>
