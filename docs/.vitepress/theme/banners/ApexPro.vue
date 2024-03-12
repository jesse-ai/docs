<script setup>

</script>

<template>
  <a href="https://jesse.trade/apex" target="_blank" rel="noopener noreferrer" aria-label="Get it now">
    <div class="aside-a1">
      <img src="../../../public/imgs/apex-black.png" alt="Apex" class="logo-light">
      <img src="../../../public/imgs/apex-color.png" alt="Apex" class="logo-dark">

      <ul class="features">
        <li><strong>Instant</strong> order execution</li>
        <li>Self-custody (<strong>DEX</strong>)</li>
        <li>No <strong>KYC</strong></li>
        <li>Lowest fees</li>
        <li>Up to <strong>50x</strong> leverage</li>
      </ul>

      <div href="https://jesse.trade/apex" target="_blank" rel="noopener noreferrer" aria-label="Get it now"
           class="action-button">
        Get Fee Discount →
      </div>
    </div>
  </a>
</template>

<style scoped>
.aside-a1 {
  background-color: #fcfcfc;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;

  &:hover {
    background-color: #f8f8f8;
    border-color: #ffbe0f;
  }
}

.dark .aside-a1 {
  background-color: #1c1c1c;
  border-color: #363636;

  &:hover {
    background-color: #181818;
    border-color: #ffbe0f;
  }
}

.dark .logo-light {
  display: none;
}

.dark .logo-dark {
  display: block;
}

.logo-light {
  display: block;
}

.logo-dark {
  display: none;
}

.aside-a1 img {
  width: 100%;
  max-width: 200px;
  margin-bottom: 1em;
}

.aside-a1 .features {
  list-style: disc;
  padding: 0;
  padding-left: 1em;
  margin: 0;
  text-align: left;
  font-size: 0.9em;
}

.aside-a1 .action-button {
  background-color: #ffbe0f;
  color: black;
  padding: 10px 5px;
  font-size: 0.9em;
  font-weight: bold;
  border-radius: 4px;
  text-decoration: none;
  display: block;
  margin-top: 1em;
  transition: background 0.3s ease;
}
</style>
