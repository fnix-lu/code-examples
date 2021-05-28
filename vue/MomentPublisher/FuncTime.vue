<template>
  <el-popover :placement="placement" :offset="offset" @show="init" v-model="visible">
    <div slot="reference">
      <func-trigger svg-icon="time" text="时间"/>
    </div>

    <div class="func-popper">
      <el-date-panel ref="elDatePanel" @pick="pick"/>
      <div class="date-panel-footer">
        <el-button size="mini" @click="confirm">确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { formatDate } from 'element-ui/src/utils/date-util'

export default {
  components: {
    FuncTrigger: () => import('./FuncTrigger'),
    ElDatePanel: () => import('element-ui/packages/date-picker/src/panel/date'),
  },
  model: {
    prop: 'date',
    event: 'change'
  },
  props: {
    placement: String,
    offset: Number,
    date: String,
    format: String,
    showTime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      pickedDate: undefined
    }
  },
  methods: {
    init() {
      const elDatePanel = this.$refs.elDatePanel
      elDatePanel.visible = true
      elDatePanel.value = this.date && new Date(this.date) || new Date()
      elDatePanel.format = this.format
      elDatePanel.showTime = this.showTime

      this.pickedDate = formatDate(elDatePanel.value, this.format)
    },

    pick(date) {
      const elDatePanel = this.$refs.elDatePanel
      elDatePanel.value = date
      this.pickedDate = formatDate(date, this.format)
    },

    confirm() {
      this.$emit('change', this.pickedDate)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.func-popper {
  margin: -12px;
}

.el-picker-panel {
  border: none;
  box-shadow: none;
  ::v-deep .el-picker-panel__footer {
    display: none;
  }
}

.date-panel-footer {
  text-align: right;
  padding: 0 10px 10px;
  margin-top: -5px;
}
</style>