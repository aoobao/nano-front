<template>
  <div class="menu-container">
    <h2>菜单</h2>
    <div class="menulist">
      <mt-cell class="menu-item" v-for="menu in menuList" :key="menu.name" :title="menu.text" @click.native="menuClick(menu)"></mt-cell>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['menuList'])
  },
  methods: {
    menuClick (menu) {
      let name = menu.name
      this.$router.push({ name })
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 10px;
  .menu-item {
    cursor: pointer;
  }
}
</style>
