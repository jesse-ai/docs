<template>
  <Layout>
    <!-- <template #aside-ads-before> -->
      <!-- <ApexPro/> -->
    <!-- </template> -->

    <template #layout-bottom>
     <!-- <BlackFriday/> -->
      <!-- <PremiumDiscount /> -->
      <Christmas />
    </template>
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
