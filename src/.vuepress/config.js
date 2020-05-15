module.exports = {
  title: "Terra Docs",
  description: "Terra Blockchain Documentation",
  plugins: [
    "@vuepress/register-components",
    {
      componentsDir: "theme/components",
    },
  ],
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cloud.typography.com/7420256/6416592/css/fonts.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://terra.money/static/fonts/jetbrainsMono.css?updated=190220",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined",
      },
    ],

    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/img/favicon.png",
      },
    ],
  ],
  themeConfig: {
    logo: "/img/docs_logo.svg",
    lastUpdated: "Updated on",
    nav: [
      { text: "Docs", link: "/" },
      { text: "Dev Guide", link: "/devguide/" },
      { text: "Validator", link: "/validator/" },
      {
        text: "GitHub",
        link: "https://github.com/terra-project/core",
        icon: "/img/github.svg",
      },
    ],
    sidebar: {
      "/": [
        ["/", "Overview"],
        ["getting-started", "Getting Started"],
        {
          title: "Concepts",
          collapsable: false,
          children: [
            ["accounts", "Accounts"],
            ["consensus", "Consensus"],
            ["validators", "Validators"],
            ["staking", "Staking & Luna"],
            ["stablecoin", "Stablecoin"],
            ["seigniorage", "Seigniorage"],
            ["governance", "Governance"],
            ["smart-contracts", "Smart Contracts"],
          ],
        },
        {
          title: "Other Resources",
          collapsable: false,
          children: [
            ["https://swagger.terra.money", "Terra REST API Reference "],
          ],
        },
      ],
      "/devguide/": [["/devguide/", "intro"]],
    },
  },
};
