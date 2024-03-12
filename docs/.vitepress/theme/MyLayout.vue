<template>
  <Layout>
    <template #aside-ads-before>
      <ApexPro/>
    </template>

<!--    <template #layout-bottom>-->
<!--      <BlackFriday/>-->
<!--    </template>-->
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ApexPro from "./banners/ApexPro.vue";
import BlackFriday from "./banners/BlackFriday.vue";

const {Layout} = DefaultTheme
</script>
