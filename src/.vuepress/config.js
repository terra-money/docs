module.exports = {
  title: "Terra Docs",
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-footnote"));
    },
  },
  description:
    "Terra is the decentralized financial infrastructure powering the innovation of money. Terra provides the foundational building blocks for a new digital economy with its stablecoin protocol, oracle system, smart contracts, and plan for mass-user adoption.",
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
    editLinks: true,
    editLinkText: "Edit this page on Github.",
    docsDir: "src",
    nav: [
      { text: "Docs", link: "/" },
      { text: "Validators", link: "/validator/" },
      { text: "Core Devs", link: "/dev/" },
      {
        text: "GitHub",
        link: "https://github.com/terra-project/core",
        icon: "/img/github.svg",
      },
    ],
    sidebar: {
      "/dev/": [
        "/dev/",
        {
          title: "Module Specs",
          children: [
            "/dev/spec-auth",
            "/dev/spec-bank",
            "/dev/spec-distribution",
            "/dev/spec-governance",
            "/dev/spec-market",
            "/dev/spec-oracle",
            "/dev/spec-slashing",
            "/dev/spec-staking",
            "/dev/spec-supply",
            "/dev/spec-treasury",
          ],
        },
        {
          title: "Other Resources",
          collapsable: false,
          children: [
            [
              "https://pkg.go.dev/github.com/terra-project/core?tab=subdirectories",
              "Go API Reference",
            ],
            ["https://swagger.terra.money", "Terra REST API"],
          ],
        },
      ],
      "/validator/": [
        "/validator/",
        "/validator/faq",
        "/validator/setup",
        "/validator/oracle",
        "/validator/tasks",
        "/validator/security",
        "/validator/troubleshooting",
      ],
      "/": [
        ["/", "Overview"],
        "quickstart",
        {
          title: "Concepts",
          children: [
            "terra",
            "luna",
            "validators",
            "stablecoin",
            "seigniorage",
            "governance",
            "smart-contracts",
          ],
        },
        {
          title: "Terra Node",
          children: [
            "node/installation",
            "node/testnet",
            "node/config",
            "node/join-network",
            "node/production",
          ],
        },
        {
          title: "terracli",
          children: [
            "terracli/",
            "terracli/lcd",
            "terracli/keys",
            "terracli/multisig",
            "terracli/tx",
            "terracli/account",
            "terracli/distribution",
            "terracli/governance",
            "terracli/market",
            "terracli/oracle",
            "terracli/slashing",
            "terracli/staking",
            "terracli/treasury",
          ],
        },
        "integrations",
      ],
    },
  },
};
