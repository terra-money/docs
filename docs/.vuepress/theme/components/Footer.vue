<template>
  <div class="footer-container">
    <div class="company">
      <div class="copyright">Terraform labs PTE.LTD</div>
      <div class="subscribe">
        <div class="subscribe-title">Subscribe to get updates</div>
        <form
          action="https://money.us17.list-manage.com/subscribe/post?u=8eca8dc5c91c2e30d69b1463e&amp;id=1447662093"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          novalidate
        >
          <input
            type="email"
            value
            name="EMAIL"
            class="email"
            id="mce-EMAIL"
            placeholder="Email address"
            required
          />
          real people should not fill this in and expect good things - do not remove this or risk form bot
          signups
          <div style="position: absolute; left: -5000px;" aria-hidden="true">
            <input type="text" name="b_8eca8dc5c91c2e30d69b1463e_1447662093" tabindex="-1" value />
          </div>
          <button type="submit">Submit</button>
        </form>
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
        <!-- <li>
          <a href="https://docsend.com/view/9mvr5qq" target="_blank">Decks</a>
        </li> -->
        <li>
          <a href="https://certik.org/projects/terra" target="_blank">Security Audit</a>
        </li>
        <li>
          <a href="https://agora.terra.money/" target="_blank">Agora Discussions</a>
        </li>
      </ul>
      <ul class="developers">
        <li>Tools</li>
        <li>
          <a href="https://station.terra.money/" target="_blank">Terra Station</a>
        </li>
        <li>
          <a href="https://finder.terra.money/" target="_blank">Terra Finder</a>
        </li>
        <li>
          <a href="https://status.terra.money/" target="_blank">Status</a>
        </li>
      </ul>
      <ul class="developers">
        <li>Luna</li>
        <li>
          <a href="https://docs.terra.money/luna" target="_blank">What is Luna?</a>
        </li>
        <li>
          <a href="https://docs.terra.money/integrations.html#exchanges" target="_blank">Exchanges</a>
        </li>
        <li>
          <a href="https://docs.terra.money/integrations.html#wallets" target="_blank">Wallets</a>
        </li>
      </ul>
      <ul class="developers">
        <li>Foundation</li>
        <li>
          <a href="https://terra.breezy.hr/" target="_blank">Careers</a>
        </li>
      </ul>
      <ul class="developers">
        <li>Developers</li>
        <li>
          <a href="https://github.com/terra-money" target="_blank">Github</a>
        </li>
        <li>
          <a href="https://docs.terra.money/" target="_blank">Documentation</a>
        </li>
        <li>
          <a href="https://docs.terra.money/#sdks-for-developers" target="_blank">SDKs</a>
        </li>
        <li>
          <a href="https://github.com/terra-money/TIPs" target="_blank">TIPs</a>
        </li>
      </ul>
      <ul class="developers">
        <li>Validators</li>
        <li>
          <a href="https://docs.terra.money/validator" target="_blank">Validator Guide</a>
        </li>
        <li>
          <a href="https://github.com/terra-money/validator-profiles" target="_blank">Profiles</a>
        </li>
        <li>
          <a href="https://discord.gg/ZHBuKda" target="_blank">Discord Channel</a>
        </li>
      </ul>
    </div>
    <div class="sns-container">
      <div class="logos">
        <a href="https://discord.gg/e29HWwC2Mz" rel="noopener" target="_blank">
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
      <a href="https://terra.money" target="_blank" class="terramoney">terra.money</a>
    </div>
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
  padding: 5rem 1.5rem 2rem;
  margin: 0 auto;
  position: relative;
  clear: both;

  .copyright {
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.67;
    letter-spacing: -0.019rem;
    padding-bottom: 0.25rem;
    text-transform: uppercase;
  }

  .links-container {
    font-size: 0;

    ul {
      font-size: 0.75rem;
      display: inline-block;
      vertical-align: top;
      text-align: left;
      white-space: nowrap;
      width: 50%;
      margin-top: 2rem;
      margin-bottom: 0;
      padding-left: 0;
    }

    li {
      line-height: 1.71;
      padding: 0;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:first-child {
        font-weight: 500;
        text-transform: uppercase;
        margin-bottom: 0.313rem;
      }

      a {
        transition: 0.2s;
        color: $textColor;
        font-weight: 400;
        font-size: 0.813rem;
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
}

.subscribe {
  font-size: 0;

  .subscribe-title {
    font-size: 13px;
    margin: 0.625rem 0;
  }

  form {
    display: flex;
    justify-content: space-between;
  }

  input {
    flex: 1;
    appearance: none;
    border: 1px solid #d2d9f0;
    box-sizing: border-box;
    color: #0f0f0f;
    height: 2rem;
    padding-left: 0.625rem;
    font-size: 0.813rem;
    border-radius: 0.5rem 0 0 0.5rem;
    margin: 0;
  }

  button {
    appearance: none;
    background: #f5f6fb;
    border: 1px solid #d2d9f0;
    box-sizing: border-box;
    border-left: 0;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 0 0.313rem 0.313rem 0;
    padding: 0 0.625rem;
    color: #2043b5;
    outline: 0;
    margin: 0;
  }
}

.sns-container {
  margin-top: 3rem;

  .logos {
    a {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      position: relative;
      opacity: 0.5;
      transition: 0.2s;
      margin-right: 0.188rem;

      img {
        width: 1rem;
        height: 1rem;
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

  .terramoney {
    display: block;
    margin: 1rem 0;
    font-size: 0.938rem;
    font-weight: 500;
    color: $primaryColor;

    &:hover {
      color: $textColor;
    }
  }
}

@media (min-width: $MQMobileNarrow) {
  .footer-container {
    padding: 5rem 2rem 2rem;
  }
}

@media (min-width: $MQNarrow) {
  .footer-container {
    padding: 7.5rem 2.5rem 2.5rem;

    .copyright {
      font-size: 0.875rem;
      padding-bottom: 0.938rem;
    }

    .company {
      position: absolute;
      top: 7.5rem;
      left: 2.5rem;
    }

    .links-container {
      text-align: right;
      padding-left: 250px;

      ul {
        font-size: 0.938rem;
        text-align: left;
        white-space: nowrap;
        margin-left: 2.5rem;
        width: 120px;
        margin-top: 0;
        margin-bottom: 2rem;
      }

      li {
        &:first-child {
          font-size: 0.875rem;
          padding-bottom: 0rem;
        }
      }
    }
  }

  .sns-container {
    margin-top: 0;
    position: absolute;
    left: 2.5rem;
    top: 17.5rem;
  }
}
</style>
