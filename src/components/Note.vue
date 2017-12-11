<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 area-note">
          <div>
            <div class="cn-center-me area-note-back">
              <el-button type="info" @click="onBack" plain>回首页</el-button>
            </div>

            <p class="jimo-name-white">
              <i class="fa fa-plus fa-fw"></i>添加笔记本
            </p>
            <p class="jimo-name-white"><i class="fa fa-book fa-fw"></i>分的积分
              <a @click="onDeleteNotebook">
                <i class="fa fa-trash-o area-note-right"></i>
              </a>
              <a @click="onRenameNotebook">
                <i class="fa fa-gear area-note-right"></i>
              </a></p>
            <p class="jimo-name-white"><i class="fa fa-book fa-fw"></i>分的积分
              <a @click="onDeleteNotebook">
                <i class="fa fa-trash-o area-note-right"></i>
              </a>
              <a @click="onRenameNotebook">
                <i class="fa fa-gear area-note-right"></i>
              </a></p>
            <p class="jimo-name-white"><i class="fa fa-book fa-fw"></i>分的积分</p>
            <p class="jimo-name-white"><i class="fa fa-book fa-fw"></i>分的积分</p>
            <p class="jimo-name-white"><i class="fa fa-book fa-fw"></i>分的积分</p>
            <p class="jimo-name-white"><i class="fa fa-book fa-fw"></i>分的积分</p>

          </div>

        </div>
        <div class="col-md-2" style="padding-left: 0; padding-right: 0">

          <div @click="onNewNote" class="add-button">
            <a><i class="fa fa-plus-circle fa-fw"></i><span>添加笔记</span></a>
          </div>

          <div class="note-item-title">
            <div>
              <a><i class="fa fa-sticky-note-o fa-2x"></i></a>
            </div>
            <div class="note-item-title-text">
              <span>为新中国加油！</span>
            </div>
          </div>

          <div class="note-item-title">
            <div>
              <a><i class="fa fa-sticky-note-o fa-2x"></i></a>
            </div>
            <div class="note-item-title-text">
              <span>为中国梦点赞！</span>
            </div>
          </div>

          <div class="note-item-title">
            <div>
              <a><i class="fa fa-sticky-note-o fa-2x"></i></a>
            </div>
            <div class="note-item-title-text">
              <span>渣渣！束手就擒吧！</span>
            </div>
          </div>

          <div class="note-item-title">
            <div>
              <a><i class="fa fa-sticky-note-o fa-2x"></i></a>
            </div>
            <div class="note-item-title-text">
              <span>为新中国擒住具备</span>
            </div>
          </div>
        </div>

        <div class="col-md-8" style="padding-left: 0; padding-right: 0">
          <div id="editor" class="editor-area">

            <div class="write-area">
              <div class="write-area-title">
                <el-input v-model="note.title" placeholder="请输入标题"></el-input>
              </div>
              <div class="note-control-panel">
                <el-tooltip class="item" effect="dark" content="历史版本" placement="top">
                  <i class="fa fa-clock-o note-control-butoon"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="移动文章" placement="top">
                  <i class="fa fa-folder-open note-control-butoon"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="权限设置" placement="top">
                  <i class="fa fa-lock note-control-butoon"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除文章" placement="top">
                  <i class="fa fa-trash-o note-control-butoon"></i>
                </el-tooltip>

                <div style="float: right">
                  <el-tooltip class="item" effect="dark" content="保存" placement="top">
                    <i class="fa fa fa-floppy-o note-control-butoon"></i>
                  </el-tooltip>


                  <i class="fa fa fa-mail-forward note-control-butoon"><span>发布文章</span></i>
                </div>
              </div>
              <textarea class="write-area-md" :value="note.input" @input="update"></textarea>
            </div>

            <div class="show-area" v-html="compiledMarkdown"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    components: {
      ElInput,
      ElButton
    },
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        noteBookConfig: {
          configModel: false,
          id: 0,
          popover: 'popover1'
        },
        note: {
          title: '',
          input: '',
        }

      }
    },
    watch: {
      //'title': 'onTitleUpdate',
    },
    mounted() {
      document.title = "记笔记";
      this.$store.commit('hideFoot');
    },
    computed: {
      compiledMarkdown: function () {
        let showTitle = (this.note.title == '') ? '' : '# ' + this.note.title + '\n';
        return marked(showTitle + this.note.input, {sanitize: true})
      }
    },
    methods: {
      onBack() {
        this.$router.push({name: 'Hello'})
      },
      onConfigNotebook(item) {
        this.noteBookConfig = {
          configModel: true,
          id: 0
        }
      },
      onDeleteNotebook() {
        this.$confirm('此操作将永久删除该笔记本, 是否继续?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      onRenameNotebook() {
        this.$prompt('新笔记本名', '修改笔记本名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '该笔记本已更名为: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      onNewNote() {
        this.note = {
          title: '',
          input: ''
        }
      },
      update: _.debounce(function (e) {
        this.note.input = e.target.value
      }, 300)
    }
  }
</script>
<style src="bootstrap/dist/css/bootstrap.css" type="text/css" scoped></style>
<style scoped>
  .area-note {
    padding: 10px;
    background-color: #3f3f3f;
    height: 100vh;
    color: white
  }

  .area-note-back {
    margin-bottom: 30px;
  }

  .area-note-right {
    float: right;
  }

  html, body, #editor {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  .write-area, .show-area {
    width: 50%;
    height: 100vh;
    vertical-align: top;
    box-sizing: border-box;
  }

  .show-area {
    padding: 20px;
  }

  .write-area-title {
    height: 40px;
  }

  .note-control-panel {
    width: 100%;
    background-color: #dedede;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
  }

  .note-control-butoon {
    padding: 11px 14px;
  }

  .write-area-md {
    width: 100%;
    height: calc(100% - 80px);
  }

  /*
    textarea, #editor div {
      display: inline-block;
      width: 49%;
      height: 100vh;
      vertical-align: top;
      box-sizing: border-box;
    }
  */

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }

  .show-area {
    overflow: auto;
    background-color: #fcfaf2;
  }

  .editor-area {
    display: flex;
  }

  .add-button {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .note-item-title {
    height: 90px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }

  .note-item-title-text {
    padding-left: 10px;
    color: #2f2f2f;
    background-color: transparent;
    text-shadow: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: normal;
    line-height: 36px;
  }
</style>
