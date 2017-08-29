<template>
    <Layout :has_share="false" title="电影">
        <div class="page_wrap">
            <div class="page_hd">
            </div>
            <div class="page_bd">
                <div class="content">
                    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
                    <div class="list">
                        <MediaCard :media="films"></MediaCard>
                    </div>
                    <mu-infinite-scroll :scroller="scroller" :loading="getLoading" @load="loadMore"/>
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
        this.getFilms();
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
        getFilms() {
            let params = {};
            params.page = this.page || 1;
            this.loading = 'loading';
            this.$store.dispatch('getFilms', params).then(function(response) {
                let res = response.data;
                if (response.ok && response.status === 200) {
                    _self.loading = 'loaded';
                    if (params.page > 1) {
                        if (!res.data.length) {
                            _self.loading = 'nomore';
                        } else {
                            _self.films.push(...res.data);
                        }
                    } else {
                        _self.films = res.data;
                        if (!res.data.length) {
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
            this.page = 1;
            this.getFilms();
        },
        loadMore() {
            this.page++;
            this.getFilms();
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
            .list {
                text-align: center;
                .item {
                    display: inline-block;
                    width: 45%;
                    margin: 10px 5px;
                }
            }
        }
    }
    .page_ft {}
}


</style>
<style lang="less">
    .movie_title {
        font-size: 18px!important;
        line-height: 24px!important;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>