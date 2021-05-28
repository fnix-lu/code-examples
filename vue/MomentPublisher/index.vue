<template>
  <div class="moment-publisher">
    <!-- 标题区 -->
    <div class="publisher-header">
      <div class="title">动态，记录点滴生活！</div>
    </div>

    <!-- 编辑区 -->
    <div class="publisher-editor">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4 }"
        resize="none"
        placeholder="说点什么分享生活的点滴..."
        v-model="moment.text"
        :maxlength="1000"
      />
      <div class="data">
        <div class="data-tag" v-if="moment.topic">
          <svg-icon class="tag-icon" icon-class="topic"/>
          <span class="tag-text">{{ moment.topic && moment.topic.name }}</span>
          <i class="tag-del el-icon-error" @click="clearField('topic')"></i>
        </div>
        <div class="data-tag" v-if="moment.location">
          <svg-icon class="tag-icon" icon-class="location"/>
          <span class="tag-text">{{ moment.location.name }}</span>
          <i class="tag-del el-icon-error" @click="clearField('location')"></i>
        </div>
        <div class="data-tag" v-if="moment.publishedAt">
          <svg-icon class="tag-icon" icon-class="time"/>
          <span class="tag-text">{{ moment.publishedAt }}</span>
          <i class="tag-del el-icon-error" @click="clearField('publishedAt')"></i>
        </div>

        <div class="text-counter">
          <span class="count">{{ moment.text.length }}</span>/<span class="limit">1000</span>
        </div>
      </div>
    </div>

    <!-- 功能区 -->
    <div class="publisher-footer">
      <ul class="func-list">
        <li class="func-item">
          <func-image
            placement="bottom-start"
            v-model="moment.images"
            ref="funcImage"
            :before-trigger="beforeTrigger('image')"
          />
        </li>
        <li class="func-item">
          <func-video
            placement="bottom-start"
            :offset="-81"
            v-model="moment.video"
            ref="funcVideo"
            :before-trigger="beforeTrigger('video')"
          />
        </li>
        <li class="func-item">
          <func-topic
            placement="bottom-start"
            :offset="-162"
            v-model="moment.topic"
          />
        </li>
        <li class="func-item">
          <func-location
            placement="bottom-start"
            :offset="-243"
            v-model="moment.location"
          />
        </li>
        <li class="func-item">
          <func-time
            format="yyyy-MM-dd HH:mm"
            show-time
            v-model="moment.publishedAt"
          />
        </li>
      </ul>
      <el-select size="small" v-model="moment.publishedTo">
        <el-option :value="1" label="dhome和筑客小程序"></el-option>
        <el-option :value="2" label="dhome"></el-option>
        <el-option :value="3" label="筑客小程序"></el-option>
      </el-select>
    </div>

    <!-- 发布 -->
    <fixed-footer :show-protocol="false">
      <el-button type="primary" plain @click="preview">预览</el-button>
      <el-button type="primary" @click="publish" :disabled="!allowSubmit">发布</el-button>
    </fixed-footer>

    <!-- 预览 -->
    <func-preview
      :visible.sync="isPreviewVisible"
      :data="momentPreview"
    />
  </div>
</template>

<script>
import { saveMoment } from '@/api/moment-publisher'

export default {
  components: {
    FuncImage: () => import('./FuncImage'),
    FuncVideo: () => import('./FuncVideo'),
    FuncTopic: () => import('./FuncTopic'),
    FuncLocation: () => import('./FuncLocation'),
    FuncTime: () => import('./FuncTime'),
    FuncPreview: () => import('./FuncPreview'),
    FixedFooter: () => import('@/components/FixedFooter'),
  },
  data() {
    return {
      moment: {
        text: '',
        images: undefined,
        video: undefined,
        topic: undefined,
        location: undefined,
        publishedAt: undefined,
        publishedTo: 1,
      },
      isPreviewVisible: false,
      momentPreview: undefined
    }
  },
  computed: {
    allowSubmit() {
      return (
        this.moment.text
        || (this.moment.images && this.moment.images.length)
        || this.moment.video
      )
    }
  },
  methods: {
    // 清除字段
    clearField(name) {
      this.moment[name] = undefined
    },

    // 用于提交的数据格式
    getMomentSubmit() {
      let asyc = this.moment.publishedTo === 1
      let sourse = 1
      if (this.moment.publishedTo === 3) {
        sourse = 2
      }

      let kind = 1
      if (this.moment.video) {
        kind = 2
      }

      let medias
      if (this.moment.images && this.moment.images.length) {
        medias = this.moment.images.filter(file => !!file.response).map(file => file.response)
      } else if (this.moment.video && this.moment.video.response) {
        medias = [this.moment.video.response]
      }

      const location = this.moment.location || {}

      return {
        tenant: 1,
        sourse,
        asyc,
        kind,
        desc: this.moment.text,
        medias,
        topicId: this.topic && this.topic.id,
        city: location.cityname,
        address: location.name,
        addressName: location.address,
        lon: location.location && location.location.lng,
        lat: location.location && location.location.lat,
        createTime: this.moment.publishedAt
      }
    },

    // 用于预览的数据格式
    getMomentPreview() {
      const user = this.$store.state.user
      const momentSubmit = this.getMomentSubmit()

      return {
        user: {
          avatar: user.avatar,
          nickname: user.name
        },
        desc: this.moment.text,
        medias: momentSubmit.medias,
        mediaType: momentSubmit.kind,
        topic: this.moment.topic,
        time: this.moment.publishedAt
      }
    },

    preview() {
      this.momentPreview = this.getMomentPreview()
      this.isPreviewVisible = true
    },

    // 发布
    async publish() {
      if (!this.allowSubmit) return
      const res = await saveMoment(this.getMomentSubmit())
      if (res.code === 0) {
        this.$message.success({
          message: '动态发布成功',
          onClose: () => {
            this.$router.replace('/')
          }
        })
      }
    },

    beforeTrigger(func) {
      if (func === 'image') {
        return () => this.$refs.funcVideo.hide()
      }
      if (func === 'video') {
        return () => this.$refs.funcImage.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.moment-publisher {
  background: #fff;
  padding: 32px;
}

.publisher-header {
  margin-bottom: 24px;

  .title {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    color: #333333;
  }
}

.publisher-editor {
  border: 1px solid #EBEBEB;
  border-radius: 4px;
  background: #F8F8F8;
  padding: 16px 16px 0;

  ::v-deep .el-textarea__inner {
    border: none;
    background: transparent;
    padding: 0;
  }

  .data {
    margin-top: 8px;
    min-height: 28px;
  }
  .data-tag {
    display: inline-flex;
    align-items: center;
    margin-right: 16px;
    .tag-icon {
      font-size: 24px;
      color: #4D91F7;
    }
    .tag-text {
      font-size: 12px;
      color: #4D91F7;
      margin-left: 4px;
      margin-right: 8px;
    }
    .tag-del {
      font-size: 12px;
      color: #A8A8A8;
      cursor: pointer;
    }
  }
  .text-counter {
    font-size: 12px;
    color: #999999;
    float: right;
    .count {
      font-size: 16px;
      color: #4D91F7;
    }
    .limit {
      color: #687794;
    }
  }
}

.publisher-footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .func-list {
    display: flex;
    align-items: center;
    .func-item {
      & + .func-item {
        margin-left: 28px;
      }
    }
  }
}
</style>