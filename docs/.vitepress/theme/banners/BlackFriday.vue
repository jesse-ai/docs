<script setup>
import {onMounted, ref} from 'vue'

const showBanner = ref(true)
const bannerName = 'hideBannerBlackFriday2025'

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
  <div v-show="showBanner" class="sticky-banner" role="contentinfo" aria-label="Discount banner">
    <div class="banner-content">
      <img src="../../../public/imgs/b-01.svg"
           alt="Jesse logo" 
           class="logo">

      <div class="content-wrapper">
        <div class="discount-badge">
          <div class="badge-inner">
            <span class="discount-value">50% OFF</span>
            <span class="badge-label">BLACK FRIDAY</span>
          </div>
        </div>

        <div class="text-section">
          <h3 class="main-text">Limited Time Offer!</h3>
          <p class="sub-text">Get your lifetime license now</p>
        </div>

        <a href="https://jesse.trade/pricing" 
           target="_blank" 
           rel="noopener noreferrer" 
           aria-label="Get it now"
           class="cta-button">
          <span class="button-text">CLAIM DISCOUNT</span>
          <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </a>
      </div>

      <button @click="closeBanner" class="close-button" aria-label="Close banner">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <title>Close banner</title>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.sticky-banner {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1b2e 50%, #1a1a1a 75%, #0f0f0f 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  color: white;
  z-index: 1000;
  box-shadow: 0 -10px 40px rgba(255, 81, 47, 0.15);
  border-top: 2px solid transparent;
  border-image: linear-gradient(90deg, #FF512F, #DD2476, #FF512F);
  border-image-slice: 1;
  animation: slideUp 0.6s ease-out;
}

.banner-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.logo {
  width: 120px;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.1));
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1) rotate(5deg);
}

.content-wrapper {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  flex: 1;
  justify-content: center;
}

.discount-badge {
  background: linear-gradient(135deg, #FF512F 0%, #DD2476 100%);
  padding: 3px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(255, 81, 47, 0.4);
}

.discount-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 3px;
  background: linear-gradient(135deg, #FF512F, #DD2476, #FF512F);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.badge-inner {
  background: linear-gradient(135deg, #1a0a0f 0%, #2d1520 100%);
  padding: 0.8rem 1.5rem;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  position: relative;
  z-index: 1;
}

.discount-value {
  font-size: 1.8rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FF512F 0%, #DD2476 50%, #FFB75E 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
  letter-spacing: 0.5px;
  text-shadow: 0 0 20px rgba(255, 81, 47, 0.5);
}

.badge-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  opacity: 0.9;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: left;
}

.main-text {
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.5px;
}

.sub-text {
  font-size: 0.95rem;
  margin: 0;
  color: #b0b0b0;
  font-weight: 500;
}

.cta-button {
  background: linear-gradient(135deg, rgba(255, 81, 47, 0.8) 0%, rgba(221, 36, 118, 0.8) 100%);
  color: white;
  padding: 0.75rem 1.8rem;
  text-decoration: none;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 81, 47, 0.2);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cta-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(221, 36, 118, 0.9) 0%, rgba(255, 81, 47, 0.9) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 81, 47, 0.3);
}

.cta-button:hover::before {
  opacity: 1;
}

.cta-button:active {
  transform: translateY(0);
}

.button-text,
.arrow-icon {
  position: relative;
  z-index: 1;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow-icon {
  transform: translateX(4px);
}

.close-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  position: absolute;
  top: 0.8rem;
  right: 1.5rem;
}

.close-button:hover {
  background: rgba(255, 81, 47, 0.2);
  border-color: rgba(255, 81, 47, 0.4);
  transform: rotate(90deg);
}

.close-button svg {
  width: 20px;
  height: 20px;
}

/* Mobile Responsive */
@media only screen and (max-width: 968px) {
  .banner-content {
    flex-direction: column;
    gap: 1.2rem;
    padding: 1rem 1.5rem;
  }

  .content-wrapper {
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
  }

  .text-section {
    text-align: center;
  }

  .main-text {
    font-size: 1.2rem;
  }

  .sub-text {
    font-size: 0.85rem;
  }

  .cta-button {
    width: 100%;
    padding: 1rem 2rem;
  }

  .close-button {
    top: 0.5rem;
    right: 0.5rem;
  }

  .logo {
    width: 90px;
  }
}

@media only screen and (max-width: 480px) {
  .logo {
    display: none;
  }

  .discount-value {
    font-size: 1.5rem;
  }

  .badge-inner {
    padding: 0.6rem 1.2rem;
  }

  .main-text {
    font-size: 1.1rem;
  }

  .close-button {
    width: 32px;
    height: 32px;
  }
}
</style>
