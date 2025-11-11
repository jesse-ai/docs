import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Jesse",
    description: "The algo-trading framework that simplifies Python trading with unmatched accuracy",
    cleanUrls: true,
    ignoreDeadLinks: 'localhostLinks',
    sitemap: {
        hostname: 'https://docs.jesse.trade'
    },
    head: [
        ['link', {rel: 'icon', href: '/imgs/favicon.ico'}],
        // ['script', {
        //     'data-domain': 'docs.jesse.trade',
        //     src: 'https://data.jesse.trade/js/plausible.js',
        // }],
        ['script', {
            async: 'true',
            src: 'https://widget.gurubase.io/widget.latest.min.js',
            'data-widget-id': 'op-hMFR89Cgf_cDppi0ZmF9BkBGgLwSH1S3V_JIv4I8',
            'data-text': 'Ask AI',
            'data-margins': '{"bottom": "1rem", "right": "1rem"}',
            'data-light-mode': 'true',
            id: 'guru-widget-id'
        }],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/imgs/jesse-bot.png',
        search: {
            provider: 'local',
            //   provider: 'algolia',
            //   options: {
            //     apiKey: 'f86422ffcc6d387724fb67f7f47c2a97',
            //     indexName: 'jesse',
            //     appId: 'V91PVVUMS3',
            //   },
        },
        footer: {
            message: 'We do NOT guarantee profitable trading results in anyways. USE THE SOFTWARE AT YOUR OWN RISK. THE AUTHORS AND ALL AFFILIATES ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS. Do not risk money which you are afraid to lose. There might be bugs in the code - this software DOES NOT come with ANY warranty. All investments carry risk! Past performance is no guarantee of future results! Be aware of overfitting!',
            copyright: 'Copyright © 2020-2025 Jesse.Trade'
        },
        editLink: {
            text: 'Edit this page on GitHub',
            pattern: 'https://github.com/jesse-ai/docs/edit/master/docs/:path',
        },
        nav: [
            {
                text: 'Home',
                link: 'https://jesse.trade',
            },
            {
                text: 'JesseGPT',
                link: 'https://jesse.trade/gpt',
            },
            {
                text: 'Blog',
                link: 'https://jesse.trade/blog',
            },
            {
                text: 'Help Center',
                link: 'https://jesse.trade/help',
            },
            {
                text: 'Discord',
                link: 'https://jesse.trade/discord',
            },
            {
                text: 'Telegram',
                link: 'https://t.me/jesse_trade',
            },
            {
                text: 'Video Tutorials',
                link: 'https://jesse.trade/youtube',
            },
            {
                text: 'Strategies',
                link: 'https://jesse.trade/strategies',
            },
        ],


        sidebar: [
            {
                text: 'Getting Started',
                collapsed: true,
                items: [
                    {text: 'Installation', link: '/docs/getting-started/'},
                    {text: 'Update', link: '/docs/getting-started/update'},
                    {text: 'Docker', link: '/docs/getting-started/docker'},
                    {text: 'Environment Setup', link: '/docs/getting-started/environment-setup'},
                    {text: 'Migration', link: '/docs/getting-started/migration'}
                ]
            },
            {
                text: 'Essentials',
                collapsed: true,
                items: [
                    {text: 'Configuration', link: '/docs/configuration'},
                    {text: 'Routes', link: '/docs/routes'},
                    {text: 'Import Candles', link: '/docs/import-candles'},
                    {text: 'Backtest', link: '/docs/backtest'},
                    {text: 'Utility Functions', link: '/docs/utils'},
                    {text: 'Debugging', link: '/docs/debugging'},
                ]
            },
            {
                text: 'Strategies',
                collapsed: true,
                items: [
                    {text: 'Introduction', link: '/docs/strategies/'},
                    {text: 'Generating New Strategy', link: '/docs/strategies/generating-new-strategy'},
                    {text: 'Entering and Exiting', link: '/docs/strategies/entering-and-exiting'},
                    {text: 'Events', link: '/docs/strategies/events'},
                    {text: 'Filters', link: '/docs/strategies/filters'},
                    {text: 'API', link: '/docs/strategies/api'},
                    {text: 'Futures vs Spot', link: '/docs/strategies/futures-vs-spot'},
                    {text: 'Example Strategies', link: '/docs/strategies/example-strategies.md'}
                ]
            },
            {
                text: 'Indicators',
                collapsed: true,
                items: [
                    {text: 'Introduction', link: '/docs/indicators/'},
                    {text: 'Reference', link: '/docs/indicators/reference'},
                    {text: 'Custom Indicators', link: '/docs/indicators/custom-indicators'}
                ]
            },
            {
                text: 'Charts',
                collapsed: true,
                items: [
                    {text: 'Introduction', link: '/docs/charts/'},
                    {text: 'Interactive Charts', link: '/docs/charts/interactive-charts'},
                ]
            },
            {
                text: 'Live Trading',
                collapsed: true,
                items: [
                    {text: 'Livetrade', link: '/docs/livetrade'},
                    {text: 'Security', link: '/docs/security'},
                    {text: 'Notifications', link: '/docs/notifications'},
                ]
            },
            {
                text: 'Supported Exchanges',
                collapsed: true,
                items: [
                    {text: 'Backtesting and Live Trading', link: '/docs/supported-exchanges/'},
                    {text: 'Exchange Limitations', link: '/docs/supported-exchanges/exchange-limitations'},
                    {text: 'Exchange Setup Guide', link: '/docs/supported-exchanges/exchange-setup-guide'}
                ]
            },

            {
                text: 'Strategy Optimization',
                collapsed: true,
                items: [
                    {text: 'Introduction', link: '/docs/optimize/'},
                    {text: 'Hyperparameters', link: '/docs/optimize/hyperparameters'},
                    {text: 'Executing the Optimize Mode', link: '/docs/optimize/executing-the-optimize-mode'},
                    {text: 'DNA Usage', link: '/docs/optimize/dna-usage'},
                    {text: 'Overfitting', link: '/docs/optimize/overfitting'}
                ]
            },
            {
                text: 'Research Module',
                collapsed: true,
                items: [
                    {text: 'Introduction', link: '/docs/research/'},
                    {text: 'Jupyter', link: '/docs/research/jupyter'},
                    {text: 'Candles', link: '/docs/research/candles'},
                    {text: 'Indicators', link: '/docs/research/indicators'},
                    {text: 'Backtest', link: '/docs/research/backtest'},
                    {text: 'Monte Carlo', link: '/docs/research/monte_carlo'}
                ]
            },
            {text: '✨ JesseGPT', link: 'https://jesse.trade/gpt'},
            {text: '🔗 Resources', link: 'https://github.com/jesse-ai/awesome-jesse/'},
            {text: '📺 Video Tutorials', link: 'https://jesse.trade/youtube'},
            {text: '🎯 Strategies', link: 'https://jesse.trade/strategies/'},
            {text: '📚 FAQs', link: 'https://jesse.trade/help'},
            {text: '📜 Changelog', link: '/docs/changelog'},
            {text: '📈 Roadmap', link: '/docs/roadmap'}
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/jesse-ai/jesse'},
            {icon: 'discord', link: 'https://jesse.trade/discord'},
            {icon: 'youtube', link: 'https://jesse.trade/youtube'},
            {icon: 'x', link: 'https://twitter.com/jesse_ai_com'},
        ]
    }
})
