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
            'sitemap2',
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
            '/docs',
            {
                text: 'Getting Started',
                link: '/docs/getting-started',
                children: [
                    {
                        text: 'Installation',
                        link: '/docs/getting-started'
                    },
                    '/docs/getting-started/docker',
                    '/docs/getting-started/environment-setup'
                    // ['/docs/getting-started/generating-new-strategy', 'Generating new strategy'],
                    // ['/docs/getting-started/entering-and-exiting', 'Entering and exiting trades'],
                    // ['/docs/getting-started/events', 'Events'],
                    // ['/docs/getting-started/filters', 'Filters'],
                    // ['/docs/getting-started/api', 'API reference']
                ],
            },
            '/docs/configuration',
            '/docs/routes',
            '/docs/import-candles',
            {
                text: 'Strategies', // required
                link: '/docs/strategies/',
                children: [
                    {
                        text: 'Introduction',
                        link: '/docs/strategies/'
                    },
                    '/docs/strategies/generating-new-strategy',
                    '/docs/strategies/entering-and-exiting',
                    '/docs/strategies/events',
                    '/docs/strategies/filters',
                    '/docs/strategies/api',
                    '/docs/strategies/example-strategies.md',

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
                    '/docs/indicators/reference',
                    '/docs/indicators/custom-indicators'
                ],
            },
            '/docs/utils/',
            '/docs/backtest/',
            '/docs/livetrade/',
            '/docs/notifications/',

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
                    '/docs/optimize/hyperparameters',
                    '/docs/optimize/executing-the-optimize-mode',
                    '/docs/optimize/dna-usage',
                    '/docs/optimize/overfitting'
                ],
            },
            '/docs/jupyter-notebooks',
            '/docs/debugging',
            {
                text: 'Frequently Asked Questions',
                link: 'https://jesse.trade/help/'
            },
            '/docs/changelog',
            '/docs/roadmap'
            // ['/docs/license', 'License']
        ],
    },
}
