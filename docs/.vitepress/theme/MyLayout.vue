<template>
  <Layout>
    <!-- <template #aside-ads-before> -->
      <!-- <ApexPro/> -->
    <!-- </template> -->

    <!-- <template #layout-bottom> -->
     <!-- <BlackFriday/> -->
      <!-- <PremiumDiscount /> -->
      <!-- <Christmas /> -->
    <!-- </template> -->
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ApexPro from "./banners/ApexPro.vue";
import BlackFriday from "./banners/BlackFriday.vue";
import PremiumDiscount from "./banners/PremiumDiscount.vue";
import Christmas from "./banners/Christmas.vue";

const {Layout} = DefaultTheme
</script>

<style>
/* grid-4 at 960px+ is 4 columns; 19 features are not divisible by 3. Match grid-6 so home tiles stay 3 columns. */
.VPHome .VPHomeFeatures.VPFeatures .item.grid-4 {
  width: 100%;
}
@media (min-width: 640px) {
  .VPHome .VPHomeFeatures.VPFeatures .item.grid-4 {
    width: calc(100% / 2);
  }
}
@media (min-width: 768px) {
  .VPHome .VPHomeFeatures.VPFeatures .item.grid-4 {
    width: calc(100% / 3);
  }
}
@media (min-width: 960px) {
  .VPHome .VPHomeFeatures.VPFeatures .item.grid-4 {
    width: calc(100% / 3);
  }
}
</style>
