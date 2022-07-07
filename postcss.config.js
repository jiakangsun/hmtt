module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue 设置设计稿量出的尺寸除以多少 设置基准字体大小
      rootValue ({ file }) {
        // 只有我们自己写的样式才除以75转换成rem  其他的vant的内置央视 github mardown样式除以37.5  因为我们自己设计稿的宽度就是750
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      // propList设置有哪些样式属性  比如width height *通配
      propList: ['*']
      // 排除 exclude：’github-markdown
    }
  }
}
