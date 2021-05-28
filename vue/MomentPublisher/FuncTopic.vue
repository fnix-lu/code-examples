<template>
  <el-popover :placement="placement" :offset="offset" @show="init" v-model="visible">
    <div slot="reference">
      <func-trigger svg-icon="topic" text="话题"/>
    </div>

    <div class="func-popper">
      <func-popper-header title="添加话题可获得更多曝光机会" @close="visible = false"/>

      <!-- 话题分类 -->
      <div class="topic-tabs">
        <ul class="tab-list">
          <li
            v-for="kind in visibleKinds"
            :key="kind.id"
            :class="{ active: activeKindId === kind.id }"
            @click="clickKind(kind.id)">
            <span>{{ kind.name }}</span>
          </li>
        </ul>
        <ul class="tab-page">
          <li :class="[{ disabled: kindPage <= 1 }, 'el-icon-caret-left']" @click="changeKindPage(-1)"></li>
          <li :class="[{ disabled: kindPage >= kindPageTotal }, 'el-icon-caret-right']" @click="changeKindPage(1)"></li>
        </ul>
      </div>

      <!-- 话题列表 -->
      <div class="topic-list">
        <el-scrollbar v-if="topicList.length" :key="activeKindId" v-loading="loading">
          <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="disabled">
            <li
              v-for="topic in topicList"
              :key="topic.id"
              class="topic-item"
              @click="selectTopic(topic)">
              <span class="topic-title ellipsis" :title="`#${topic.name}#`">#{{ topic.name }}#</span>
              <span class="topic-data">
                <span>{{ topic.commentNumber }}讨论</span>
                <span>{{ topic.readNumber }}阅读</span>
              </span>
            </li>
          </ul>
        </el-scrollbar>
        <div v-else-if="!loading" class="empty-tip">无此分类的话题</div>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { getTopicKinds, getTopicsOfKind } from '@/api/moment-publisher'

export default {
  components: {
    FuncTrigger: () => import('./FuncTrigger'),
    FuncPopperHeader: () => import('./FuncPopperHeader'),
  },
  model: {
    prop: 'topic',
    event: 'select'
  },
  props: {
    placement: String,
    offset: Number,
    topic: Object
  },
  data() {
    return {
      visible: false,
      allKinds: [],
      kindPage: 1,
      kindPageSize: 5,
      activeKindId: undefined,
      topicList: [],
      topicPage: 1,
      loading: false,
      noMore: false
    }
  },
  computed: {
    kindPageTotal() {
      return Math.ceil(this.allKinds.length / this.kindPageSize)
    },
    visibleKinds() {
      const begin = this.kindPageSize * (this.kindPage - 1)
      const end = this.kindPageSize * this.kindPage
      return this.allKinds.slice(begin, end)
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    async init() {
      await this.getKinds()
      this.getTopics(1)
    },

    // 获取所有话题分类
    getKinds() {
      return new Promise(resolve => {
        getTopicKinds().then(res => {
          if (res.code === 0) {
            this.allKinds = res.data
            this.activeKindId = res.data[0] && res.data[0].id
            resolve()
          }
        })
      })
    },

    // 话题分类翻页
    changeKindPage(val) {
      if (val < 0 && this.kindPage > 1) {
        this.kindPage -= 1
      } else if (val > 0 && this.kindPage < this.kindPageTotal) {
        this.kindPage += 1
      }
    },

    // 点击分类
    clickKind(id) {
      this.activeKindId = id
      this.noMore = false
      this.getTopics(1)
    },

    // 获取分类下的话题 分页
    async getTopics(page) {
      const params = {
        id: this.activeKindId,
        page
      }
      if (page === 1) {
        this.topicList = []
      }
      this.loading = true
      const res = await getTopicsOfKind(params)
      this.loading = false
      if (res.code === 0) {
        const data = res.data || []
        this.noMore = !data.length
        if (page === 1) {
          this.topicPage = page
          this.topicList = data
        } else if (page > 1 && data.length > 0) {
          this.topicPage = page
          this.topicList = this.topicList.concat(data)
        }
      }
    },

    // 加载更多
    loadMore() {
      this.getTopics(this.topicPage + 1)
    },

    // 选择话题
    selectTopic(topic) {
      this.$emit('select', topic)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.func-popper {
  width: 400px;
}

.topic-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  .tab-list {
    display: flex;
    li {
      height: 32px;
      box-sizing: border-box;
      border-bottom: 2px solid transparent;
      font-size: 12px;
      color: #666666;
      line-height: 30px;
      padding: 0 10px;
      cursor: pointer;
      &.active {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        border-bottom-color: #4D91F7;
        background: #F8F8F8;
      }
    }
  }
  .tab-page {
    display: flex;
    li {
      font-size: 18px;
      cursor: pointer;
      color: #4D91F7;
      &.disabled {
        color: #D8D8D8;
        cursor: default;
      }
      & + li {
        margin-left: 16px;
      }
    }
  }
}

.empty-tip {
  color: #999999;
  font-size: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topic-list {
  margin-top: 16px;
  margin-left: -12px;
  margin-right: -12px;
  height: 280px;

  .el-scrollbar {
    height: 100%;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  .topic-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    height: 28px;
    padding: 0 12px;
    cursor: pointer;
    &:hover {
      background: #F8F8F8;
      .topic-title {
        color: #4D91F7;
      }
      .topic-data {
        color: #4D91F7;
      }
    }
    .topic-title {
      color: #333333;
      flex: 1;
    }
    .topic-data {
      color: #999999;
      span {
        display: inline-block;
        width: 70px;
        text-align: right;
      }
    }
  }
}
</style>