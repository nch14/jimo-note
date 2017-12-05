<template>

  <div class="cn-wide-container">

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <ul class="list-group jimo-like-group">
            <li class="list-group-item">
              关注我的
            </li>
            <li class="list-group-item">
              我关注的
            </li>
          </ul>
        </div>

        <div class="col-md-8">
          <ul class="list-group jimo-like-group">

            <li class="list-group-item">

              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-2">
                    <img class="img-responsive img-circle"
                         src="//upload.jianshu.io/users/upload_avatars/6228045/7e945f7c-1fbc-4878-9895-32cf350872ac?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120">
                  </div>
                  <div class="col-md-8">
                    <a href="/u/8030dc01df44" class="user">沉默的舞者</a> <span>关注了你</span>
                    <br/>
                    <span class="time">2017.11.18 15:50</span>
                  </div>
                  <div class="col-md-2">
                    <a class="btn btn-success follow"><i class="iconfont ic-follow"></i><span>关注</span></a>
                  </div>
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
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style src="bootstrap/dist/css/bootstrap.css" type="text/css" scoped></style>
<style scoped>

</style>
