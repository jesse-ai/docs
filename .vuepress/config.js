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
    ],
    themeConfig: {
        docsRepo: 'jesse-ai/docs',
        docsBranch: 'master',
        editLinks: true,
        algolia: {
            apiKey: '5b718939748786f0bb2d064c6851bd68',
            indexName: 'jesse'
        },
        nav: [
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
            ['/docs/', 'Introduction'],
            {
                title: 'Getting Started',
                path: '/docs/getting-started/',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    ['/docs/getting-started/', 'Installation'],
                    ['/docs/getting-started/docker', 'Docker'],
                    ['/docs/getting-started/environment-setup', 'Environment Setup'],
                    // ['/docs/getting-started/generating-new-strategy', 'Generating new strategy'],
                    // ['/docs/getting-started/entering-and-exiting', 'Entering and exiting trades'],
                    // ['/docs/getting-started/events', 'Events'],
                    // ['/docs/getting-started/filters', 'Filters'],
                    // ['/docs/getting-started/api', 'API reference']
                ],
            },
            ['/docs/configuration', 'Configuration'],
            ['/docs/routes', 'Routing'],
            ['/docs/import-candles', 'Importing Candles'],
            {
                title: 'Strategies', // required
                path: '/docs/strategies/', // optional, which should be an absolute path.
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    ['/docs/strategies/', 'Introduction'],
                    ['/docs/strategies/generating-new-strategy', 'Generating new strategy'],
                    ['/docs/strategies/entering-and-exiting', 'Entering and exiting trades'],
                    ['/docs/strategies/events', 'Events'],
                    ['/docs/strategies/filters', 'Filters'],
                    ['/docs/strategies/api', 'API reference'],
                    ['/docs/strategies/example-strategies.md', 'Examples'],
                ],
            },
            {
                title: 'Indicators', // required
                path: '/docs/indicators/', // optional, which should be an absolute path.
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    ['/docs/indicators/', 'Introduction'],
                    ['/docs/indicators/reference', 'Indicators Reference'],
                    ['/docs/indicators/custom-indicators', 'Custom Indicators']
                ],
            },
            ['/docs/utils', 'Utilities'],
            ['/docs/backtest', 'Backtest'],
            ['/docs/livetrade', 'Live Trading'],
            ['/docs/notifications', 'Notifications'],
            // ['/docs/papertrade', 'Paper Trading'],
            {
                title: 'Strategy Optimization', // required
                path: '/docs/optimize/', // optional, which should be an absolute path.
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    ['/docs/optimize/', 'Introduction'],
                    ['/docs/optimize/hyperparameters', 'Hyperparameters'],
                    ['/docs/optimize/executing-the-optimize-mode', 'Executing the optimize mode'],
                    ['/docs/optimize/dna-usage', 'DNA usage'],
                    ['/docs/optimize/overfitting', 'Overfitting'],
                ],
            },
            ['/docs/jupyter-notebooks', 'Jupyter Notebooks'],
            ['/docs/debugging', 'Debugging'],
            ['https://jesse.trade/help', 'Frequently Asked Questions'],
            ['/docs/changelog', 'Changelog'],
            ['/docs/roadmap', 'Roadmap'],
            // ['/docs/license', 'License']
        ],
    },
}
