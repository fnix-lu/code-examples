<template>
  <div class="feed-container">
    <div class="user-content">
      <img :src="item.user.avatar" alt="" srcset="" class="avatar" />
      <span>
        <div class="name">{{item.user.nickname}}</div>
        <div class="info">{{item.user.position}}</div>
      </span>
    </div>
    <div
      class="desc"
      :class="{'contentBreak': !isOpened}"
    >
      {{ item.desc }}
      <div class="more-btn" v-if="!isOpened" :class="{ showDot: !isOpened }" @click="onMore">
        <span>全文</span>
      </div>
    </div>

    <div class="images" v-if="item.medias && item.medias.length > 0">
      <!-- 图片动态 -->
      <template v-if="item.mediaType === 1">
        <div
          class="image-item"
          v-for="(imageItem, index) in item.medias"
          :key="imageItem + index"
          :style="index > 2 && imagesFolded ? 'display:none' : ''"
        >
          <img class="image" :src="imageItem.url"/>
          <div v-if="imagesFolded && index == 2" class="cover">
            +{{ item.medias.length - 2 }}
          </div>
        </div>
      </template>

      <!-- 视频动态 -->
      <template v-if="item.mediaType === 2">
        <video
          class="video-item"
          v-for="video in item.medias"
          :key="video.key"
          :src="video.originalUrl"
          controls
        />
      </template>
    </div>

    <!-- 转发动态 -->
    <template v-if="item.mediaType === 3">
      <div class="forward-feed" v-if="item.transpond" @click="goForwardFeed">
        <div>@{{ item.transpond.user.name }}</div>
        <div class="forward-feed-content">
          <img class="forward-feed-avatar" :src="item.transpond.user.avatar">
          <div class="forward-feed-text">{{ item.transpond.desc }}</div>
        </div>
      </div>
    </template>

    <div class="label-container" v-if="item.topic">
      <span class="label">
        <span class="sign">#</span>
        {{item.topic.name}}
      </span>
      <span class="time">{{item.time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        user: {}
      }),
    },
    imagesFolded: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isOpened: false,
    };
  },

  mounted() {
    console.log(this.item)
  },

  created() {
    let fontSize = 14,
      padding = 32,
      moreButtonWidth = 85;
    this.$nextTick(function () {
      // 计算是否展示点点点的问题
      let str = this.item.desc;
      // 展示区宽度
      let width = document.body.clientWidth - padding;
      // 总字数
      let strNum = Math.floor(this.getStrLength(str) / 2);
      // 每行可容纳的字数
      let rowStrNum = Math.floor(width / fontSize);
      // 总行数
      let totalRows = strNum / rowStrNum;
      // 最后一行的字数
      let lastRowStrNum = strNum % rowStrNum;
      // 最后一行字数的宽度
      let lastRowStrWidth = lastRowStrNum * fontSize;
      // 最后一行除更多以外的空间(可展示文字的空间)
      let lastRowSpace = width - moreButtonWidth;

      if (totalRows > 3 || lastRowStrWidth > lastRowSpace) {
          this.isOpened = false;
        }else {
          this.isOpened = true;
        }
    });
  },

  methods: {
    /**
     * 计算字符的长度
     */
    getStrLength(str = '') {
      //先把中文替换成两个字节的英文，在计算长度
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
    },

    onMore() {
        this.isOpened = true
    },

    /* preview(index,medias) {
        let urls = medias.map(media => {
            return media.originalUrl
        })
        wx.previewImage({
            current:urls[index],
            urls
        })
    }, */

    goForwardFeed () {
      const url = this.item.transpond.url
      if (url) {
        this.$router.push(url)
      }
    }
  },
};
</script>

<style scoped>
.feed-container {
  padding: 25px 0;
  border-bottom: 1px solid #f5f5f5;
}
.user-content {
  display: flex;
}

.user-content .avatar {
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  margin-right: 12px;
}

.user-content .avatar::after {
  position: absolute;
  content: " ";
  bottom: 2px;
  width: 16px;
  height: 16px;
  right: 16px;
}

.desc {
  margin-top: 16px;
  font-size: 14px;
  color: #222222;
  line-height: 21px;
  overflow: hidden;
  position: relative;
}

.desc.contentBreak {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.name {
  font-size: 16px;
  font-weight: 500;
  color: #222222;
  line-height: 22px;
}

.info {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
}

.images {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}

.images .image-item {
  position: relative;
  width: calc((375px - 14px - 32px) / 3);
  height: calc((375px - 14px - 32px) / 3);
  background: #d8d8d8;
  display: inline-block;
  background: #d8d8d8;
  border-radius: 5px;
  margin-right: 7px;
  margin-top: 7px;
  overflow: hidden;
}

.images .video-item {
  width: 227px;
  margin-top: 7px;
}

.image-item .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-item .cover {
  position: absolute;
  content: " ";
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  line-height: calc((375px - 14px - 32px) / 3);
  font-size: 20px;
}

.image-item:nth-of-type(3n) {
  margin-right: 0;
}

.label-container {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  height: 26px;
  color: #4d91f7;
  line-height: 26px;
  max-width: 158px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  padding: 0 12px;
  background: #f3f8ff;
  border-radius: 15px;
}

.label .sign {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #ffffff;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
}

.time {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
}

.more-btn {
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 0px;
  bottom: -1px;
  width: 85px;
  line-height: 20px;
  font-size: 14px;
}

.showDot:before {
  display: block;
  content: "";
  width: 40px;
  height: 20px;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 1)
  );
  background: -o-linear-gradient(
    right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 1)
  );
  background: -moz-linear-gradient(
    right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 1)
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 1)
  );
}

.more-btn span {
  flex: 1;
  padding-left: 12px;
  color: #4D91F7;
  background: #fff;
}

.setHeight {
  height: 80px;
  overflow-x: hidden;
}

.forward-feed {
  background: #F5F5F5;
  border-radius: 5px;
  padding: 10px;
  margin-top: 13px;
}
.forward-feed-content {
  display: flex;
  align-items: center;
  margin-top: 4px;
}
.forward-feed-avatar {
  width: 44px;
  height: 44px;
  margin-right: 8px;
  flex-shrink: 0;
}
.forward-feed-text {
  line-height: 17px;
  height: 34px;
  overflow: hidden;
}
</style>
