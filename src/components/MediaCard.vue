<template>
    <div class="card_wrap">
        <div class="item" v-for="media in media" :key="media.id" @click="jumpDetail(media.id)">
            <mu-card>
                <mu-card-media title="" subTitle="">
                    <img :src="media.cover" />
                </mu-card-media>
                <mu-card-title titleClass="media_title" :title="media.title" subTitle="" />
            </mu-card>
        </div>
    </div>
</template>
<script>
let _self;
import Layout from '@/components/Layout';

export default {
    props: {
        media: {
            type: Array,
            require: true
        },
    },
    mounted() {},
    methods: {
        jumpDetail(id) {
            this.$router.push(`/movie/detail/${id}`)
        },

    },
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.card_wrap {
    padding: 0 10px;
    margin: auto;
    // 瀑布流
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
    -moz-column-width: 1em;
    -webkit-column-width: 1em;
    column-width: 1em;
    .item {
        display: inline-block;
        margin-bottom: 1em;
        width: 100%;
        cursor: pointer;
        -moz-page-break-inside: avoid;
        -webkit-column-break-inside: avoid;
        break-inside: avoid;
    }
}

</style>
<style lang="less">
.media_title {
    font-size: 18px!important;
    line-height: 24px!important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>
<style scoped lang="less">
@import url('../assets/less/common.less');
// 响应式布局，流式布局
// 导航栏响应式

/* 大屏幕（大桌面显示器，最小宽度 1200px） */

@media (min-width: @screen_mg_min) {
    .card_wrap {
        max-width: 1200px!important;
        -moz-column-count: 5!important;
        -webkit-column-count: 5!important;
        column-count: 5!important; 
    }
}


/* 大屏幕（大桌面显示器，大于等于 1200px） */

@media (max-width: @screen_lg_min) {
    .card_wrap {
        max-width: 1100px!important;
        -moz-column-count: 5!important;
        -webkit-column-count: 5!important;
        column-count: 5!important;
    }
}

/* 中等屏幕（桌面显示器，大于等于 992px） */

@media (max-width: @screen_md_min) {
    .card_wrap {
        padding: 0 50px!important;
        -moz-column-count: 4!important;
        -webkit-column-count: 4!important;
        column-count: 4!important;
    }
}

/* 小屏幕（平板，大于等于 768px） */

@media (max-width: @screen_sm_min) {
    .card_wrap {
        padding: 0 10px!important;
        -moz-column-count: 3!important;
        -webkit-column-count: 3!important;
        column-count: 3!important;
    }
}





/* 小屏幕（手机，大于等于 640px） */

@media (max-width: @screen_mi_min) {
    .card_wrap {
        padding: 0 10px!important;
        -moz-column-count: 2!important;
        -webkit-column-count: 2!important;
        column-count: 2!important;
    }
}

</style>
