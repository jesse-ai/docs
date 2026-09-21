<script setup>
// Keep these destinations aligned with the existing supported-exchanges referral links.
// Only show fee discounts confirmed for Jesse's referral links by Saleh.
const exchanges = [
  { name: 'ApeX Omni', url: 'https://jesse.trade/apex', accent: '#e5a800', discount: '25% off trading fees', decentralized: true },
  { name: 'KuCoin', url: 'https://jesse.trade/kucoin', accent: '#00a886', discount: '15% off trading fees' },
  { name: 'Hyperliquid', url: 'https://jesse.trade/hyperliquid', accent: '#38b69b', discount: '4% off trading fees', decentralized: true },
  { name: 'Gate.io', url: 'https://jesse.trade/gate', accent: '#4778f5', discount: '10% off trading fees' },
]
</script>

<template>
  <section class="exchange-ads" aria-label="Exchange partners">
    <p class="eyebrow">PARTNER LINKS</p>

    <ul class="exchange-list">
      <li v-for="exchange in exchanges" :key="exchange.name">
        <a
          :href="exchange.url"
          :style="{ '--exchange-accent': exchange.accent }"
          target="_blank"
          rel="sponsored noopener noreferrer"
          :aria-label="`${exchange.name} — ${exchange.decentralized ? 'Decentralized exchange' : 'Crypto exchange'}${exchange.discount ? ` — ${exchange.discount}` : ''} (referral link, opens in a new tab)`"
        >
          <span class="exchange-details">
            <span class="exchange-name">{{ exchange.name }}</span>
            <span class="exchange-type">{{ exchange.decentralized ? 'Decentralized exchange' : 'Crypto exchange' }}</span>
            <span v-if="exchange.discount" class="exchange-discount">{{ exchange.discount }}</span>
          </span>
          <span class="arrow" aria-hidden="true">↗</span>
        </a>
      </li>
    </ul>

    <a class="advertise-link" href="mailto:support@jesse.trade?subject=Advertising%20on%20Jesse%20Documentation">
      Advertise here <span aria-hidden="true">→</span>
    </a>
  </section>
</template>

<style scoped>
.exchange-ads {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--vp-c-text-2);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 16px;
}

.exchange-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.exchange-list a {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 40px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.15s, background-color 0.15s;
}

.exchange-list a:hover {
  border-color: var(--exchange-accent);
  background: var(--vp-c-bg);
}

.exchange-list a:focus-visible,
.advertise-link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.exchange-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
}

.exchange-name::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: var(--exchange-accent);
}

.arrow {
  color: var(--vp-c-text-2);
  font-size: 16px;
}

.exchange-details {
  min-width: 0;
}

.exchange-type {
  display: block;
  margin-top: 2px;
  color: var(--vp-c-text-2);
  font-size: 11px;
  line-height: 17px;
}

.exchange-discount {
  display: inline-block;
  margin-top: 8px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 600;
  line-height: 17px;
}

.advertise-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 12px 0;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
}

.advertise-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
