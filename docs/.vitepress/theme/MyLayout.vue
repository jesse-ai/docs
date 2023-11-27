<script setup>
import DefaultTheme from 'vitepress/theme'
import {ref, onMounted} from 'vue'

const {Layout} = DefaultTheme
const showBanner = ref(true)

function closeBanner() {
  showBanner.value = false;
  localStorage.setItem('hideBannerBlackFriday2023', 'true');
}

onMounted(() => {
  if (localStorage.getItem('hideBannerBlackFriday2023') === 'true') {
    showBanner.value = false;
  }
});
</script>

<template>
  <Layout>
    <!-- <template #layout-bottom>
      <div v-show="showBanner" class="sticky-banner" role="contentinfo" aria-label="Discount banner">
        <img src="../../public/imgs/b-01.svg"
             alt="Jesse logo" width="90"
             class="logo">

        <div class="action-section">
          <a href="https://jesse.trade/pricing" target="_blank" rel="noopener noreferrer" aria-label="Get it now"
             class="uppercase gradient">
            63% BLACK FRIDAY DISCOUNT
          </a>
          <span>Get your lifetime live trading plug-in license</span>

          <a href="https://jesse.trade/pricing" target="_blank" rel="noopener noreferrer" aria-label="Get it now"
             class="button">
            <span>GET IT NOW →</span>
          </a>
        </div>

        <button @click="closeBanner" class="close-button" aria-label="Close banner">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <title>Close banner</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template> -->
  </Layout>
</template>
<style scoped>
.sticky-banner {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to right, #1c1c1c, #363636);
  color: white;
  text-align: center;
  padding: 1rem 0;
  z-index: 1000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 30px;
  border-top: 3px solid #5d5d5d;

  @media only screen and (max-width: 768px) {
    /* adjust the value based on your needs */
    flex-direction: column; /* stack items vertically */
    gap: 15px; /* reduce the gap for smaller screens */
  }
}

.logo {
  @media only screen and (max-width: 768px) { /* adjust the value based on your needs */
    display: none;
  }
}

.sticky-banner .gradient {
  background: linear-gradient(to right, #FF512F, #DD2476); /* Gradient Red */
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold; /* Makes the text bold */
  font-size: 1.4em; /* Makes the text 20% larger */
}

.sticky-banner .button {
  background: linear-gradient(to right, #FF512F, #DD2476); /* Gradient Red */
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 20px; /* Makes the button rounded */
  display: flex; /* To align text and icon */
  align-items: center; /* Vertically align the elements */
  justify-content: center; /* Horizontally align the elements */
  gap: 5px; /* Space between text and icon */
  font-size: 0.8em; /* Smaller font size */
  font-weight: bold; /* Bold font */
  text-transform: uppercase; /* Uppercase text */
  transition: background 0.3s ease; /* For a smooth transition */

  @media only screen and (max-width: 768px) {
    /* adjust the value based on your needs */
    display: block;
    width: 100%;
  }
}

.sticky-banner .button:hover {
  background: linear-gradient(to left, #FF512F, #DD2476); /* Gradient Red */
}

.icon {
  height: 1em;
}


.action-section {
  display: flex;
  align-items: center;
  gap: 1em;

  @media only screen and (max-width: 768px) {
    /* adjust the value based on your needs */
    flex-direction: column; /* stack items vertically */
    gap: 15px; /* reduce the gap for smaller screens */
  }
}

.sticky-banner .button:hover {
  background: linear-gradient(to left, #FF512F, #DD2476); /* Gradient Red */
}

/* Close button style */
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
