module.exports = {
    title: '槲寄生',
    description: '欢迎来到我的个人空间',
    dest: './dist',
    port: '7777',
    base: '/vuepress/',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}],
        ['link', {rel: 'stylesheet', href: '/layui/css/layui.css'}],
        ['link', {rel: 'stylesheet', href: '/css/common.css'}],
        ['script', {charset: "utf-8", src: "/layui/layui.js" }],
        ['script', {charset: "utf-8", src: "/layui/layui.all.js" }],
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav.js'),
        sidebar: require('./sidebar.js'),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！',
        logo: '/logo.png',
    }
}