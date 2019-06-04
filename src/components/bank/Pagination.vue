<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': (current==1)}">
        <a @click="setCurrent(current-1)" href="javascript:void(0)"> « </a>
      </li>
      <li :class="{'disabled': (current==1)}">
        <a @click="setCurrent(1)" href="javascript:void(0)"> 首页 </a>
      </li>
      <li v-for="(p,index) in grouplist" :key="index" :class="{'active': (current==p.val)}">
        <a @click="setCurrent(p.val)" href="javascript:void(0)"> {{ p.txt }} </a>
      </li>
      <li :class="{'disabled': (current==page)}">
        <a @click="setCurrent(page)" href="javascript:void(0)"> 尾页 </a>
      </li>
      <li :class="{'disabled': (current==page)}">
        <a @click="setCurrent(current+1)" href="javascript:void(0)"> » </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
  data () {
    return {
      current: this.currentPage,
    }
  },
  props: {
    // 数目总条数
    total: {
      type: Number,
      default: 0
    },
    // 每一页显示10条数据
    display: {
      type: Number,
      default: 10,
    },
    // 当前处于哪一页
    currentPage: {
      type: Number,
      default: 1,
    },
    // 分页数目
    // 默认可视为5页
    pagegroup: {
      type: Number,
      default: 5,
    }
  },
  // 如何计算总页数
  // 总页数目是随着后台数据的变化而变化的所以需要计算属性，实时计算
  computed: {
    // 获取总页数
    page () {
      return Math.ceil(this.total / this.display);
    },
    // 获取页码
    grouplist () {
      // 总页数
      let len = this.page,
        // 距离中间那个数的偏移量
        count = Math.floor(this.pagegroup / 2),
        // 以当前页为中间数
        center = this.current,
        // 临时数组
        temp = [],
        // 返回的数组
        list = [];
      // 判断当总页数<=分页数的情况
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({
            txt: this.page - len,
            val: this.page - len
          })
        }

        return temp;
      }
      // 否则就是len>分页数目的情况
      while (len--) {
        temp.push(this.page - len);
      }
      // 找出当前页在这个数据中位置
      let idx = temp.indexOf(center);
      // 判断这个位置与中间偏离的大小
      // 计算出中间值
      (idx < count) && (center = center + count - idx);
      (this.current > this.page - count) && (center = this.page - count)
      // 从当前位置减去偏移量再减去1就是数组索引，
      // 获取this.pagegroup长度数组
      temp = temp.splice(center - count - 1, this.pagegroup);

      do {
        // 拼接数据
        let t = temp.shift();
        list.push({
          txt: t,
          val: t
        })
      } while (temp.length)

      // 接着判断数组是否到达处于中间
      if (this.page > this.pagegroup) {
        (this.current > count + 1) && list.unshift({ txt: '...', val: list[0].val - 1 });
        (this.current < this.page - count) && list.push({ txt: '...', val: list[list.length - 1].val + 1 });
      }
      return list;
    }
  },
  methods: {
    setCurrent (idx) {
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        // 判断当前页码不等于本身，和大于零，而且要小于总页数的时候，才触发
        this.current = idx;
        this.$emit('pagechange', this.current);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  overflow: hidden;
  display: table;
  margin: 0 auto;
  /*width: 100%;*/
  li {
    list-style: none;
    float: left;
    height: 30px;
    border-radius: 5px;
    margin: 3px;
    color: #999;
    background: rgb(240, 242, 245);
    line-height: 30px;
    &:hover {
      background: rgb(25, 137, 250);
      a {
        background: rgb(25, 137, 250);
        color: #fff;
      }
    }
    a {
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      border-radius: 5px;
      text-decoration: none;
      color: #999;
    }
  }
  .active {
    background: rgb(25, 137, 250);
    a {
      color: #fff;
    }
  }
}
</style>
