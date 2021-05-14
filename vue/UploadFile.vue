<template>
  <div>
    <div class="mode-picture">
      <!-- 视频图片列表 -->
      <div
        v-for="(file, i) in fileList"
        :key="i"
        class="media-item">
        <img :src="file.url">

        <div class="media-item-actions">
          <i class="el-icon-zoom-in"></i>
          <i class="el-icon-delete" @click="removeFile(i)"></i>
        </div>
      </div>

      <!-- 上传 -->
      <el-upload
        v-bind="config"
        :accept="accept"
        :file-list="fileList"
        :limit="limit"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        v-show="!limit || fileList.length < limit">
        <div class="upload-trigger">
          <i class="el-icon-plus"></i>
        </div>
      </el-upload>
    </div>
    <slot name="tip">
      <div class="el-upload__tip" v-if="tip">{{ tip }}</div>
    </slot>
  </div>
</template>

<script>
import { getApiQiniuToken } from '@/api/common'

export default {
  props: {
    accept: String,
    fileList: {
      type: Array,
      default: () => []
    },
    limit: Number,
    tip: String
  },
  data() {
    return {
      config: {
        action: 'http://up.qiniu.com',
        data: {
          token: undefined
        },
        'show-file-list': false,
        'list-type': 'picture'
      }
    }
  },
  methods: {
    // 上传前
    beforeUpload(file) {
      return new Promise(async (resolve, reject) => {
        const res = await getApiQiniuToken()
        if (res.code === 0) {
          this.config.data.token = res.data
          resolve()
        } else {
          reject()
        }
      })
    },

    // 上传成功
    onSuccess(res, file, list) {
      this.$emit('update:fileList', list)
    },

    // 移除文件
    removeFile(i) {
      const list = this.fileList.filter((file, index) => index !== i)
      this.$emit('update:fileList', list)
    }
  }
}
</script>

<style lang="scss" scoped>
.mode-picture {
  display: flex;
  flex-wrap: wrap;
}

.media-item {
  position: relative;
  margin-right: 10px;
  img {
    display: block;
    width: 80px;
    height: 80px;
    object-fit: cover;
    background: #f7f8fa;
  }
}
.media-item-actions {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  display: none;
  align-items: center;
  justify-content: space-evenly;
  i {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
  .media-item:hover & {
    display: flex;
  }
}

.upload-trigger {
  width: 80px;
  height: 80px;
  background: #f7f8fa;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon-plus {
    font-size: 24px;
    color: #999;
  }
}
</style>
