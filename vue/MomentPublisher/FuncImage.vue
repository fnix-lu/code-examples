<template>
  <el-popover :placement="placement" :offset="offset" :value="visible" trigger="manual">
    <div slot="reference">
      <func-trigger svg-icon="image" text="图片" @click="trigger"/>
    </div>

    <div class="func-popper">
      <func-popper-header title="上传图片" @close="hide"/>

      <div class="upload-count">共{{ fileList.length }}张，还可以上传<span class="limit">{{ limit - fileList.length }}</span>张</div>

      <!-- 图片列表 -->
      <div class="img-list">
        <div class="img-box" v-for="(file, i) in fileList" :key="i">
          <img class="img-item" :src="file.url">
          <div class="img-box-cover">
            <i class="img-del el-icon-close" @click="remove(i)"></i>
          </div>
          <el-progress v-if="file.status === 'uploading'" class="img-progress" :percentage="Math.floor(file.percentage)" :show-text="false"/>
        </div>

        <el-upload
          v-bind="config"
          :file-list="fileList"
          :on-progress="onProgress"
          :on-success="onSuccess"
          ref="upload"
          v-show="fileList.length < limit">
          <div class="img-upload" ref="imgUpload">
            <i class="el-icon-plus"></i>
          </div>
        </el-upload>
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
    prop: 'fileList',
    event: 'change'
  },
  props: {
    placement: String,
    offset: Number,
    fileList: {
      type: Array,
      default: () => []
    },
    beforeTrigger: Function
  },
  data() {
    return {
      visible: false,
      limit: 9,
      config: {
        action: '//up.qiniu.com',
        data: {
          token: undefined
        },
        'show-file-list': false,
        'list-type': 'picture',
        accept: 'image/jpeg, image/png'
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
        if (this.fileList && this.fileList.length > 0) {
          this.$confirm('确定放弃上传图片吗？').then(() => {
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
            this.$refs.imgUpload.click()
          }
        })
      } else if (!this.visible) {
        this.$refs.imgUpload.click()
      }
    },

    // 上传过程
    onProgress(e, file, list) {
      this.$emit('change', list)
      if (!this.visible) {
        this.visible = true
      }
    },

    // 上传成功
    onSuccess(res, file, list) {
      this.$emit('change', list)
    },

    // 移除图片
    remove(i) {
      const list = this.fileList.filter((file, index) => index !== i)
      this.$emit('change', list)
    }
  }
}
</script>

<style lang="scss" scoped>
.func-popper {
  width: 256px;
}

.upload-count {
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 12px;
  .limit {
    color: #4D91F7;
  }
}

.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: -8px;
  &::after {
    content: '';
    width: 80px;
  }
}
.img-box {
  margin-top: 8px;
  width: 80px;
  height: 80px;
  position: relative;
  &:hover {
    .img-box-cover {
      display: block;
    }
  }
  .img-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .img-progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    ::v-deep {
      .el-progress-bar__outer,
      .el-progress-bar__inner {
        border-radius: 0;
      }
    }
  }
}
.img-box-cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #333333, $alpha: 0.68);
  display: none;
  .img-del {
    width: 24px;
    height: 24px;
    background: rgba($color: #333333, $alpha: 0.32);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #D8D8D8;
    cursor: pointer;
  }
}
.img-upload {
  margin-top: 8px;
  width: 80px;
  height: 80px;
  border: 2px dashed #D8D8D8;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 20px;
    color: #999999;
  }

  &:hover {
    border-color: #4D91F7;
    i {
      color: #4D91F7;
    }
  }
}
</style>