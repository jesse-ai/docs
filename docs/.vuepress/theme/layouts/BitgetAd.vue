<template>
  <div class="sponsor" v-if="show" @dblclick="show = false">
    <a href="https://jesse.trade/bitget" ref="nofollow" target="_blank">
      <div class="right">
        <div class="heading">
          Bitget
        </div>
        <div class="description-item">
          - Up to <strong>$4000 bonus</strong>
        </div>
        <div class="description-item">
          <!-- - Recommended exchange by <strong>Jesse</strong> -->
          - No <strong>KYC</strong> required. 
        </div>
        <div class="description-item">
          - High <strong>liquidity</strong>. Low latency. 
        </div>
      </div>

      <div class="read-more">
        Learn More →
      </div>
    </a>
  </div>
</template>

<script lang="ts">
export default {
  name: "BybitAd",
  data() {
    return {
      show: true
    };
  }
}
</script>


<style lang="scss" scoped>
.sponsor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 1rem;
  margin: 1rem 1rem 0 1rem;
  border: 2px dashed #e6e6e6;
  border-radius: 4px;
  color: inherit;
  user-select: none;

  a {
    color: inherit;
    text-decoration: none;
    display: block;
    width: 100%;
  }

  .heading {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
    margin-bottom: .4em;
    color: #1da2b4;
  }

  img {
    width: 100%;
    box-shadow: none;
    cursor: pointer;
    border: 1px solid #e6e6e6;

    .dark & {
      border: 1px solid #2f2f2f;
    }
  }

  .left {
    flex: 1;
  }

  .right {
    flex: 1.2;
  }

  .read-more {
    display: flex;
    // text should go right
    justify-content: flex-end;
    margin-top: 1em;
    font-size: 12px;
    font-weight: bold;  
    font-style: italic;
    &:hover {
      text-decoration: underline;
    }
  }
}

.description-item {
  font-size: 12px;
  font-weight: 400;
  color: #444;
  margin-bottom: .5em;

  &:hover {
    text-decoration: underline;
  }

  .dark & {
    color: #adbac7;
  }
}

.sponsor-tag {
  font-size: .65rem;
  margin-left: 1rem;
  font-weight: 700;
  color: #999;

  .dark & {
    color: #f1f1f1;
  }

  display: block;
  margin-top: 0.5em;

  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 959px) {
  .sponsor {
    flex-direction: column;

    img {
      margin: 0 1rem 0.5rem 1rem;
    }
  }
}
</style>
