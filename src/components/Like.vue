<template>

  <div class="cn-wide-container">

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <ul class="list-group jimo-like-group">
            <li class="list-group-item">
              <a @click="goFollowee">关注我的</a>
            </li>
            <li class="list-group-item">
              <a @click="goFollower">我关注的</a>
            </li>
          </ul>
        </div>

        <div class="col-md-8">
          <div v-if="isFollower">
            <ul class="list-group jimo-like-group">
              <li class="list-group-item" v-for="(item,index) in follower" :key="index">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-2">
                      <img class="img-responsive img-circle"
                           src="//upload.jianshu.io/users/upload_avatars/6228045/7e945f7c-1fbc-4878-9895-32cf350872ac?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120">
                    </div>
                    <div class="col-md-8">
                      <a href="/u/8030dc01df44" class="user">{{ item.nickName }}</a>
                      <br/>
                      <span class="time">{{item.createTime}}</span>
                    </div>
                    <!--<div class="col-md-2">
                      <a class="btn btn-success follow"><i class="iconfont ic-follow"></i><span>关注</span></a>
                    </div>-->
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-else>
            <ul class="list-group jimo-like-group">
              <li class="list-group-item" v-for="(item,index) in followee" :key="index">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-2">
                      <img class="img-responsive img-circle"
                           src="//upload.jianshu.io/users/upload_avatars/6228045/7e945f7c-1fbc-4878-9895-32cf350872ac?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120">
                    </div>
                    <div class="col-md-8">
                      <a href="/u/8030dc01df44" class="user">{{ item.nickName }}</a> <span>关注了你</span>
                      <br/>
                      <span class="time">{{item.createTime}}</span>
                    </div>
                    <!--<div class="col-md-2">
                      <a class="btn btn-success follow"><i class="iconfont ic-follow"></i><span>关注</span></a>
                    </div>-->
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
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
        isFollower: false,
        current: [],
        follower: [],
        followee: []
      }
    },
    created() {
      this.loadFollowee();
    },
    methods: {
      goFollower() {
        this.isFollower = true;
        this.loadFollwer();
      },
      goFollowee() {
        this.isFollower = false;
        this.loadFollowee();
      },
      loadFollwer() {
        let id = this.$store.state.userId;
        this.$http.get(`/users/${id}/follower`)
          .then(res => {
            if (res.data.code == 200) {
              this.follower = res.data.data;
            } else {
              this.$message.error('好像出错了');
            }
          })
          .catch(err => {
            this.$message.error('好像出错了');
            console.log(err)
          })
      },
      loadFollowee() {
        let id = this.$store.state.userId;
        this.$http.get(`/users/${id}/followee`)
          .then(res => {
            if (res.data.code == 200) {
              this.followee = res.data.data;
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

<style src="bootstrap/dist/css/bootstrap.css" type="text/css" scoped></style>
<style scoped>

</style>
