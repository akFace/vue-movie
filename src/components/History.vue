<template>
    <Layout class="history" :has_menu="false" :has_footer="false" title="观看历史">
        <div class="menu" slot="bar_menu" >
            <mu-menu-item title="清空观看历史" @click="clearHistory" />
        </div>
        <div class="page_wrap">
            <div class="page_bd">
                <h5 class="title">仅显示最近浏览的30条数据</h5>
                <div class="list">
                    <div class="item" v-for="movie in list" @click="jumpDetail(movie.movie_id)" :key="movie.id">
                        <div class="img" :style="`background-image: url(${movie.image})`"></div>
                        <div class="box">
                            <div class="title">{{ movie.titleCn }}</div>
                        </div>
                    </div>
                </div>
                <div class="empty" v-if="!list.length">暂时无观看历史噢...</div>
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
            this.list = Store.get('view_list') || [];
        },
        clearHistory() {
            Store.remove('view_list');
            this.list = [];
            Toast({
              message: '已清空观看历史',
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
        background-color: #f5f5f5;
        .title {
            padding: 10px 0 0 5px;
            font-size: 12px;
            color: #999;
        }
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
                        padding: 0;
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

<style lang="less">
    .history {
        .content_wrap {
            background: #f5f5f5;
        }
    }
</style>