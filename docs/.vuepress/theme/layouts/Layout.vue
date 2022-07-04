<template>
  <Layout>
    <!-- <template v-slot:sidebar-top>
      <SidebarAd />
    </template> -->

    <template #page-bottom>
      <FooterAd />
    </template>
  </Layout>
</template>

<script>
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import SidebarAd from "./SidebarAd.vue";
import FooterAd from "./FooterAd.vue";

export default {
  components: {
    Layout,
    SidebarAd,
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
