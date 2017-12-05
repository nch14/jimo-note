<template>
  <div id="app">
    <el-menu :default-active="index" class="el-menu-demo" mode="horizontal" @select="onNext">
      <el-menu-item index="1">即墨Note</el-menu-item>
      <el-menu-item index="2">
        朋友圈
      </el-menu-item>
      <el-menu-item index="3">
        我的笔记
      </el-menu-item>
      <el-menu-item index="4">
        我的关注
      </el-menu-item>

      <span v-if="!hasLogin" style="float: right">
        <el-menu-item index="5">登录</el-menu-item>
        <el-menu-item index="6">注册</el-menu-item>
      </span>

      <span v-else style="float: right">
        <el-menu-item index="10">倪辰皓</el-menu-item>
        <el-menu-item index="11">记笔记</el-menu-item>
      </span>

    </el-menu>
    <router-view/>

    <el-dialog title="登录" :visible.sync="goSignIn">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="signInfo.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="signInfo.password"></el-input>
        </el-form-item>
      </el-form>

      <p @click="goToSignUp">没有账号？点此注册</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goSignIn = false">取 消</el-button>
        <el-button type="primary" @click="signIn">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="注册" :visible.sync="goSignUp">
      <el-form label-position="top" label-width="200px">
        <el-form-item label="用户名">
          <el-input v-model="signInfo.username"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="signInfo.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="signInfo.password"></el-input>
        </el-form-item>

        <el-form-item label="请再次输入密码">
          <el-input v-model="signInfo.password"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="goSignUp = false">取 消</el-button>
        <el-button type="primary" @click="signIn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        index: "2",
        goSignIn: false,
        goSignUp: false,
        signInfo: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      // 计算属性的 getter
      hasLogin: function () {
        // `this` 指向 vm 实例
        return false;
      }
    },
    methods: {
      onNext(key, keyPath) {
        var next;
        switch (key) {
          case '2':
            next = {name: 'Hello'};
            break;
          case '3':
            next = {name: 'HomePage',params: { id: 1 }};
            break;
          case '4':
            next = {name: 'Like'};
            break;
          case '5':
            this.goSignIn = true;
            return;
          case '6':
            this.goSignUp = true;
            return;
        }
        this.$router.push(next);
      },
      signIn() {
        console.log('sign in')
      },
      goToSignUp() {
        console.log('Go to Sign up')
        this.goSignIn = false;
        this.goSignUp = true
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
