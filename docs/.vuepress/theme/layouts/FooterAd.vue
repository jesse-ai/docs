<template>
  <div class="theme-default-content">
    <div class="sponsor">
      <div class="left">
        <a href="https://tokenbot.com/" class="sponsor-title" ref="nofollow" target="_blank">
          <img src="../imgs/sponsor-footer.png" alt="sponsor">
        </a>
      </div>
      <div class="right">
        <a href="https://tokenbot.com/" class="sponsor-title" ref="nofollow" target="_blank">TokenBot® - Discover and
          copy the best algorithmic traders in the world. Join the first algorithmic trading desk for retail investors
          and social trading.</a>

        <a href="mailto:sponsor@jesse.trade" class="sponsor-tag">
          Sponsored
        </a>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.sponsor {
  border-radius: 2px;
  max-width: var(--content-width);
  margin: 1em auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.8rem;
  //padding: 2rem 2.5rem;
  background: #f1f1f1;

  .dark & {
    background: #1a1a1a;
  }


  img {
    width: 50px;
    box-shadow: none;
    border: 1px solid #e6e6e6;

    .dark & {
      border: 1px solid #2f2f2f;
    }

    cursor: pointer;
  }

  .left {
    flex-basis: 50px;
    margin-right: 1rem;
  }

  .right {
    flex: 1.2;
  }
}

.sponsor-title {
  font-size: 12px;
  font-weight: 400;
  color: #444;

  .dark & {
    color: #adbac7;
  }
}

.sponsor-tag {
  font-size: .65rem;
  font-weight: 700;
  display: block;
  margin-top: 0.5em;
  color: #999;

  .dark & {
    color: #f1f1f1;
  }

  &:hover {
    text-decoration: underline;
  }
}

//@media (max-width: 959px) {
//  .sponsor {
//    flex-direction: column;
//
//    img {
//      margin: 0 1rem 0.5rem 1rem;
//    }
//  }
//}
</style>
