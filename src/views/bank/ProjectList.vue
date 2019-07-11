<template>
  <div class="container">
    <div class="search-body">
      <input type="search" v-model="value" placeholder="搜索" />
      <mt-button class="button" type="primary" size="small">搜索</mt-button>
      <mt-button class="button" size="small" @click="addNewProject">新建项目</mt-button>
    </div>

    <div class="project-list">

      <mt-cell v-for="i in 10" :key="i" title="项目xxx" label="2019-05-29 16:37" is-link @click.native="getInfo()"></mt-cell>

    </div>
    <Pagination :total="count" :display="pageSize" :current="current" @pagechange="pageChange"></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/bank/Pagination'
export default {
  components: { Pagination },
  data () {
    return {
      count: 100,
      pageSize: 10,
      current: 1,
      inputValue: null,
      value: null
    }
  },
  methods: {
    pageChange (e) {
      console.log(e)
    },
    getInfo () {
      console.log('getinfo')
      this.$router.push({ name: 'projectInfo', params: { pid: 1 } })
    },
    addNewProject () {
      this.$router.push({ name: 'projectInfo', params: { pid: 0 } })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-body {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  input {
    width: 100%;
    height: 40px;
    margin-right: 10px;
  }
  .button {
    flex-shrink: 0;
  }
}
</style>
