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
    editLinks: true,

    locales: {
        '/' : {
            lang: 'en-US', // this will be set as the lang attribute on <html>
            title: 'Jesse',
            description: 'AI Trading System for Cryptocurrencies.',            
        },
        '/ru/': {
            lang: 'ru-RU',
            title: 'Джесси',
            description: 'Автоматизированная Торговая Система для Криптовалют.',
        }
    },

    themeConfig: {
        locales: {
            '/': {
                docsRepo: 'jesse-ai/docs',
                docsBranch: 'master',

                selectText: 'Languages',
                label: 'English',

                editLinks: 'Edit page',

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
                            ['/docs/faq/can-i-trade-multiple-pairs-at-once.md', 'Can I trade multiple pairs at once?'],
                            // ['/docs/faq/environment-setup', 'Environment Setup'],
                        ],
                    },
                    ['/docs/changelog', 'Changelog'],
                    // ['/docs/faq', 'Frequently Asked Questions'],
                    // ['/docs/license', 'License']
                ],
            },
            "/ru/" : { 

                docsRepo: 'jesse-ai/ru',
                docsBranch: 'master', 

                selectText: 'Языки',
                label: 'Русский',

                editLinks: 'Исправить источник',
                               
                nav: [
                    {
                        text: 'Главная',
                        link: 'https://jesse.trade',
                    },
                    {
                        text: 'Блог',
                        link: 'https://jesse.trade/blog',
                    },
                    {
                        text: 'Форум',
                        link: 'https://forum.jesse.trade',
                    },
                    {
                        text: 'Дискорд',
                        link: 'https://discord.gg/nztUFbMnF5',
                    },
                    {
                        text: 'Гитхаб',
                        link: 'http://github.com/jesse-ai/jesse',
                    },
                ],

                sidebar: [
                    ['/ru/', 'Погружение'],
                    {
                        title: 'Начнём',
                        path: '/ru/getting-started/',
                        collapsable: false,
                        sidebarDepth: 1,
                        children: [
                            ['/ru/getting-started/', 'Установка'],
                            ['/ru/getting-started/docker', 'Докер'],
                            ['/ru/getting-started/environment-setup', 'Настройка среды'],
                            // ['/docs/getting-started/generating-new-strategy', 'Generating new strategy'],
                            // ['/docs/getting-started/entering-and-exiting', 'Entering and exiting trades'],
                            // ['/docs/getting-started/events', 'Events'],
                            // ['/docs/getting-started/filters', 'Filters'],
                            // ['/docs/getting-started/api', 'API reference']
                        ],
                    },
                    ['/ru/configuration', 'Конфигурация'],
                    ['/ru/routes', 'Маршруты'],
                    ['/ru/import-candles', 'Загрузка свечей'],
                    {
                        title: 'Стратегии', // required
                        path: '/ru/strategies/', // optional, which should be an absolute path.
                        collapsable: false, // optional, defaults to true
                        sidebarDepth: 1, // optional, defaults to 1
                        children: [
                            ['/ru/strategies/', 'Погружение'],
                            ['/ru/strategies/generating-new-strategy', 'Генерация новой стратегии'],
                            ['/ru/strategies/entering-and-exiting', 'Вход и выход сделки'],
                            ['/ru/strategies/events', 'События'],
                            ['/ru/strategies/filters', 'Фильтры'],
                            ['/ru/strategies/api', 'Справка по API'],
                        ],
                    }
                ],
            }
        }       
    }
}
