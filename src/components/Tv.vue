<template>
    <Layout :has_share="false" title="即将上映">
        <div class="page_wrap">
            <div class="page_bd">
                <div class="content">
                    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
                    <div class="list">
                        <MediaCard :media="tv_list"></MediaCard>
                    </div>
                    <mu-infinite-scroll :scroller="scroller" :loading="getLoading" @load="loadMore" />
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
            tv_list: [],
            pageIndex: 1,
            refreshing: false,
            scroller: null,
            trigger: null,
        };
    },
    created() {
        _self = this;
        this.getComingNewList();
    },
    activated() {
        this.trigger = this.$el
        this.scroller = this.$el // 滚动的元素
    },
    deactivated() {
        this.trigger = null;
        this.scroller = null;
    },
    methods: {
        getComingNewList() {
            let params = {};
            params.pageIndex = this.pageIndex || 1;
            params.pageSize = 20
            params.ts = new Date().getTime();
            params.locationId = this.city.id;
            this.loading = 'loading';
            this.$store.dispatch('getComingNewList', params).then(function(response) {
                let res = response.data.data;
                if (response.ok && response.status === 200) {
                    for(let item of res.movies) {
                        item.image = item.img;
                        item.title = item.movieTitle;
                    }
                    _self.loading = 'loaded';
                    if (params.pageIndex > 1) {
                        if (!res.hasMore) {
                            _self.loading = 'nomore';
                        } else {
                            _self.tv_list.push(...res.movies);
                        }
                    } else {
                        _self.tv_list = res.movies;
                        if (!res.movies.length) {
                            _self.loading = 'empty';
                        }
                    }
                } else {
                    _self.loading = 'error';
                }

            }).catch(function(err) {
                _self.loading = 'neterror';
                console.error(err);
            });
        },
        refresh() {
            this.pageIndex = 1;
            this.getComingNewList();
        },
        loadMore() {
            if ( this.loading != 'loaded') {
                return
            }
            this.pageIndex++;
            this.getComingNewList();
        },
    },
    computed: {
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
        MediaCard
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
    .page_bd {
        padding-top: @nav_bar/3;
        .content {
            position: relative;
        }
    }
}

</style>
