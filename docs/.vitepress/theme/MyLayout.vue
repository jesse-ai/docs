<template>
  <div class="docs-shell">
  <CollapsableLayout
    show-right-below-lg
    right-starts-closed
    right-sticky
    stick-top="0px"
    :should-collapse-right="!open"
    right-expand-width="min(26rem, 100vw)"
    right-collapse-width="0px"
    main-class="min-w-0 flex-1"
  >
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
    <template #right>
      <ask-ai-panel />
    </template>
  </CollapsableLayout>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import CollapsableLayout from '@ui/components/CollapsableLayout.vue'
import ExchangeAds from "./banners/ExchangeAds.vue";
import BlackFriday from "./banners/BlackFriday.vue";
import PremiumDiscount from "./banners/PremiumDiscount.vue";
import Christmas from "./banners/Christmas.vue";

const {Layout} = DefaultTheme
const open = ref(false)

function onAskAi(event) {
  open.value = Boolean(event.detail?.open)
}

onMounted(() => window.addEventListener('jesse-ask-ai', onAskAi))
onBeforeUnmount(() => window.removeEventListener('jesse-ask-ai', onAskAi))
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

ask-ai-panel {
  display: block;
  height: 100%;
  min-height: 0;
}

/* VitePress pins the nav, sidebar, and "On this page" column to the viewport.
   While the chat rail is open, keep those bars inside the shrinking main column. */
.docs-shell .VPNav {
  left: 0 !important;
  width: auto !important;
  right: 0;
  transition: right 400ms ease-out;
}

.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-open='true']) .VPNav,
.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-closing='true']) .VPNav {
  right: min(26rem, 100vw) !important;
}

.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-open='true']) .VPContent.has-sidebar,
.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-closing='true']) .VPContent.has-sidebar {
  padding-left: var(--vp-sidebar-width) !important;
  padding-right: 0 !important;
}

.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-open='true']) .VPSidebar,
.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-closing='true']) .VPSidebar {
  width: var(--vp-sidebar-width) !important;
  max-width: var(--vp-sidebar-width) !important;
  padding-left: 32px !important;
}

.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-open='true']) .VPDoc .container,
.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-closing='true']) .VPDoc .container,
.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-open='true']) .VPDoc .content,
.docs-shell:has(.collapsable-layout-rail[data-side='right'][data-closing='true']) .VPDoc .content {
  min-width: 0 !important;
}

.docs-shell .collapsable-layout-rail[data-side='right'] {
  z-index: 31;
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
