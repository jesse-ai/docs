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
                link: '/'
            },
            {
                text: 'Documentation',
                link: '/docs/'
            },
            {
                text: 'Github',
                link: 'http://github.com/jesse-ai/jesse'
            }
        ],
        sidebar: [
            ['/docs/', 'Introduction'],
            ['/docs/installation', 'Installation'],
            ['/docs/configuration', 'Configuration'],
            ['/docs/routes', 'Routing'],
            {
                title: 'Strategies', // required
                path: '/docs/strategies/', // optional, which should be a absolute path.
                collapsable: true, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    ['/docs/strategies/', 'Introduction'],
                    ['/docs/strategies/generating-new-strategy', 'Generating new strategy'],
                    ['/docs/strategies/entry-rules', 'Entry Rules'],
                    ['/docs/strategies/events', 'Events'],
                    ['/docs/strategies/api', 'API reference']
                ]
            },
            {
                title: 'Indicators', // required
                path: '/docs/indicators/', // optional, which should be a absolute path.
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/docs/indicators/', 'Introduction'],
                    ['/docs/indicators/reference', 'Indicators Reference']
                ]
            },
            ['/docs/helpers', 'Helpers'],
            ['/docs/import', 'Importing Candles'],
            ['/docs/backtest', 'Back Testing'],
            ['/docs/livetrade', 'Live Trading'],
            ['/docs/papertrade', 'Paper Trading'],
            ['/docs/optimizing', 'Optimizing'],
            ['/docs/notifications', 'Notifications'],
            ['/docs/logs', 'Logging'],
            ['/docs/license', 'License']
        ]
    }
}
