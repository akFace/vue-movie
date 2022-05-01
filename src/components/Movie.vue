<template>
    <Layout :has_share="false" title="正在热映">
        <div class="page_wrap">
            <div class="page_bd">
                <div class="content">
                    <!-- 下拉刷新 -->
                    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
                    <div class="list">
                        <!-- 渲染列表通用电影卡片 -->
                        <MediaCard :media="films"></MediaCard>
                    </div>
                    <!-- 滚动到底部加载更多 -->
                    <mu-infinite-scroll :scroller="scroller" :loading="getLoading" @load="loadMore"/>
                </div>
            </div>
        </div>
    </Layout>
</template>
<script>
let _self;
import Layout from '@/components/Layout';
import MediaCard from '@/components/MediaCard';

export default {
    data: function() {
        return {
            loading: 'init',
            films: [],
            page: 1,
            refreshing: false,
            scroller: null,
            trigger: null,
        };
    },
    created() {
        _self = this;
        this.getLocationMovies();
    },
    activated() {
        this.trigger = this.$el;
        this.scroller = this.$el; // 滚动的元素
    },
    deactivated() {
        this.trigger = null;
        this.scroller = null;
    },
    methods: {
        getLocationMovies() {
            let params = {};
            params.ts = new Date().getTime();
            params.locationId = this.city.id;
            this.loading = 'loading';
            this.$store.dispatch('getLocationMovies', params).then((response) => {
                let res = response.data.data;
                if (response.ok && response.status === 200) {
                    this.loading = 'loaded';
                    for(let item of res.moviecomings) {
                        item.image = item.imgUrl;
                    }
                    this.films = res.moviecomings
                    
                } else {
                    this.loading = 'error';
                }

            }).catch(function(err) {
                console.error(err);
            });
        },
        refresh() {
            // 下拉刷新
            this.page = 1;
            this.getLocationMovies();
        },
        loadMore() {
            // 加载更多
            this.page++;
            this.getLocationMovies();
        },
    },
    computed: {
        // 判断loading状态
        getLoading() {
            if (this.loading === 'loading') {
                return true;
            } else {
                return false;
            }
        },
        city() {
          return this.$store.state.user.city;
        },
    },
    components: {
        Layout,
        MediaCard,
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/less/common.less');
.page_wrap {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    .page_hd {}
    .page_bd {
        padding-top: @nav_bar/3;
        .content {
            position: relative;
        }
    }
}
</style>