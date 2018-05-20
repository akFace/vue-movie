<template>
    <Layout :has_share="false" title="综合">
        <div class="page_wrap">
            <div class="page_bd">
                <div class="content" v-if="loading !== 'loading'">
                    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
                    <div class="list">
                        <div class="title">
                            <mu-list class="mulist">
                                <mu-list-item :title="`正在热映${movies.total}部`" to="movie">
                                    <mu-icon slot="right" value="keyboard_arrow_right" />
                                </mu-list-item>
                            </mu-list>
                        </div>
                        <MediaCard :media="movies.ms"></MediaCard>
                    </div>
                    <div class="list">
                        <div class="title">
                            <mu-list class="mulist">
                                <mu-list-item :title="`即将上映${movies.totalComingMovie}部`" to="tv">
                                    <mu-icon slot="right" value="keyboard_arrow_right" />
                                </mu-list-item>
                            </mu-list>
                        </div>
                        <MediaCard :media="tvs"></MediaCard>
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
        this.getLocationMovies();
        this.getComingNewList();
    },
    mounted() {
        this.trigger = this.$el
    },
    methods: {
        getLocationMovies() {
            let params = {};
            params.ts = '201851015581118117';
            params.locationId = this.city.id;
            this.loading = 'loading';
            this.$store.dispatch('getLocationMovies', params).then((response) => {
                let res = response.data;
                if (response.ok && response.status === 200) {
                    this.loading = 'loaded';
                    this.movies = res;
                    this.movies.total = res.ms.length;
                    this.movies.ms = res.ms.slice(0, 9);
                    for(let item of this.movies.ms) {
                        item.title = item.tCn;
                        item.image = item.img;
                    }
                } else {
                    this.loading = 'error';
                }

            }).catch(function(err) {
                console.error(err);
            });
        },
        getComingNewList() {
            let params = {};
            params.ts = '201851015581118117';
            params.locationId = this.city.id;
            this.$store.dispatch('getComingNewList', params).then((response) => {
                let res = response.data;
                if (response.ok && response.status === 200) {
                    this.tvs = res.moviecomings.slice(0, 9);
                    // this.movies.ms = res.ms.slice(0, 9);
                } 

            }).catch(function(err) {
                console.error(err);
            });
        },
        refresh() {
            this.getLocationMovies();
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
        // padding-top: @nav_bar/3;
        padding-bottom: @nav_bar;
        .title {
            margin: 10px 0;
            text-align: left;
            border-bottom: 1px solid #eee;

            .type {
                padding: 10px;
                background: #fff;
            }
        }
        .mulist {
            background-color: #fff;
        }
        .content {
            position: relative;
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
