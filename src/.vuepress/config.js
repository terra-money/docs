module.exports = {
  title: "Terra Docs",
  description: "Terra Blockchain Documentation",
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: "theme/components",
      },
    ],
    [
      "vuepress-plugin-mathjax",
      {
        target: "svg",
        macros: {
          "*": "\\times",
        },
      },
    ],
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
      { text: "Validators", link: "/validator/" },
      { text: "Core Devs", link: "/core/" },
      {
        text: "GitHub",
        link: "https://github.com/terra-project/core",
        icon: "/img/github.svg",
      },
    ],
    sidebar: {
      "/core/": [
        "/core/",
        {
          title: "Module Specs",
          children: [
            "/core/spec-auth",
            "/core/spec-bank",
            "/core/spec-distribution",
            "/core/spec-governance",
            "/core/spec-market",
            "/core/spec-oracle",
            "/core/spec-slashing",
            "/core/spec-staking",
            "/core/spec-supply",
            "/core/spec-treasury",
          ],
        },
      ],
      "/validator/": [
        "/validator/",
        "/validator/getting-started",
        "/validator/oracle",
        "/validator/security",
        "/validator/troubleshooting",
        "/validator/faq",
      ],
      "/": [
        ["/", "Overview"],
        "getting-started",
        {
          title: "Concepts",
          children: [
            "terra",
            "luna",
            "accounts",
            "validators",
            "consensus",
            "stablecoin",
            "seigniorage",
            "governance",
            "smart-contracts",
          ],
        },
        {
          title: "Ecosystem",
          children: ["core", "mantle", "station", "finder"],
        },
        {
          title: "Terra Node",
          children: ["node/installation", "node/testnet", "node/join-network"],
        },
        {
          title: "Other Resources",
          collapsable: false,
          children: [
            ["https://swagger.terra.money", "Terra REST API Reference "],
          ],
        },
      ],
    },
  },
};
