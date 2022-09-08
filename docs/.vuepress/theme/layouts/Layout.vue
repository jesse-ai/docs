<template>
  <Layout>
    <template v-slot:sidebar-top>
      <BitgetAd />
    </template>

    <template #page-bottom>
      <FooterAd />
    </template>
  </Layout>
</template>

<script>
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import BitgetAd from "./BitgetAd.vue";
import FooterAd from "./FooterAd.vue";

export default {
  components: {
    Layout,
    BitgetAd,
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
