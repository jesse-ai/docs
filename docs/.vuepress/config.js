module.exports = {

    title: 'Jesse',
    description: 'A Python trading framework for cryptocurrency markets.',

    plugins: [
        '@vuepress/last-updated',
        '@vuepress/medium-zoom',
        'vuepress-plugin-smooth-scroll',
        [
            '@vuepress/google-analytics',
            {
                ga: 'UA-135004813-1',
            },
        ],
        [
            'sitemap',
            {
                hostname: 'https://docs.jesse.trade',
            },
        ],
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: 'Search',
                    }
                },
            },
        ]
    ],
    themeConfig: {
        docsRepo: 'jesse-ai/docs',
        docsBranch: 'master',
        editLinks: true,
        algolia: {
            apiKey: '5b718939748786f0bb2d064c6851bd68',
            indexName: 'jesse'
        },
        navbar: [
            {
                text: 'Home',
                link: 'https://jesse.trade',
            },
            {
                text: 'Blog',
                link: 'https://jesse.trade/blog',
            },
            {
                text: 'Forum',
                link: 'https://forum.jesse.trade',
            },
            {
                text: 'Discord',
                link: 'https://discord.gg/nztUFbMnF5',
            },
            {
                text: 'Github',
                link: 'http://github.com/jesse-ai/jesse',
            },
        ],
        sidebar: [
            {
                text: 'Getting Started',
                link: '/getting-started',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    {
                        text: 'Installation',
                        link: '/getting-started'
                    },
                    {
                        text: 'Docker',
                        link: '/getting-started/docker'
                    },
                    {
                        text: 'Environment Setup',
                        link: '/getting-started/environment-setup'
                    }
                    // ['/docs/getting-started/generating-new-strategy', 'Generating new strategy'],
                    // ['/docs/getting-started/entering-and-exiting', 'Entering and exiting trades'],
                    // ['/docs/getting-started/events', 'Events'],
                    // ['/docs/getting-started/filters', 'Filters'],
                    // ['/docs/getting-started/api', 'API reference']
                ],
            },
            {
                text: 'Configuration',
                link: '/configuration'
            },
            {
                text: 'Routing',
                link: '/routes'
            },
            {
                text: 'Importing Candles',
                link: '/import-candles'
            },
            {
                text: 'Strategies', // required
                link: '/strategies/', // optional, which should be an absolute path.
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    {
                        text: 'Introduction',
                        link: '/strategies/'
                    },
                    {
                        text: 'Generating new strategy',
                        link: '/strategies/generating-new-strategy'
                    },
                    {
                        text: 'Entering and exiting trades',
                        link: '/strategies/entering-and-exiting'
                    },
                    {
                        text: 'Events',
                        link: '/strategies/events'
                    },
                    {
                        text: 'Filters',
                        link: '/strategies/filters'
                    },
                    {
                        text: 'API reference',
                        link: '/strategies/api'
                    },
                    {
                        text: 'Examples',
                        link: '/strategies/example-strategies.md'
                    },

                ],
            },
            {
                text: 'Indicators', // required
                link: '/indicators/', // optional, which should be an absolute path.
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    {
                        text: 'Introduction',
                        link: '/indicators/'
                    },
                    {
                        text: 'Indicators Reference',
                        link: '/indicators/reference'
                    },
                    {
                        text: 'Custom Indicators',
                        link: '/indicators/custom-indicators'
                    }
                ],
            },
            {
                text: 'Utilities',
                link: '/utils/'
            },
            {
                text: 'Backtest',
                link: '/backtest/'
            },
            {
                text: 'Live Trading',
                link: '/livetrade/'
            },
            {
                text: 'Notifications',
                link: '/notifications/'
            },

            // ['/docs/papertrade', 'Paper Trading'],
            {
                text: 'Strategy Optimization', // required
                link: '/optimize/', // optional, which should be an absolute path.
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    {
                        text: 'Introduction',
                        link: '/optimize/'
                    },
                    {
                        text: 'Hyperparameters',
                        link: '/optimize/hyperparameters'
                    },
                    {
                        text: 'Executing the optimize mode',
                        link: '/optimize/executing-the-optimize-mode'
                    },
                    {
                        text: 'DNA usage',
                        link: '/optimize/dna-usage'
                    },
                    {
                        text: 'Overfitting',
                        link: '/optimize/overfitting'
                    }
                ],
            },
            {
                text: 'Jupyter Notebooks',
                link: '/optimize/jupyter-note'
            },
            {
                text: 'Debugging',
                link: '/debugging'
            },
            {
                text: 'Frequently Asked Questions',
                link: 'https://jesse.trade/help/'
            },
            {
                text: 'Changelog',
                link: '/changelog'
            },
            {
                text: 'Roadmap',
                link: '/roadmap'
            }
            // ['/docs/license', 'License']
        ],
    },
}
