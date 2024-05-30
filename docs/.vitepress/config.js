// .vitepress/config.js
export default {
    // 站点级选项
    title: 'TinyCRUD Docs',
    description: 'Just playing around.',

    locales: {
        root: {
            label: '简体中文',
            lang: '/'
        },
        en: {
            label: 'English',
            lang: 'en',
        }
    },

    themeConfig: {
        nav: [
            { text: "首页", link: "/" },
            { text: "指南", link: "/guide/intro/what-is-tinycrud" }
        ],
        sidebar: {
            "/guide/": [
                {
                    text: "简介",
                    items: [{
                        text: "什么是 TinyCRUD",
                        link: "/intro/what-is-tinycrud"
                    }]
                }
            ]
        }
    }
}