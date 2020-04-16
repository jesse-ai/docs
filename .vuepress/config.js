module.exports = {
    title: 'Jesse AI',
    description: 'A Python trading framework for cryptocurrency markets.',
    plugins: [
        '@vuepress/medium-zoom',
        [
            '@vuepress/google-analytics',
            {
                ga: 'UA-135004813-1'
            }
        ]
    ],
    themeConfig: {
        docsRepo: 'jesse-ai/docs',
        docsBranch: 'master',
        editLinks: true,

        nav: [
            {
                text: 'Home',
                link: 'https://jesse-ai.com'
            },
            {
                text: 'Blog',
                link: 'https://jesse-ai.com/blog'
            },
            {
                text: 'Github',
                link: 'http://github.com/jesse-ai/jesse'
            }
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
                ]
            },
            ['/docs/configuration', 'Configuration'],
            ['/docs/routes', 'Routing'],
            ['/docs/import-candles', 'Importing Candles'],
            {
                title: 'Strategies', // required
                path: '/docs/strategies/', // optional, which should be a absolute path.
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    ['/docs/strategies/', 'Introduction'],
                    ['/docs/strategies/generating-new-strategy', 'Generating new strategy'],
                    ['/docs/strategies/entering-and-exiting', 'Entering and exiting trades'],
                    ['/docs/strategies/events', 'Events'],
                    ['/docs/strategies/filters', 'Filters'],
                    ['/docs/strategies/api', 'API reference']
                ]
            },
            {
                title: 'Indicators', // required
                path: '/docs/indicators/', // optional, which should be a absolute path.
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    ['/docs/indicators/', 'Introduction'],
                    ['/docs/indicators/reference', 'Indicators Reference']
                ]
            },
            ['/docs/utils', 'Utilities'],
            ['/docs/backtest', 'Backtest'],
            // ['/docs/livetrade', 'Live Trading'],
            // ['/docs/papertrade', 'Paper Trading'],
            // ['/docs/optimizing', 'Optimizing'],
            // ['/docs/notifications', 'Notifications'],
            ['/docs/jupyter-notebooks', 'Jupyter Notebooks'],
            ['/docs/logs', 'Logging'],
            // ['/docs/faq', 'Frequently Asked Questions'],
            // ['/docs/license', 'License']
        ]
    }
}
