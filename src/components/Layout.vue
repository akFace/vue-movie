<template>
    <div class="container slim_scrollbar">
        <div class="header_wrap">
            <slot name="header">
                <template>
                    <mu-appbar :title="title">
                        <mu-icon-button icon="menu" slot="left" v-if="has_menu" @click="openMenu" />
                        <mu-icon-button icon="arrow_back" slot="left" v-if="!has_menu" @click="goBack" />
                        <mu-icon-menu icon="more_vert" slot="right" v-if="has_share">
                            <slot name="bar_menu">
                                <mu-menu-item title="分享" />
                                <mu-menu-item title="收藏" />
                            </slot>
                        </mu-icon-menu>
                        <mu-icon-button icon="search" slot="right"v-if="!has_share" @click="search" />
                    </mu-appbar>
                </template>
            </slot>
        </div>
        <div class="content_wrap">
            <slot></slot>
        </div>
        <div class="footer_wrap" v-if="has_footer">
            <template>
                <mu-paper>
                    <mu-bottom-nav :value="active_nav" @change="handleChange">
                        <mu-bottom-nav-item :value="nav.value" :title="nav.title" :icon="nav.icon" v-for="nav in bottom_nav" :key="nav.title" />
                    </mu-bottom-nav>
                </mu-paper>
            </template>
        </div>
    </div>
</template>
<script>
let _self;
import Layout from '@/components/Layout';

export default {
    data: function() {
        return {
            active_nav: '/',
            bottom_nav: [{
                title: '首页',
                value: '/',
                icon: 'subscriptions'
            }, {
                title: '电影',
                value: '/movie',
                icon: 'movie'
            }, {
                title: '电视',
                value: '/tv',
                icon: 'tv'
            }, {
                title: '我的',
                value: '/user',
                icon: 'favorite'
            }],
        };
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        has_menu: {
            type: Boolean,
            default: true,
        },
        has_share: {
            type: Boolean,
            default: true,
        },
        leftAction: {
            type: Function,
        },
        has_footer: {
            type: Boolean,
            default: true,
        },
    },
    created() {
        _self = this;
    },
    mounted() {
        // 设置手机状态栏颜色
        this.setStatusBar();
    },
    activated() {
        this.setActiveNav();
    },
    methods: {
        openMenu() {

        },
        search() {
            this.$router.push('/search')
        },
        goBack() {
            if (this.leftAction) {
                this.leftAction.call(this.$parent);
            } else {
                if (history.length > 1) {
                    this.$router.go(-1);
                } else {
                    this.$router.push('/');
                }
            }
        },
        handleChange(val) {
            this.active_nav = val;
            this.$router.push(val);
        },
        setActiveNav() {
            let path = this.$route.path;
            this.active_nav = path;
        },
        setStatusBar() {
            document.addEventListener("deviceready", () => {
                console.log('设备已就绪');
                StatusBar.backgroundColorByHexString("#7E57C2");
            }, false);
        },
    },
    computed: {

    },
    components: {

    }
};

</script>
<style scoped lang="less">
.container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .header_wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 999;
    }
    .content_wrap {
        padding: 56px 0 50px 0;
        // background: #f5f5f5;
    }
    .footer_wrap {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
    }
}

</style>
