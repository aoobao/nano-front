<template>
  <div class="container">
    <mt-header title="用户登录">
      <router-link to="/" slot="left" replace>
        <mt-button icon="back">返回</mt-button>
        <!-- <mt-button @click="handleClose">关闭</mt-button> -->
      </router-link>
      <mt-button slot="right" @click="register">注册</mt-button>
    </mt-header>
    <div class="login-card">
      <h3>登录</h3>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button class="submit" type="primary" size="large" @click="goBank">登录</mt-button>
    </div>
  </div>
</template>
<script>
import { errMessage } from '@/assets/js/utils'
export default {
  data () {
    return {
      // username: null,
      // password: null
      username: 'admin',
      password: 'admin'
    }
  },
  methods: {
    register () {
      // console.log('register')
      this.$router.push({ name: 'register' })
    },
    goBank () {
      let data = {
        key: this.username,
        pwd: this.password
      }

      if (!data.key || !data.pwd) {
        errMessage('账号密码不可为空')
        return
      }

      this.$store.dispatch('login', data).then(rst => {
        if (rst.isok) {
          this.$router.push({
            name: 'mapview' // use default route name
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-card {
  width: 300px;
  margin: 50px auto 20px;
  padding: 30px 50px;
  // border: 1px solid #000;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
  .submit {
    margin-top: 30px;
  }
}
</style>
