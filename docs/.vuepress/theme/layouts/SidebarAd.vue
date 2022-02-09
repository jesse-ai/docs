<template>
  <div class="sponsor">
    <div class="left">
      <a class="sponsor-title" href="https://tokenbot.com/" ref="nofollow" target="_blank">
        <img src="../imgs/sponsor-sidebar.png" alt="sponsor">
      </a>
    </div>
    <div class="right">
      <a href="https://tokenbot.com/" ref="nofollow" target="_blank" class="sponsor-title">
        Discover and copy the best algorithmic traders in the world. Join the first algorithmic trading desk for retail
        investors and social trading.
      </a>

      <a href="mailto:sponsor@jesse.trade" class="sponsor-tag">
        Sponsored
      </a>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.sponsor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 0 1.25rem;

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
}

.sponsor-title {
  font-size: 12px;
  margin-left: 1rem;
  font-weight: 400;
  color: #444;

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
