// .vitepress/config.js
export default {
    // 站点级选项
    title: 'TinyCRUD Docs',
    description: 'Just playing around.',
    base: "/",
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
        outline: {
            level: "deep",
        },
        sidebar: {
            "/guide/": [
                {
                    text: "简介",
                    items: [{
                        text: "什么是 TinyCRUD",
                        link: "/guide/intro/what-is-tinycrud"
                    }]
                }, {
                    text: "安装配置",
                    items: [{
                        text: "准备工作",
                        link: "/guide/install/prepare"
                    }, {
                        text: "创建请求",
                        link: "/guide/install/create-request"
                    }, {
                        text: "应用加密",
                        link: "/guide/install/encryption"
                    }]
                }
            ]
        }
    }
}