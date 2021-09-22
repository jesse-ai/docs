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
            '@vuepress/docsearch',
            {
                apiKey: '5b718939748786f0bb2d064c6851bd68',
                indexName: 'jesse',
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
                text: 'Introduction',
                link: '/docs'
            },
            {
                text: 'Getting Started',
                link: '/docs/getting-started',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    {
                        text: 'Installation',
                        link: '/docs/getting-started'
                    },
                    {
                        text: 'Docker',
                        link: '/docs/getting-started/docker'
                    },
                    {
                        text: 'Environment Setup',
                        link: '/docs/getting-started/environment-setup'
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
                link: '/docs/configuration'
            },
            {
                text: 'Routing',
                link: '/docs/routes'
            },
            {
                text: 'Importing Candles',
                link: '/docs/import-candles'
            },
            {
                text: 'Strategies', // required
                link: '/docs/strategies/', // optional, which should be an absolute path.
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    {
                        text: 'Introduction',
                        link: '/docs/strategies/'
                    },
                    {
                        text: 'Generating new strategy',
                        link: '/docs/strategies/generating-new-strategy'
                    },
                    {
                        text: 'Entering and exiting trades',
                        link: '/docs/strategies/entering-and-exiting'
                    },
                    {
                        text: 'Events',
                        link: '/docs/strategies/events'
                    },
                    {
                        text: 'Filters',
                        link: '/docs/strategies/filters'
                    },
                    {
                        text: 'API reference',
                        link: '/docs/strategies/api'
                    },
                    {
                        text: 'Examples',
                        link: '/docs/strategies/example-strategies.md'
                    },

                ],
            },
            {
                text: 'Indicators', // required
                link: '/docs/indicators/', // optional, which should be an absolute path.
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    {
                        text: 'Introduction',
                        link: '/docs/indicators/'
                    },
                    {
                        text: 'Indicators Reference',
                        link: '/docs/indicators/reference'
                    },
                    {
                        text: 'Custom Indicators',
                        link: '/docs/indicators/custom-indicators'
                    }
                ],
            },
            {
                text: 'Utilities',
                link: '/docs/utils/'
            },
            {
                text: 'Backtest',
                link: '/docs/backtest/'
            },
            {
                text: 'Live Trading',
                link: '/docs/livetrade/'
            },
            {
                text: 'Notifications',
                link: '/docs/notifications/'
            },

            // ['/docs/papertrade', 'Paper Trading'],
            {
                text: 'Strategy Optimization', // required
                link: '/docs/optimize/', // optional, which should be an absolute path.
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    {
                        text: 'Introduction',
                        link: '/docs/optimize/'
                    },
                    {
                        text: 'Hyperparameters',
                        link: '/docs/optimize/hyperparameters'
                    },
                    {
                        text: 'Executing the optimize mode',
                        link: '/docs/optimize/executing-the-optimize-mode'
                    },
                    {
                        text: 'DNA usage',
                        link: '/docs/optimize/dna-usage'
                    },
                    {
                        text: 'Overfitting',
                        link: '/docs/optimize/overfitting'
                    }
                ],
            },
            {
                text: 'Jupyter Notebooks',
                link: '/docs/jupyter-notebooks'
            },
            {
                text: 'Debugging',
                link: '/docs/debugging'
            },
            {
                text: 'Frequently Asked Questions',
                link: 'https://jesse.trade/help/'
            },
            {
                text: 'Changelog',
                link: '/docs/changelog'
            },
            {
                text: 'Roadmap',
                link: '/docs/roadmap'
            }
            // ['/docs/license', 'License']
        ],
    },
}
