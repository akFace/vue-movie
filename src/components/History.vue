<template>
    <Layout :has_menu="false" :has_footer="false" title="浏览历史">
        <div class="menu" slot="bar_menu" >
            <mu-menu-item title="清空收藏" @click="clearHistory" />
        </div>
        <div class="page_wrap">
            <div class="page_hd">
            </div>
            <div class="page_bd">
                <div class="list">
                    <div class="item" v-for="movie in list" @click="jumpDetail(movie.id)">
                        <div class="img" :style="`background-image: url(${movie.cover})`"></div>
                        <div class="title">{{ movie.title }}</div>
                    </div>
                </div>  
            </div>
            <div class="page_ft">
            </div>
        </div>
    </Layout>
</template>
<script>
let _self;
import Layout from '@/components/Layout';
import Store from 'storejs'

export default {
    data: function() {
        return {
            list: [],
        };
    },
    created() {
        _self = this;
        this.getHistory();
    },
    activated() {
        
    },
    methods: {
        jumpDetail(id) {
            this.$router.push(`/movie/detail/${id}`)
        },
        getHistory() {
            this.list = Store.get('view_list');
        },
        clearHistory() {
            Store.remove('view_list');
            this.list = [];
        },
    },
    computed: {
        
    },
    components: {
        Layout,
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/less/common.less');
.page_wrap {
    .page_hd {}
    .page_bd {
        height: 100%;
        background-color: #f5f5f5;
        padding-top: 10px;
        .list {
            .item {
                padding: 5px 10px;
                margin-bottom: 5px;
                border-bottom: 1px solid #eee;
                background-color: #fff;
                display: flex;
                .img {
                    width: 100px;
                    height: 60px;
                    background-repeat: no-repeat;
                    background-size: 100%;
                }
                .title {
                    flex: 1;
                    padding-top: 20px;
                    padding-left: 10px;
                    .ellipsisLn(2);
                }
            }
        }
    }
    .page_ft {}
}

</style>


<style scoped lang="less">
@import url('../assets/less/common.less');
// 响应式布局，流式布局
// 导航栏响应式

/* 大屏幕（大桌面显示器，最小宽度 1200px） */

@media (min-width: @screen_mg_min) {
    
}


/* 大屏幕（大桌面显示器，大于等于 1200px） */

@media (max-width: @screen_lg_min) {
    
}

/* 中等屏幕（桌面显示器，大于等于 992px） */

@media (max-width: @screen_md_min) {
    
}

/* 小屏幕（平板，大于等于 768px） */

@media (max-width: @screen_sm_min) {
    
}





/* 小屏幕（手机，大于等于 640px） */

@media (max-width: @screen_mi_min) {
    
}

</style>