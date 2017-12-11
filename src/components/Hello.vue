<template>
  <div class="cn-wide-container">

    <div class="jimo-info-snap">
      <div class="jimo-info-snap-head">
        <img class="jimo-info-snap-img" src="http://www.feizl.com/upload2007/2014_01/140116182482507.jpg"/>
        <span class="jimo-info-snap-username">梦馨</span>
        <span class="jimo-info-snap-time">2017-10-13 12:34</span>
      </div>

      <div class="jimo-info-snap-title">
        多少互撩，最后沦为点赞之交
      </div>

      <div class="jimo-info-snap-body">
        文/后夏夕颜 -1- 撩妹共有四重境界。 第一重，初见已是无人应，顾盼一次是后年。最初级的撩妹，在互相问好之后就再也没了音讯，最后那句晚安成为离别的悼词。 第二重，山穷水尽疑...
      </div>

      <div class="font-size: 12px;">
        <i class="el-icon-star-on"> 233</i>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        goSignIn: true,
        goSignUp: false,
        signInfo: {
          username: '',
          password: ''
        }
      }
    },
    mounted() {
      document.title = "确认订单";
      this.$store.commit('showFoot');
    },
    methods: {
      signIn() {
        console.log('sign in')
      },
      goToSignUp(){
        console.log('Go to Sign up')
        this.goSignIn = false;
        this.goSignUp = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
