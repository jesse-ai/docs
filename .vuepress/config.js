module.exports = {
    title: 'Jesse AI',
    description: 'A Python trading framework for cryptocurrency markets.',
    plugins: [
        '@vuepress/medium-zoom',
        [
            '@vuepress/google-analytics',
            {
                ga: 'UA-135004813-1',
            },
        ],
        [
            'sitemap',
            {
                hostname: 'https://docs.jesse-ai.com',
            },
        ],
    ],
    themeConfig: {
        docsRepo: 'jesse-ai/docs',
        docsBranch: 'master',
        editLinks: true,

        nav: [
            {
                text: 'Home',
                link: 'https://jesse-ai.com',
            },
            {
                text: 'Blog',
                link: 'https://jesse-ai.com/blog',
            },
            {
                text: 'Forum',
                link: 'https://forum.jesse-ai.com',
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
            // ['/docs/livetrade', 'Live Trading'],
            // ['/docs/papertrade', 'Paper Trading'],
            // ['/docs/optimizing', 'Optimizing'],
            // ['/docs/notifications', 'Notifications'],
            ['/docs/jupyter-notebooks', 'Jupyter Notebooks'],
            ['/docs/debugging', 'Debugging'],
            {
                title: 'FAQ',
                path: '/docs/faq/',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/docs/faq/', 'Introduction'],
                    ['/docs/faq/livetrade', 'How to live-trade your strategy?'],
                    ['/docs/faq/can-i-trade-multiple-pairs-at-once.md', 'Can I trade multiple pairs at once?'],
                    // ['/docs/faq/environment-setup', 'Environment Setup'],
                ],
            },
            ['/docs/changelog', 'Changelog'],
            // ['/docs/faq', 'Frequently Asked Questions'],
            // ['/docs/license', 'License']
        ],
    },
}
