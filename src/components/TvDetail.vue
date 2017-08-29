<template>
    <Layout :has_menu="false" :has_footer="false" :title="getTitle">
        <div class="page_wrap">
            <div class="page_hd">
            </div>
            <div class="page_bd">
                <div class="content" v-if="movie.title">
                    <mu-card>
                        <mu-card-media title="" subTitle="">
                            <div class="player_box">
                                <div class="cover" :style="'background-image: url(' + movie.cover + ')'" v-if="!show_video" @click="playVideo">
                                    <span class="cover_bg"></span>
                                    <span class="icon_player"><mu-icon value="play_circle_outline" :size="60"/></span>
                                </div>
                                <div class="player" v-if="show_video">
                                    <video :src="current_src" autoplay controls></video>
                                </div>
                            </div>
                        </mu-card-media>
                        <mu-card-title :title="movie.title" subTitle="" />
                    </mu-card>
                    <div class="btn_box" v-if="movie.src && movie.src.length">
                        <mu-raised-button class="demo-raised-button btn" v-for="(item, i) in movie.src" :key="item" primary @click="changeSource(item)">
                            <span>{{ i+1 }}</span>
                        </mu-raised-button>
                    </div>
                </div>
                <div class="loading_box">
                    <mu-circular-progress :size="45" v-if="loading === 'loading'" />
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

export default {
    data: function() {
        return {
            movie: {},
            current_src: '',
            show_video: false,
            loading: 'init',
        };
    },
    created() {
        _self = this;
        this.getTvDetail();
    },
    mounted() {

    },
    methods: {
        playVideo() {
            this.show_video = true;
            this.current_src = this.movie.src[0];
        },
        changeSource(item) {
            this.show_video = true;
            this.current_src = item;
        },
        getTvDetail() {
            let params = {};
            params.tv_id = this.$route.params.tv_id;
            this.loading = 'loading';
            this.$store.dispatch('getTvDetail', params).then(function(response) {
                let res = response.data;
                if (response.ok && response.status === 200) {
                    _self.loading = 'loaded';
                    _self.movie = res;
                } else {
                    _self.loading = 'loaded';
                }

            }).catch(function(err) {
                _self.loading = 'loaded';
            });
        },

    },
    computed: {
        getTitle() {
            if (!this.show_video) {
                return this.movie.title;
            } else {
                return '正在播放：' + this.movie.title;
            }
        }
    },
    components: {
        Layout,
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page_wrap {
    .page_hd {}
    .page_bd {
        .content {
            .player_box {
                padding: 15px;
                width: 100%;
                height: 300px;
                overflow: hidden;
                .cover {
                    position: relative;
                    width: 100%;
                    height: 300px;
                    background-repeat: no-repeat;
                    background-size: cover;
                    border-radius: 6px;
                    .icon_player {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        margin: auto;
                        color: #fff;
                        text-align: center;
                    }
                    .cover_bg {
                        display: inline-block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                    }
                }
                .player {
                    width: 100%;
                    height: 280px;
                    background: #555;
                    border-radius: 3px;
                    video {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .btn_box {
                padding: 30px;
                text-align: center;
                .btn {
                    margin-right: 15px;
                    margin-bottom: 15px;
                }
            }
        }
        .loading_box {
            text-align: center;
            padding-top: 40px;
        }
    }
    .page_ft {}
}

</style>
