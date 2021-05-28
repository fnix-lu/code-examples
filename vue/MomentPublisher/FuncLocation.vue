<template>
  <el-popover :placement="placement" :offset="offset" @after-enter="initMap" v-model="visible">
    <div slot="reference">
      <func-trigger svg-icon="location" text="定位"/>
    </div>

    <div class="func-popper">
      <func-popper-header @close="visible = false"/>

      <div class="map-wrapper">
        <div id="map-container"></div>
        <el-input
          id="map-input"
          class="map-search"
          suffix-icon="el-icon-search"
          placeholder="请输入想要搜索的地址"
          v-model="search"
        />
        <div id="map-output" class="map-result"></div>
      </div>

      <div class="map-footer">
        <el-button size="mini" @click="confirm">确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script>
export default {
  components: {
    FuncTrigger: () => import('./FuncTrigger'),
    FuncPopperHeader: () => import('./FuncPopperHeader'),
  },
  model: {
    prop: 'location',
    event: 'select'
  },
  props: {
    placement: String,
    offset: Number,
    location: Object
  },
  data() {
    return {
      visible: false,
      search: '',
      pickedLocation: undefined
    }
  },
  methods: {
    initMap() {
      if (!this.map) {
        const AMap = window.AMap

        this.map = new AMap.Map('map-container', {
          resizeEnable: true
        })

        // 插件
        AMap.plugin(['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
          // 定位
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonPosition: 'RB',
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true,
            extensions: 'all'
          })
          this.map.addControl(geolocation)
          geolocation.getCurrentPosition()

          // 输入提示
          const autoComplete = new AMap.Autocomplete({
            input: 'map-input',
            output: 'map-output'
          })

          // POI搜索
          const placeSearch = new AMap.PlaceSearch({
            map: this.map
          })

          // 定位结果
          AMap.event.addListener(geolocation, 'complete', (e) => {
            if (e.pois[0]) {
              placeSearch.search(e.pois[0].name)
            }
          })

          // 点击输入提示
          AMap.event.addListener(autoComplete, 'select', ({ poi }) => {
            placeSearch.search(poi.name)
          })

          // 点击点标记
          AMap.event.addListener(placeSearch, 'markerClick', ({ data }) => {
            console.log('markerClick', data)
            this.pickedLocation = data
          })
        })
      }
    },

    confirm() {
      if (this.pickedLocation) {
        this.$emit('select', this.pickedLocation)
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.func-popper {
  width: 688px;
}

.map-wrapper {
  position: relative;
}
#map-container {
  height: 254px;
  margin-top: 12px;
}
.map-search {
  position: absolute;
  left: 12px;
  top: 16px;
  width: 288px;
}
.map-result {
  position: absolute;
  left: 12px;
  top: 58px;
  min-width: 288px;
  background: #fff;
  border: 1px solid #d1d1d1;
  display: none;
  z-index: 161;
}

.map-footer {
  text-align: right;
  margin-top: 5px;
}
</style>