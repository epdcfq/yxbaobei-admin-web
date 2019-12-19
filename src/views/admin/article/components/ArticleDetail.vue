<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          保存草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!--<Warning />-->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label-width="50px" label="摘要:">
            <el-input v-model="postForm.summary" :rows="1" type="textarea" class="article-textarea" autosize placeholder="摘要信息" maxlength="100" />
            <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}/100字</span>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item prop="body" style="margin-bottom: 30px;">
            <Tinymce ref="editor" v-model="postForm.content.body" :height="400" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item prop="focus" style="margin-bottom: 30px;">
            <Upload v-model="postForm.focus" />
          </el-form-item>
        </el-row>

        <el-row>
          <div class="postInfo-container">
            <el-row>
              <el-col :span="8">
                <el-form-item label-width="60px" label="作者:" class="postInfo-container-item">
                  <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="Search user">
                    <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label-width="100px" label="发布时间:" class="postInfo-container-item">
                  <el-date-picker v-model="displayTime" type="published_time" format="yyyy-MM-dd HH:mm" placeholder="选择发布时间" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label-width="90px" label="推荐星级:" class="postInfo-container-item">
                  <el-rate
                    v-model="postForm.imp_star"
                    :max="5"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    :low-threshold="1"
                    :high-threshold="5"
                    style="display:inline-block"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
// import { validURL } from '@/utils/validate'
import { fetchArticle, createArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  summary: '', // 文章摘要
  source_uri: '', // 文章外链
  focus: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  imp_star: 0,
  content: {
    body: ''
  }
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        console.log(rule)
        this.$message({
          message: this.validField[rule.field] + '为必填项',
          type: 'error'
        })
        return callback(new Error(this.validField[rule.field] + '为必填项'))
      } else {
        callback()
      }
    }
    // const validateSourceUri = (rule, value, callback) => {
    //   if (value) {
    //     if (validURL(value)) {
    //       callback()
    //     } else {
    //       this.$message({
    //         message: '外链url填写不正确',
    //         type: 'error'
    //       })
    //       callback(new Error('外链url填写不正确'))
    //     }
    //   } else {
    //     callback()
    //   }
    // }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      validField: { 'title': '标题', 'body': '内容', 'focus': '图片', 'source_uri': '来源' },
      rules: {
        title: [{ validator: validateRequire }],
        body: [{ validator: validateRequire }]
        // focus: [{ validator: validateRequire }]
        // source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.summary.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    goArticleList(query) {
      if (query === 'undefined') {
        query = {}
      }
      this.$router.push({ name: 'article_list', query: query })
    },
    // [编辑] 获取文章内容
    fetchData(id) {
      fetchArticle(id).then(response => {
        if (response.code !== 200) {
          this.$message({
            message: response.message,
            type: 'warning'
          })
          this.goArticleList()
          return false
        }
        // 设置文章
        this.postForm = response.data
        // 内容为空兼容处理
        if (this.postForm.content === null) {
          this.postForm.content = { body: [] }
        }

        this.postForm.focus = response.data.focus_url
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        this.goArticleList()
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.loading) {
            this.$message({
              message: '正在保存,请稍等...',
              type: 'warning'
            })
            return false
          }

          this.loading = true
          this.postForm.status = 'published'

          createArticle(this.postForm).then(response => {
            this.$notify({
              title: '操作结果',
              message: response.message,
              type: 'success',
              duration: 2000
            })
            // 跳转列表页
            this.goArticleList()

            this.loading = false
          }).catch(err => {
            console.log(err)
          })
          setTimeout(() => {
            this.loading = false
          }, 5000)
        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.body.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";

    .createPost-container {
        position: relative;

        .createPost-main-container {
            padding: 40px 45px 20px 50px;

            .postInfo-container {
                position: relative;
                @include clearfix;
                margin-bottom: 10px;

                .postInfo-container-item {
                    float: left;
                }
            }
        }

        .word-counter {
            width: 80px;
            position: absolute;
            right: 10px;
            top: 0px;
        }
    }

    .article-textarea /deep/ {
        textarea {
            padding-right: 20px;
            resize: none;
            border: none;
            border-radius: 0px;
            border-bottom: 1px solid #bfcbd9;
        }
    }
</style>
