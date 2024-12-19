<script setup>
import {onMounted, ref} from 'vue'

const showBanner = ref(true)
const bannerName = 'hideBannerChristmas2024'
 
function closeBanner() {
  showBanner.value = false;
  localStorage.setItem(bannerName, 'true');
}

onMounted(() => {
  if (localStorage.getItem(bannerName) === 'true') {
    showBanner.value = false;
  }
});
</script>

<template>
  <div v-show="showBanner" class="sticky-banner" role="contentinfo" aria-label="Christmas discount banner">
    <img src="../../../public/imgs/b-01.svg"
         alt="Jesse logo" width="90"
         class="logo">

    <div class="action-section">
      <a href="https://jesse.trade/pricing" target="_blank" rel="noopener noreferrer" aria-label="Get it now"
         class="uppercase">
        🎄 <span class="gradient">CHRISTMAS SPECIAL - 40% OFF</span> 🎅
      </a>
      <span>✨ Give yourself the gift of algo-trading 🎁</span>

      <a href="https://jesse.trade/pricing" target="_blank" rel="noopener noreferrer" aria-label="Get it now"
         class="button">
        <span>CLAIM OFFER →</span>
      </a>
    </div>

    <button @click="closeBanner" class="close-button" aria-label="Close banner">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
           class="icon">
        <title>Close banner</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.sticky-banner {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to right, #1c3427, #2c5043);  /* Christmas green theme */
  color: white;
  text-align: center;
  padding: 1rem 0;
  z-index: 1000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 30px;
  border-top: 3px solid #3d7a5f;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
}

.logo {
  @media only screen and (max-width: 768px) {
    display: none;
  }
}

.sticky-banner .gradient {
  background: linear-gradient(to right, #ff1f1f, #ff4242);  /* Christmas red */
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  font-size: 1.4em;
}

.sticky-banner .button {
  background: linear-gradient(to right, #ff1f1f, #ff4242);  /* Christmas red */
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.3s ease;

  @media only screen and (max-width: 768px) {
    display: block;
    width: 100%;
  }
}

.sticky-banner .button:hover {
  background: linear-gradient(to left, #ff1f1f, #ff4242);
}

.icon {
  height: 1em;
}

.action-section {
  display: flex;
  align-items: center;
  gap: 1em;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
}

.close-button {
  background: none;
  border: none;
  color: white;
  transition: background 0.3s ease;
}

.close-button:hover {
  background: rgba(136, 136, 136, 0.5);
  border-radius: 100%;
}

.close-button .icon {
  height: 30px;
  width: 30px;
}
</style> 