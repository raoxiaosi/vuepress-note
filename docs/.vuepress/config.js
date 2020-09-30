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
		['script', {charset: "utf-8", src: "/js/jquery-3.2.1.min.js" }],
        ['script', {charset: "utf-8", src: "/layui/layui.js" }],
        ['script', {charset: "utf-8", src: "/layui/layui.all.js" }],
		['script', {charset: "utf-8", src: "/js/common.js" }],
        ['script', {charset: "utf-8", src: "/js/catalog.js" }],
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav.js'),
        sidebar: require('./sidebar.js'),
        sidebarDepth: 0,
        lastUpdated: '最后修改时间',
        searchMaxSuggestoins: 50,
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