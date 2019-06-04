<template>
  <div class="contaienr">
    <mt-header title="注册用户">
      <router-link to="/login" slot="left" replace>
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="card">
      <h3>注册</h3>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="comfirmPassword"></mt-field>

      <mt-button class="submit" type="primary" size="large" @click="register">注册</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null,
      comfirmPassword: null
    }
  },
  methods: {
    register () {
      console.log('注册')
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
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
