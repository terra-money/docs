// @ts-check

const lightCodeTheme = require('./light.theme.js');
const darkCodeTheme = require('./dark.theme.js');

const theme = require("shiki/themes/material-default.json");
const { remarkCodeHike } = require("@code-hike/mdx");

/** @type {import('@docusaurus/types').Config} */

module.exports = async function config() {
  const math = (await import('remark-math')).default;
  const katex = (await import('rehype-katex')).default;
  return {
  title: 'Terra Docs',
  tagline: 'The official docs',
  url: 'https://docs.terra.money',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Terra-money', // Usually your GitHub org/user name.
  projectName: 'new-docs', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          beforeDefaultRemarkPlugins: [[remarkCodeHike, { 
            theme,
            lineNumbers: true,
            showCopyButton: true,
            autoImport: true
            }], math],
          rehypePlugins: [katex],
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',  // Serve the docs at the site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/evanorti/new-docs',
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("@code-hike/mdx/styles.css"),
            require.resolve("./src/css/custom.css"),
            require.resolve('katex/dist/katex.min.css'),
          ],
        },
      }),
    ],
    ['docusaurus-plugin-matomo', {}],
    [
      'redocusaurus',
      {
        specs: [
          {
            id: 'complete',
            spec: 'https://phoenix-lcd.terra.dev/swagger/swagger.yaml',
            route: '/api/',
          },
        ],
        theme: {
          primaryColor: '#1890ff',
        },
      },
    ],
  ],

  themes: ["mdx-v2"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Terra docs',
          src: 'img/logo_light.svg',
          srcDark: 'img/logo_dark.svg'
        },
        items: [
          {
            href: 'https://terra.money', //front-end URL
            position: 'right',
            label: 'terra.money',
            className: "header-terra-link",
            "aria-label": "Terra Money",
          },
          {
            href: 'https://github.com/terra-money/new-docs',
            position: 'right',
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      footer: {
        links: [
          {
            items: [
              {
                label: 'Docs',
                to: '/',
              },
            ],
          },
          {
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/terra-money/docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TerraForm Labs`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      matomo: {
        matomoUrl: 'https://terradocs.matomo.cloud/',
        siteId: '2',
        phpLoader: 'matomo.php',
        jsLoader: 'matomo.js',
      },
    })
};
};
