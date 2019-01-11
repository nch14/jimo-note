<template>

  <div class="cn-wide-container">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <ul class="list-group">
            <li class="list-group-item cn-center-me">
              <div>
                <img class="cn-img-responsive img-circle"
                     src="//upload.jianshu.io/users/upload_avatars/6228045/7e945f7c-1fbc-4878-9895-32cf350872ac?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"/>
                <p class="shiny-username">{{ username }}</p>
              </div>

            </li>
            <li class="list-group-item">
              <div class="jimo-title">笔记本</div>
              <p class="jimo-name" v-for="(item,index) in books" :key="index"><i
                class="fa fa-book fa-fw"></i>{{ item.name }}</p>


            </li>
          </ul>
        </div>

        <div class="col-md-10">
          <ul class="list-group">

            <li class="list-group-item" v-for="(item,index) in notes" :key="index">
              <div class="jimo-info-snap-no-boarder">
                <div class="jimo-info-snap-head">
                  <img class="jimo-info-snap-img" src="//upload.jianshu.io/users/upload_avatars/6228045/7e945f7c-1fbc-4878-9895-32cf350872ac?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"/>
                  <span class="jimo-info-snap-username">{{item.nickName}}</span>
                  <span class="jimo-info-snap-time">{{item.updateTime}}</span>
                </div>

                <div class="jimo-info-snap-title">
                  {{ item.title}}
                </div>

                <div class="jimo-info-snap-body">
                  {{ item.content}}
                </div>

                <div class="font-size: 12px;">
                  <i class="el-icon-star-on">{{item.likeCount}}</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'HomePage',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        username: '',
        books: [],
        notes: []
      }
    },
    computed: {
      myTitle() {
        return 'title';
      }
    },
    created() {

    },
    methods: {
      loadBookInfo() {
        let id = this.$store.state.userId;
        this.$http.get(`/users/${id}/book`)
          .then(res => {
            if (res.data.code == 200) {
              this.books = res.data.data;
            } else {
              this.$message.error('好像出错了');
            }
          })
          .catch(err => {
            this.$message.error('好像出错了');
            console.log(err)
          })
      },
      loadNoteInfo() {
        let id = this.$store.state.userId;
        this.$http.get(`/users/${id}/note`)
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
<style src="bootstrap/dist/css/bootstrap.css" type="text/css" scoped></style>
<style scoped>
  .shiny-username {
    margin-top: 15px;
  }
</style>
