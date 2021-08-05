module.exports = {
  title: "Terra Docs",
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-footnote"));
    },
  },
  description:
    "Terra is a blockchain protocol that provides fundamental infrastructure for a decentralized economy and enables open participation in the creation of new financial primitives to power the innovation of money.",
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
    [
      "script",
      {},
      `window.onload = function() {
        requestAnimationFrame(function() {
          if (location.hash) {
            const element = document.getElementById(location.hash.slice(1))
      
            if (element) {
              element.scrollIntoView()
            }
          }
        })
      }`,
    ],
  ],
  themeConfig: {
    sidebarDepth: 2,
    logo: "/img/docs_logo.svg",
    lastUpdated: "Updated on",
    repo: "terra-money/docs",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    docsBranch: 'main',
    docsDir: "docs",
    algolia: {
      apiKey: "5957091e293f7b97f2994bde312aed99",
      indexName: "terra-project",
    },
    nav: [
      { text: "Docs", link: "/" },
      { text: "Contracts", link: "/contracts/" },
      { text: "Validators", link: "/validator/" },
      { text: "Core", link: "/dev/" },
      {
        text: "GitHub",
        link: "https://github.com/terra-money/core",
        icon: "/img/github.svg",
      },
    ],
    sidebar: {
      "/contracts/": [
        "/contracts/",
        {
          title: "Tutorial",
          children: [
            "/contracts/tutorial/",
            "/contracts/tutorial/setup",
            "/contracts/tutorial/implementation",
            "/contracts/tutorial/interacting",
            "/contracts/tutorial/cw20",
          ],
          collapsable: false,
        },
        {
          title: "CosmWasm Resources",
          collapsable: false,
          children: [
            ["https://docs.cosmwasm.com", "CosmWasm Official Docs"],
            ["https://github.com/CosmWasm/cosmwasm", "CosmWasm Repo"],
            [
              "https://www.youtube.com/watch?v=pm6VX5ueT2k",
              "Token Video Tutorial",
            ],
            [
              "https://github.com/CosmWasm/cosmwasm-plus",
              "Standard CosmWasm Contracts",
            ],
          ],
        },
      ],
      "/dev/": [
        {
          title: "Developer Guide",
          children: ["/dev/"],
        },
        {
          title: "Module Specs",
          children: [
            "/dev/spec-auth",
            "/dev/spec-authz",
            "/dev/spec-bank",
            "/dev/spec-distribution",
            "/dev/spec-feegrant",
            "/dev/spec-governance",
            "/dev/spec-market",
            "/dev/spec-mint",
            "/dev/spec-authz",
            "/dev/spec-oracle",
            "/dev/spec-slashing",
            "/dev/spec-staking",
            "/dev/spec-supply",
            "/dev/spec-treasury",
            "/dev/spec-wasm",
          ],
          collapsable: false,
        },
        {
          title: "Other Resources",
          collapsable: false,
          children: [
            [
              "https://pkg.go.dev/github.com/terra-money/core?tab=subdirectories",
              "Terra Core GoDoc",
            ],
            ["https://swagger.terra.money", "Terra REST API"],
          ],
        },
      ],
      "/validator/": [
        {
          title: "Validator Guide",
          children: ["/validator/", "/validator/setup", "/validator/oracle"],
        },
        "/validator/faq",
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
            "governance",
            "smart-contracts",
          ],
        },
        {
          title: "Terra Node",
          children: [
            "node/installation",
            "node/config",
            "node/testnet",
            "node/join-network",
          ],
        },
        {
          title: "terrad reference",
          children: [
            "terrad/",
            "terrad/lcd",
            "terrad/keys",
            "terrad/multisig",
            "terrad/tx",
            "terrad/account",
            "terrad/authz",
            "terrad/distribution",
            "terrad/governance",
            "terrad/market",
            "terrad/mint",
            "terrad/oracle",
            "terrad/slashing",
            "terrad/staking",
            "terrad/treasury",
            "terrad/wasm",
          ],
        },
        "integrations",
        "ecosystem",
      ],
    },
  },
};
