const { path } = require('@vuepress/utils')

module.exports = {
    name: 'vuepress-theme-foo',
    extends: '@vuepress/theme-default',
    layouts: {
        Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
        404: path.resolve(__dirname, 'layouts/404.vue'),
    },
}
