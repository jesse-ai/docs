module.exports = {
    title: 'Jesse AI',
    description: 'An advanced trading framework for cryptocurrency markets.',
    plugins: [
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
            '/',
            ['/docs/', 'Introduction'],
            ['/docs/installation', 'Installation'],
            ['/docs/import', 'Importing Candles'],
            ['/docs/backtest', 'Back Testing'],
            ['/docs/livetrade', 'Live Trading'],
            ['/docs/indicators', 'Indicators'],
            ['/docs/helpers', 'Helpers'],
            ['/docs/notifications', 'Notifications'],
            ['/docs/logs', 'Logging'],
            ['/docs/roadmap', 'Roadmap'],
            ['/docs/license', 'License']
        ]
    }
}
