<template>
  <Layout>
    <template v-slot:sidebar-top>
      <BybitAd />
    </template>

    <template #page-bottom>
      <FooterAd />
    </template>
  </Layout>
</template>

<script>
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import BybitAd from "./BybitAd.vue";
import FooterAd from "./FooterAd.vue";

export default {
  components: {
    Layout,
    BybitAd,
    FooterAd
  }
};
</script>

<style>
@font-face {
  font-family: ProximaNova-Regular;
  src: url('../font/webFonts/ProximaNovaRegular/font.woff');
}

body {
  font-family: ProximaNova-Regular;
}
</style>
