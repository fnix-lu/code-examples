// 获取最大文本渲染宽度，用于根据文字最多的适应宽度
export function getMaxLabelWidth() {
  const elements = document.querySelectorAll('.chart-item-name')
  const widths = Array.prototype.map.call(elements, element => element.offsetWidth)
  this.maxLabelWidth = Math.max(...widths) + 1 + 'px'
}