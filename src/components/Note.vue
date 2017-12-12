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
              <i @click="onNewNotebook" class="fa fa-plus fa-fw"></i>添加笔记本
            </p>
            <p class="jimo-name-white" v-for="(item,index) in books" :key="index">
              <a @click="onBookSelect(item.id)"><i class="fa fa-book fa-fw"></i><span>{{item.name}}</span></a>
              <a @click="onDeleteNotebook(item)">
                <i class="fa fa-trash-o area-note-right" style="margin: 2px"></i>
              </a>
              <a @click="onRenameNotebook(item)">
                <i class="fa fa-gear area-note-right" style="margin: 2px"></i>
              </a>
            </p>
          </div>

        </div>
        <div class="col-md-2" style="padding-left: 0; padding-right: 0">

          <div @click="newNote" class="add-button">
            <a><i class="fa fa-plus-circle fa-fw"></i><span>添加笔记</span></a>
          </div>

          <div class="note-item-title" v-for="(item,index) in notes" :key="index">
            <div>
              <a><i class="fa fa-sticky-note-o fa-2x"></i></a>
            </div>
            <div @click="onNoteSelect(item)" class="note-item-title-text">
              <span>{{ item.title }}</span>
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
                  <i @click="stateDialog =true" class="fa fa-lock note-control-butoon"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除文章" placement="top">
                  <i @click="onDeleteNote" class="fa fa-trash-o note-control-butoon"></i>
                </el-tooltip>

                <div style="float: right">
                  <el-tooltip class="item" effect="dark" content="保存" placement="top">
                    <i @click="onNoteUpdateSave" class="fa fa fa-floppy-o note-control-butoon"></i>
                  </el-tooltip>


                  <i v-if="note.noteId" @click="onNoteReleaseSave"
                     class="fa fa fa-mail-forward note-control-butoon"><span>更新文章</span></i>
                  <i v-else @click="onNewNote" class="fa fa fa-mail-forward note-control-butoon"><span>发布文章</span></i>
                </div>
              </div>
              <textarea class="write-area-md" :value="note.content" @input="update"></textarea>
            </div>

            <div class="show-area" v-html="compiledMarkdown"></div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="权限设置"
      :visible.sync="stateDialog"
      width="30%">
      <el-radio v-model="note.state" label="1">私有</el-radio>
      <el-radio v-model="note.state" label="2">公开</el-radio>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>

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
          content: '',
          state: 1
        },
        currentBookId: '',
        books: [],
        notes: [],
        newBook: {
          name: '新书',
        },

        stateDialog: false,
      }
    },
    /* watch: {
       'note.stateProxy': 'stateParse',
     },*/
    mounted() {
      document.title = "记笔记";
      this.$store.commit('hideFoot');
    },
    computed: {
      compiledMarkdown: function () {
        let showTitle = (this.note.title == '') ? '' : '# ' + this.note.title + '\n';
        return marked(showTitle + this.note.content, {sanitize: true})
      }
    },
    created() {
      this.loadBookInfo();
    },
    methods: {
      onBack() {
        this.$router.push({name: 'Hello'})
      },
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
      onBookSelect(id) {
        console.log('onBookSelect');
        this.currentBookId = id;
        let userId = this.$store.state.userId;
        this.$http.get(`/users/${userId}/book/${id}`)
          .then(res => {
            this.notes = res.data.data;
          })
          .catch(err => {
            console.log(err)
          })
      },
      onNewNotebook() {
        this.$prompt('新笔记本名', '新建笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {

          let userId = this.$store.state.userId;
          let book = {
            name: value,
            userId: userId
          };

          this.$http.post(`/users/${userId}/book`, book)
            .then(res => {
              this.books.push({
                id: res.data.data,
                name: value,
                userId: userId
              });
              this.$message({
                type: 'success',
                message: '新建成功'
              });
            })
            .catch(err => {
              this.$message.error('好像出问题了');
            });
        }).catch(() => {
          this.$message.error('好像出问题了');
        });


      },
      onNoteSelect(item) {
        this.note = item;
        this.note.state = "" + item.state;
      },
      newNote() {
        let userId = this.$store.state.userId;
        this.note = {
          title: '',
          content: '',
          userId: userId,
          bookId: this.currentBookId
        };
      },
      onNewNote() {
        let userId = this.$store.state.userId;
        this.note.bookId = this.currentBookId;
        this.note.userId = userId;
        this.note.state = parseInt(this.note.state);

        this.$http.post(`/users/${userId}/note`, this.note)
          .then(res => {
            if (res.data.code == 200) {
              this.$message('发布成功');
              this.note.noteId = res.data.data;
              console.log(this.note)
              this.notes.push(this.note);
            }
            else
              this.$message.error('好像出问题了');
          })
          .catch(err => {
            this.$message.error('好像出问题了');
          })
      },
      onDeleteNote() {
        console.log('onDeleteNote')
        let userId = this.$store.state.userId;
        let noteId = this.note.noteId;
        this.$confirm('此操作将永久删除该笔记, 是否继续?', '删除笔记', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/users/${userId}/note/${noteId}`)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.notes.splice(this.notes.findIndex(item => item.noteId === this.note.noteId), 1);
                this.newNote();
              } else {
                this.$message({
                  type: 'info',
                  message: '删除失败'
                });
              }
            })
            .catch(err => {
              this.$message({
                type: 'info',
                message: '删除失败'
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onNoteUpdateSave() {
        let userId = this.$store.state.userId;
        let noteId = this.note.noteId;
        this.note.state = parseInt(this.note.state);
        this.$http.put(`/users/${userId}/note/${noteId}/stash`, this.note)
          .then(res => {
            if (res.data.code == 200)
              this.$message('保存成功');
            else
              this.$message.error('好像出问题了');
          })
          .catch(err => {
            this.$message.error('好像出问题了');
          })
      },
      onNoteReleaseSave() {
        let userId = this.$store.state.userId;
        let noteId = this.note.noteId;
        this.note.state = parseInt(this.note.state);
        this.$http.put(`/users/${userId}/note/${noteId}`, this.note)
          .then(res => {
            if (res.data.code == 200)
              this.$message('保存成功');
            else
              this.$message.error('好像出问题了');
          })
          .catch(err => {
            this.$message.error('好像出问题了');
          })
      },
      onDeleteNotebook(item) {
        this.$confirm('此操作将永久删除该笔记本, 是否继续?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let userId = this.$store.state.userId;
          debugger
          this.$http.delete(`/users/${userId}/book/${item.id}`)
            .then(res => {
              if (res.data.code == 200)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              else
                this.$message.error('好像出问题了');
            })
            .catch(err => {
              this.$message.error('好像出问题了');
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onRenameNotebook(item) {
        console.log(item)
        this.$prompt('新笔记本名', '修改笔记本名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          item.name = value;
          let userId = this.$store.state.userId;
          this.$http.put(`/users/${userId}/book/${item.id}`, item)
            .then(res => {
              if (res.data.code == 200)
                this.$message({
                  type: 'success',
                  message: '该笔记本已更名为: ' + value
                });
              else
                this.$message.error('好像出问题了');
            })
            .catch(err => {
              this.$message.error('好像出问题了');
            });
        }).catch(() => {
          this.$message.error('好像出问题了');
        });
      },
      update: _.debounce(function (e) {
        this.note.content = e.target.value
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
    border-bottom: 1px solid #d9d9d9;
  }

  .note-item-title {
    height: 90px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #d9d9d9;
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
