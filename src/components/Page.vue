<template>
  <div class="cn-wide-container">

    <div class="cn-page-title">
      {{ note.title }}
    </div>

    <div class="cn-author">
      {{ note.nickName}}
    </div>

    <div class="cn-page-content" v-html="compiledMarkdown">
    </div>


  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        noteId: 0,
        note: {
          title: '',
          content: ''
        }
      }
    },
    mounted() {
      document.title = "笔记";
      this.$store.commit('showFoot');
    },
    created() {
      this.noteId = this.$route.params.id;
      this.loadNote()
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.note.content, {sanitize: true})
      }
    },
    methods: {
      loadNote() {
        let userId = this.$store.state.userId;

        this.$http.get(`/users/${userId}/note/${this.noteId}`)
          .then(res => {
            this.note = res.data.data[0];
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped>

  .cn-page-title {
    font-size: 34px;
    font-weight: 700;
    line-height: 1.3;
  }

  .cn-author {
    margin-top: 30px;
    margin-bottom: 40px;
    display: flex;
    color: #333;
  }

  .cn-page-content {
    color: #2f2f2f;
    word-break: break-all;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
  }
</style>
