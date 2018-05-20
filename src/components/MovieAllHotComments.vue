<template>
    <Layout :has_share="false" :has_footer="false" :title="movie.titleCn"  :has_menu="false">
        <div class="page_wrap">
            <div class="page_bd">
                <div class="content">
                    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
                    <div class="comments_box">
                        <div class="title">{{movie.titleCn}} - 精选影评共{{totalCount}}条</div>
                        <div class="list">
                            <div class="item" v-for="comment in hot_comments_list">
                                <div class="header_img" :style="`background-image: url(${comment.headurl})`"></div>
                                <div class="comment">
                                    <div class="nickname">
                                        <span class="name">{{comment.nickname}}</span>
                                        <mu-badge :content="`${comment.rating}分`" primary slot="after" />
                                    </div>
                                    <div class="comment_title">{{comment.title}}</div>
                                    <div class="text">{{comment.content}}</div>
                                </div>
                            </div>
                        </div>
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
            hot_comments_list: [],
            pageIndex: 1,
            refreshing: false,
            scroller: null,
            trigger: null,
            totalCount: 0,
            movie: {},
        };
    },
    created() {
        _self = this;
        this.getHotLongComments();
        this.getMovieDetail();
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
        getMovieDetail() {
            let params = {};
            params.movieId = this.$route.params.movie_id;
            params.ts = '201851015581118117';
            params.locationId = this.city.id;
            this.$store.dispatch('getMovieDetail', params).then(function(response) {
                let res = response.data;
                if (response.ok && response.status === 200) {
                    _self.movie = JSON.parse(res);
                } 
            }).catch(function(err) {
            });
        },
        getHotLongComments() {
            let params = {};
            params.movieId = this.$route.params.movie_id;
            params.ts = '201851015581118117';
            params.pageIndex = this.pageIndex || 1;
            this.loading = 'loading';
            this.$store.dispatch('getHotLongComments', params).then((response) => {
                let res = response.data;
                if (response.ok && response.status === 200) {
                    this.loading = 'loaded';
                    this.totalCount = res.totalCount;
                    if (params.pageIndex > 1) {
                        if (!res.comments.length) {
                            this.loading = 'nomore';
                        } else {
                            this.hot_comments_list.push(...res.comments);
                        }
                    } else {
                        this.hot_comments_list = res.comments;
                        if (!res.comments.length) {
                            this.loading = 'empty';
                        }
                    }
                } else {
                    this.loading = 'error';
                }

            }).catch(function(err) {
                _self.loading = 'neterror';
                console.error(err);
            });
        },
        refresh() {
            this.pageIndex = 1;
            this.getHotLongComments();
        },
        loadMore() {
            this.pageIndex++;
            this.getHotLongComments();
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
    .page_hd {}
    .page_bd {
        padding-top: @nav_bar/3;
        padding-bottom: @nav_bar;
        .content {
            position: relative;
            max-width: 1200px;
            margin: auto;
            background-color: #fff;
            .comments_box {
                .title {
                    padding: 15px;
                }
                padding-top: 20px;
                .list {
                    .item {
                        padding: 15px;
                        display: flex;
                        border-bottom: dashed 1px #eee;
                        &:nth-child(2n) {
                            background-color: #f2f2f2;
                        }
                        .header_img {
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            background-size: 100%;
                        }
                        .comment {
                            padding-left: 15px;
                            flex: 1;
                            .nickname {
                                padding-top: 5px;
                                padding-bottom: 10px;
                                .name {
                                    padding-right: 10px;
                                }
                            }
                            .comment_title {
                                padding-bottom: 5px;
                                font-weight: bold;
                            }
                            .text {
                                line-height: 28px;
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>
