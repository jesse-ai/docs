<template>
  <Layout>
    <template #page-bottom />
  </Layout>
</template>

<script>
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";

export default {
    components: {
        Layout
    }
};
</script>

<style >
@font-face {
  font-family: ProximaNova-Regular;
  src: url('../font/webFonts/ProximaNovaRegular/font.woff');
}
body {
  font-family: ProximaNova-Regular;
}
</style>