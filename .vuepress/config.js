module.exports = {
    title: 'Jesse AI',
    description: 'An advanced trading framework for cryptocurrency markets.',
    themeConfig: {
        docsRepo: 'jesse-ai/docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Help us improve this page!', 

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Documentation', link: '/docs/' },
            { text: 'Roadmap', link: 'https://github.com/jesse-ai/jesse/projects/1' },
            { text: 'Github', link: 'http://github.com/jesse-ai/jesse' }
        ],
        sidebar: [
            '/',
            ['/docs/', 'Introduction'],
            ['/docs/installation', 'Installation'],
            ['/docs/directory-structure', 'Directory Structure'],
            ['/docs/indicators', 'Indicators'], 
            ['/docs/helpers', 'Helpers']
        ]
    }
};
