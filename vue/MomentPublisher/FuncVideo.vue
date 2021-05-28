<template>
  <el-popover :placement="placement" :offset="offset" :value="visible" trigger="manual">
    <div slot="reference">
      <func-trigger svg-icon="video" text="视频" @click="trigger"/>
    </div>

    <div class="func-popper">
      <func-popper-header title="上传普通视频" @close="hide">
        <el-upload
          v-bind="config"
          :file-list="file ? [file] : []"
          :before-upload="beforeUpload"
          :on-progress="onProgress"
          :on-success="onSuccess"
          ref="upload">
          <el-button class="btn-reupload" type="text" ref="reupload">
            <svg-icon icon-class="refresh"/>重新上传
          </el-button>
        </el-upload>
      </func-popper-header>

      <div class="video-card" v-if="file">
        <video class="video-cover" :src="file.url"></video>
        <div class="video-info">
          <template v-if="file.status === 'uploading'">
            <div class="video-text">
              <span class="video-title">{{ file.name }}</span>
              <span class="video-percentage">上传{{ Math.floor(file.percentage) }}%</span>
            </div>
            <el-progress :percentage="Math.floor(file.percentage)" :show-text="false"/>
          </template>
          <template v-else>
            <div class="video-status">
              <span>恭喜视频上传成功</span>
              <i class="status-icon el-icon-success"></i>
            </div>
            <div class="video-title-small">{{ file.name }}</div>
          </template>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { getQiniuToken } from '@/api/moment-publisher'

export default {
  components: {
    FuncTrigger: () => import('./FuncTrigger'),
    FuncPopperHeader: () => import('./FuncPopperHeader'),
  },
  model: {
    prop: 'file',
    event: 'change'
  },
  props: {
    placement: String,
    offset: Number,
    file: Object,
    beforeTrigger: Function
  },
  data() {
    return {
      visible: false,
      config: {
        action: '//up.qiniu.com',
        data: {
          token: undefined
        },
        'show-file-list': false,
        'list-type': 'picture',
        accept: 'video/*'
      }
    }
  },
  created() {
    this.getToken()
  },
  methods: {
    // 获取七牛 token
    async getToken() {
      const res = await getQiniuToken()
      this.config.data.token = res.data.token
    },

    hide() {
      return new Promise(resolve => {
        if (this.file) {
          this.$confirm('确定放弃上传视频吗？').then(() => {
            this.$refs.upload.abort()
            this.$emit('change', undefined)
            this.visible = false
          })
        } else {
          this.visible = false
          resolve()
        }
      })
    },

    trigger() {
      if (typeof this.beforeTrigger === 'function') {
        this.beforeTrigger().then(() => {
          if (!this.visible) {
            this.$refs.reupload.$el.click()
          }
        })
      } else if (!this.visible) {
        this.$refs.reupload.$el.click()
      }
    },

    beforeUpload() {
      this.$refs.upload.abort()
    },

    // 上传过程
    onProgress(e, file) {
      this.$emit('change', file)
      if (!this.visible) {
        this.visible = true
      }
    },

    // 上传成功
    onSuccess(res, file) {
      this.$emit('change', file)
    },
  }
}
</script>

<style lang="scss" scoped>
.func-popper {
  width: 364px;
}

.btn-reupload {
  color: #687794;
  font-size: 12px;
  margin-right: 8px;
  padding: 0;
  .svg-icon {
    font-size: 24px;
    vertical-align: -8px;
  }
}

.video-card {
  display: flex;
  margin-top: 16px;
  .video-cover {
    width: 80px;
    height: 80px;
    border-radius: 2px;
    object-fit: cover;
  }
  .video-info {
    flex: 1;
    background: #F8F8F8;
    border-radius: 0 4px 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;
    .video-text {
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #565656;
      font-size: 14px;
      .video-title {
        width: 60%;
      }
    }
    .video-status {
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      color: #333333;
      .status-icon {
        font-size: 18px;
        margin-left: 8px;
        color: #66C76C;
      }
    }
    .video-title-small {
      color: #565656;
      font-size: 12px;
      line-height: 22px;
    }
  }
}
</style>