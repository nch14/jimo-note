<template>
  <div class="cn-wide-container">

    <div class="jimo-info-snap" v-for="(item,index) in notes" :key="index" @click="toPage(item.noteId)">
      <div class="jimo-info-snap-head">
        <img class="jimo-info-snap-img" src="http://www.feizl.com/upload2007/2014_01/140116182482507.jpg"/>
        <span class="jimo-info-snap-username">{{ item.nickName}}</span>
        <span class="jimo-info-snap-time">{{ item.updateTime}}</span>
      </div>

      <div class="jimo-info-snap-title">
        {{item.title}}
      </div>

      <div class="jimo-info-snap-body">
        {{item.content}}
      </div>

      <div class="font-size: 12px;">
        <i class="el-icon-star-on"> {{item.likeCount}}</i>
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
        notes: []
      }
    },
    mounted() {
      this.$store.commit('showFoot');
    },
    created() {
      this.username = this.$store.state.userInfo.nickName;
      this.loadNoteInfo();
    },
    methods: {
      toPage(id) {
        this.$router.push({name: 'Page', params: {id: id}})
      },
      loadNoteInfo() {
        let hasLogin = this.$store.state.hasLogin;
        let url;
        debugger
        if (hasLogin) {
          let id = this.$store.state.userId;
          url = `/users/${id}/note/zone`
        } else {
          url = '/note/zone'
        }

        this.$http.get(url)
          .then(res => {
            if (res.data.code == 200) {
              this.notes = res.data.data;
            } else {
              this.$message.error('好像出错了');
            }
          })
          .catch(err => {
            this.$message.error('好像出错了');
            console.log(err)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
