<template>
    <Layout :has_share="false" title="综合">
        <div class="page_wrap">
            <div class="page_bd">
                <div class="content" v-if="loading !== 'loading'">
                    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
                    <div class="list">
                        <div class="title">
                            <h4 class="type">电影</h4>
                        </div>
                        <MediaCard :media="movies"></MediaCard>
                        <div class="more" @click="jumpMovie">查看更多...</div>
                    </div>
                    <div class="list">
                        <div class="title">
                            <h4 class="type">电视剧</h4>
                        </div>
                        <MediaCard :media="tvs"></MediaCard>
                        <div class="more" @click="jumpTv">查看更多...</div>
                    </div>
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
            movies: [],
            tvs: [],
            page: 1,
            refreshing: false,
            trigger: null,
        };
    },
    created() {
        _self = this;
        this.getAllList();
    },
    mounted() {
        this.trigger = this.$el
    },
    methods: {
        getAllList() {
            let params = {};
            params.page = this.page || 1;
            this.loading = 'loading';
            this.$store.dispatch('getAllList', params).then(function(response) {
                let res = response.data;
                if (response.ok && response.status === 200) {
                    _self.loading = 'loaded';
                    if (params.page > 1) {
                        _self.movies.push(...res.movies);
                        _self.tvs.push(...res.tvs);
                    } else {
                        _self.movies = res.movies;
                        _self.tvs = res.tvs;
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
            this.getAllList();
        },
        jumpMovie() {
            this.$router.push('/movie')
        },
        jumpTv() {
            this.$router.push('/tv')
        }
    },
    computed: {
        getLoading() {
            if (this.loading === 'loaded') {
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
        // padding-top: @nav_bar/3;
        .title {
            margin: 10px 0;
            text-align: left;
            border-bottom: 1px solid #eee;
            
            .type {
                padding: 10px;
                background: #fff;
            }
        }
        .content {
            .list {
                text-align: center;
            }
        }
        .more {
            padding-bottom: 30px;
            cursor: pointer;
        }
    }
}
</style>