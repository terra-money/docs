<template>
  <div class="footer-container">
    <div class="sns-container">
      <div class="copyright">Terraform labs PTE.LTD</div>
      <div class="logos">
        <a href="https://discord.gg/bYfyhUT" rel="noopener" target="_blank">
          <img
            src="https://terra.money/static/assets/images/icon_discord.png"
            alt="link to Terra discord room"
          />
        </a>
        <a href="https://medium.com/terra-money" rel="noopener" target="_blank">
          <img
            src="https://terra.money/static/assets/images/icon_medium.png"
            alt="link to Terra medium"
          />
        </a>
        <a href="https://twitter.com/terra_money" rel="noopener" target="_blank">
          <img
            src="https://terra.money/static/assets/images/icon_twitter.png"
            alt="link to Terra twitter"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCoV1RXZ9ZBGcuu_PMTTlM0g"
          rel="noopener"
          target="_blank"
        >
          <img
            src="https://terra.money/static/assets/images/icon_youtube.png"
            alt="link to Terra youtube"
          />
        </a>
        <a href="https://t.me/terra_announcements" rel="noopener" target="_blank">
          <img
            src="https://terra.money/static/assets/images/icon_telegram.png"
            alt="link to Terra telegram room"
          />
        </a>
      </div>
    </div>
    <div class="links-container">
      <ul class="learn">
        <li>Learn</li>
        <li>
          <a href="https://terra.money/Terra_White_paper.pdf" target="_blank">
            White
            Paper
          </a>
        </li>
        <li>
          <a href="https://docsend.com/view/9mvr5qq" target="_blank">Decks</a>
        </li>
        <li>
          <a href="https://certik.org/reports/terra.pdf" target="_blank">Security Audit</a>
        </li>
        <li>
          <a href="https://agora.terra.money/" target="_blank">Agora Discussions</a>
        </li>
      </ul>
      <ul class="developers">
        <li>SDKs</li>
        <li>
          <a href="https://jigu.terra.money/" target="_blank">Jigu Python SDK</a>
        </li>
        <li>
          <a href="https://terra-project.github.io/terra.js/" target="_blank">Terra.js</a>
        </li>
      </ul>
      <ul class="developers">
        <li>SDKs</li>
        <li>
          <a href="https://jigu.terra.money/" target="_blank">Jigu Python SDK</a>
        </li>
        <li>
          <a href="https://terra-project.github.io/terra.js/" target="_blank">Terra.js</a>
        </li>
      </ul>
    </div>
    <a href="https://terra.money" target="_blank" class="terramoney">terra.money</a>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="stylus">
.footer-container {
  max-width: $contentWidth;
  padding: 3rem 1.5rem;
  margin: 0 auto;
  position: relative;
  clear: both;

  .copyright {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.67;
    letter-spacing: -0.019rem;
    padding-bottom: 0.25rem;
    text-transform: uppercase;
  }

  .sns-container {
    a {
      display: inline-block;
      width: 1.875rem;
      height: 1.875rem;
      position: relative;
      opacity: 0.5;
      transition: 0.2s;
      margin-right: 0.313rem;

      img {
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -0.563rem;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  .links-container {
    font-size: 0;

    ul {
      font-size: 0.875rem;
      display: inline-block;
      vertical-align: top;
      text-align: left;
      white-space: nowrap;
      width: 50%;
      margin-top: 2rem;
      padding-left: 0;
    }

    li {
      line-height: 1.71;
      padding: 0;
      margin: 0;

      &:first-child {
        font-weight: 500;
        text-transform: uppercase;
        margin-bottom: 0.313rem;
      }

      a {
        transition: 0.2s;
        color: $textColor;
        font-weight: 400;
        font-size: 0.875rem;
        opacity: 0.75;

        &:hover {
          opacity: 1;
        }
      }

      &:before {
        display: none;
      }
    }
  }

  .terramoney {
    margin: 2rem 0 1.25rem;
    font-size: 0.938rem;
    font-weight: 500;
    color: $primaryColor;
    display: block;

    &:hover {
      color: $textColor;
    }
  }
}

@media (min-width: $MQMobileNarrow) {
  .footer-container {
    padding: 3rem 2rem;
  }
}

@media (min-width: $MQNarrow) {
  .footer-container {
    padding: 5rem 2.5rem;

    .copyright {
      font-size: 0.875rem;
      padding-bottom: 0.938rem;
    }

    .sns-container {
      position: absolute;
      top: 5rem;
      left: 2.5rem;
    }

    .links-container {
      text-align: right;

      ul {
        font-size: 0.938rem;
        text-align: left;
        white-space: nowrap;
        margin-left: 4rem;
        width: auto;
        min-width: 8rem;
        margin-top: 0;

        &:last-child {
          min-width: 0;
          position: static;
          bottom: unset;
          left: unset;
        }
      }

      li {
        &:first-child {
          font-size: 0.875rem;
          padding-bottom: 0.938rem;
        }
      }
    }
  }

  .terramoney {
    position: absolute;
    bottom: 5rem;
    left: 2.5rem;
    display: inline-block;
  }
}
</style>
