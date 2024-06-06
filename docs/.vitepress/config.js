// .vitepress/config.js
export default {
    // 站点级选项
    title: 'TinyCRUD',
    description: 'Just playing around.',
    base: "/",
    locales: {
        root: {
            label: '简体中文',
            lang: '/',
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
                        }, {
                            text: "开始使用",
                            items: [{
                                text: "创建数据模型",
                                link: "/guide/usage/create-model"
                            }, {
                                text: "创建数据存储库",
                                link: "/guide/usage/create-repository"
                            }, {
                                text: "增删改查方法",
                                link: "/guide/usage/crud"
                            }]
                        }, {
                            text: "贡献指南",
                            items: [{
                                text: "构建运行",
                                link: "/guide/contribute/build"
                            }]
                        }
                    ]
                }
            }
        },
        en: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                nav: [
                    { text: "Home", link: "/en/" },
                    { text: "Guide", link: "/en/guide/intro/what-is-tinycrud" }
                ],
                sidebar: {
                    "/en/guide/": [
                        {
                            text: "Introduction",
                            items: [{
                                text: "What is TinyCRUD",
                                link: "/en/guide/intro/what-is-tinycrud"
                            }]
                        }, {
                            text: "Installation",
                            items: [{
                                text: "Prepare",
                                link: "/en/guide/install/prepare"
                            }, {
                                text: "Create Request",
                                link: "/en/guide/install/create-request"
                            }, {
                                text: "Encryption",
                                link: "/en/guide/install/encryption"
                            }]
                        }, {
                            text: "Usage",
                            items: [{
                                text: "Create Model",
                                link: "/en/guide/usage/create-model"
                            }, {
                                text: "Create Repository",
                                link: "/en/guide/usage/create-repository"
                            }, {
                                text: "CRUD",
                                link: "/en/guide/usage/crud"
                            }]
                        }, {
                            text: "Contribute",
                            items: [{
                                text: "Build",
                                link: "/en/guide/contribute/build"
                            }]
                        }
                    ]
                }

            }
        }
    },

    themeConfig: {

        outline: {
            level: "deep",
        },

    }
}