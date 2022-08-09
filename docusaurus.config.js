// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Terra-money', // Usually your GitHub org/user name.
  projectName: 'new-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
            spec: 'https://lcd.terra.dev/swagger/swagger.yaml',
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
        title: 'Terra docs',
        logo: {
          alt: 'Terra docs',
          src: 'img/favicon.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Get started',
          },
          {
            href: 'https://terra.money', //front-end URL
            label: 'Terra.money',
            position: 'right',
          },
          {
            href: 'https://github.com/terra-money/new-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
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
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/terra-money/docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
