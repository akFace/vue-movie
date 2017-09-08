<template>
    <Layout :has_menu="false" :has_footer="false" title="收藏夹">
        <div class="menu" slot="bar_menu" >
            <mu-menu-item title="清空收藏" @click="clearFavorite" />
        </div>
        <div class="page_wrap">
            <div class="page_bd">
                <div class="list">
                    <div class="item" v-for="movie in list" @click="jumpDetail(movie.id)">
                        <div class="img" :style="`background-image: url(${movie.cover})`"></div>
                        <div class="box">
                            <div class="tag" :class="`tag${movie.tag}`">{{ movie.tag | getType }}</div>
                            <div class="title">{{ movie.title }}</div>
                        </div>
                    </div>
                </div>
                <div class="empty" v-if="!list.length">暂时无收藏噢...</div>
            </div>
        </div>
    </Layout>
</template>
<script>
let _self;
import Layout from '@/components/Layout';
import { Toast } from 'mint-ui';
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
            this.list = Store.get('favorite_list') || [];
        },
        clearFavorite() {
            Store.remove('favorite_list');
            this.list = [];
            Toast({
              message: '已清空收藏夹',
              position: 'bottom',
              duration: 3000
            });
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
            padding-top: 10px;
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
                .box {
                    flex: 1;
                    padding-top: 5px;
                    padding-left: 10px;
                    .title {
                        .ellipsisLn(2);
                    }
                    .tag {
                        padding: 0 5px;
                        display: inline-block;
                        color: #fff;
                        background-color: #f60;
                        border-radius: 3px;
                        font-size: 8px;
                        &.tag1 {
                            background-color: #00bcd4;
                        }
                        &.tag2 {
                            background-color: #ff4081;
                        }
                    }
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