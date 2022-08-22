/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually
    /*
    tutorialSidebar: [
      {
        type: 'category',
        label: 'Tutorial',
        items: ['hello'],
      },
    ],
     */


    Sidebar: [
        'index',
        {
            type: 'category',
            label: 'Learn',
            link: {type: 'doc', id: 'learn/README'},
            items:
                [
                    'learn/protocol',
                    {
                        type: 'category',
                        label: 'Terra Station',
                        link: {type: 'doc', id: 'learn/terra-station/README'},
                        items:
                            [
                                {
                                    type: 'autogenerated',
                                    dirName: 'learn/terra-station',
                                },
                            ],
                    },
                    'learn/fees',
                    'learn/glossary',
                ],
        },
        {
            type: 'category',
            label: 'Develop',
            link: {type: 'doc', id: 'develop/README'},
            items:
                [
                    'develop/get-started',
                    'develop/which-tools',

                    {
                        type: 'category',
                        label: 'Developer Tools',
                        collapsed: false,
                        items: [
                            {
                                type: 'category',
                                label: 'Terrain',
                                collapsed: true,
                                link: {type: 'doc', id: 'develop/terrain/README'},
                                items: [
                                    'develop/terrain/initial-setup',
                                    'develop/terrain/using-terrain-localterra',
                                    'develop/terrain/using-terrain-testnet',
                                    'develop/terrain/mint-an-nft',
                                    'develop/terrain/cw20-factory',
                                    'develop/terrain/contract-migration'
                                ],
                            },

                            {
                                type: 'category',
                                label: 'LocalTerra',
                                collapsed: true,
                                link: {type: 'doc', id: 'develop/localterra/README'},
                                items: [
                                    'develop/localterra/install-localterra',
                                    'develop/localterra/configure',
                                    'develop/localterra/integrations',
                                    'develop/localterra/contracts',
                                    'develop/localterra/accounts',
                                ],
                            },
                            {
                                type: 'category',
                                label: 'Terra.js',
                                collapsed: true,
                                link: {type: 'doc', id: 'develop/terra-js/README'},
                                items: [
                                    'develop/terra-js/getting-started',
                                    'develop/terra-js/terra-classic',
                                    'develop/terra-js/common-examples',
                                    'develop/terra-js/add-modules',
                                    'develop/terra-js/coin-and-coins',
                                    'develop/terra-js/fees',
                                    'develop/terra-js/ibc',
                                    'develop/terra-js/keys',
                                    'develop/terra-js/make-a-connection',
                                    'develop/terra-js/msgAuthorization',
                                    'develop/terra-js/multisend',
                                    'develop/terra-js/numeric',
                                    'develop/terra-js/query-data',
                                    'develop/terra-js/smart-contracts',
                                    'develop/terra-js/transactions',
                                    'develop/terra-js/wallets',
                                ],
                            },
                            {
                                type: 'category',
                                label: 'Terra.py',
                                collapsed: true,
                                items: [
                                    {
                                        type: 'autogenerated',
                                        dirName: 'develop/terra-py',
                                    },
                                ],
                            },
                            {
                                type: 'category',
                                label: 'Wallet Provider',
                                collapsed: true,
                                link: {type: 'doc', id: 'develop/wallet-provider/README'},
                                items: [
                                    'develop/wallet-provider/wallet-provider-tutorial',
                                    'develop/wallet-provider/station-extension',
                                    'develop/wallet-provider/station-mobile',
                                    'develop/wallet-provider/sign-bytes',
                                ],
                            },
                            {
                                type: 'category',
                                label: 'Terrad',
                                collapsed: true,
                                link: {type: 'doc', id: 'develop/terrad/README'},
                                items: [
                                    'develop/terrad/install-terrad',
                                    'develop/terrad/terrad-mac',
                                    'develop/terrad/using-terrad',
                                    'develop/terrad/commands',
                                    'develop/terrad/subcommands',
                                ],
                            },
                        ],
                    },


                    {
                        type: 'category',
                        label: 'Guides',
                        collapsed: true,
                        items: [
                            'develop/guides/sign-with-multisig',
                            'develop/guides/start-lcd',
                            'develop/examples/tictactoe',
                        ],
                    },
                    'develop/swagger',
                    {
                        type: 'category',
                        label: 'Architecture',
                        collapsed: true,
                        items: [
                            {
                                type: 'category',
                                label: 'Terra Core modules',
                                collapsed: true,
                                items: [
                                    'module-specifications/README',
                                    'module-specifications/spec-auth',
                                    'module-specifications/spec-authz',
                                    'module-specifications/spec-bank',
                                    'module-specifications/spec-capability',
                                    'module-specifications/spec-crisis',
                                    'module-specifications/spec-distribution',
                                    'module-specifications/spec-evidence',
                                    'module-specifications/spec-feegrant',
                                    'module-specifications/spec-governance',
                                    'module-specifications/spec-mint',
                                    'module-specifications/spec-params',
                                    'module-specifications/spec-slashing',
                                    'module-specifications/spec-staking',
                                    'module-specifications/spec-upgrade',
                                    'module-specifications/spec-wasm',
                                ],
                            },
                            'develop/vesting',

                        ],
                    },
                ],
        },

        {
            type: 'category',
            label: 'Full node',
            link: {type: 'doc', id: 'full-node/README'},
            items:
                [
                    {
                        type: 'autogenerated',
                        dirName: 'full-node',
                    },
                ],
        },
    ],

};


/*
    {
      type: 'doc',
      id: 'about/protocol',
      label: 'What is Terra?'
    },

        {
      type: 'html',
      value: '<img src="sponsor.png" alt="Sponsor" />', // The HTML to be rendered
      defaultStyle: true, // Use the default menu item styling
    },
    */

module.exports = sidebars;