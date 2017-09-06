<template>
    <Layout :has_menu="false" :has_footer="false" title="浏览历史">
        <div class="menu" slot="bar_menu" >
            <mu-menu-item title="清空收藏" @click="clearHistory" />
        </div>
        <div class="page_wrap">
            <div class="page_bd">
                <div class="list">
                    <div class="item" v-for="movie in list" @click="jumpDetail(movie.id)">
                        <div class="img" :style="`background-image: url(${movie.cover})`"></div>
                        <div class="title">{{ movie.title }}</div>
                    </div>
                </div>
                <div class="empty" v-if="!list.length">暂时无历史记录噢...</div>
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
    height: 100%;
    .page_bd {
        height: 100%;
        background-color: #f5f5f5;
        .list {
            .item {
                padding: 5px 10px;
                margin-bottom: 5px;
                border-bottom: 1px solid #eee;
                background-color: #fff;
                display: flex;
                cursor: pointer;
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
        .empty {
            padding-top: 20px;
            text-align: center;
        }
    }
}

</style>