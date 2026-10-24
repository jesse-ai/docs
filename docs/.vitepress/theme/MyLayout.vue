<template>
  <Layout>
    <template #nav-bar-content-after>
      <ask-ai-button />
    </template>

    <template #aside-outline-after>
      <ExchangeAds />
    </template>

    <!-- <template #layout-bottom> -->
     <!-- <BlackFriday/> -->
      <!-- <PremiumDiscount /> -->
      <!-- <Christmas /> -->
    <!-- </template> -->
  </Layout>
  <!-- The hosted panel is a fixed floating window; it takes no page space. -->
  <ask-ai-panel />
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ExchangeAds from "./banners/ExchangeAds.vue";
import BlackFriday from "./banners/BlackFriday.vue";
import PremiumDiscount from "./banners/PremiumDiscount.vue";
import Christmas from "./banners/Christmas.vue";

const {Layout} = DefaultTheme
</script>

<style>
@font-face {
  font-family: 'BricolageGrotesque';
  src: url('./fonts/BricolageGrotesque.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Ubuntu Mono';
  src: url('./fonts/UbuntuMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

ask-ai-button,
ask-ai-panel {
  font-family: 'BricolageGrotesque', ui-sans-serif, system-ui, sans-serif;
}

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
