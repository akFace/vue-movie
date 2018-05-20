<template>
  <Layout :has_menu="false" :has_footer="false" :title="movie.titleCn" class="movie_detail">
    <div class="menu" slot="bar_menu">
      <mu-menu-item title="分享" @click="shareMovie" />
      <mu-menu-item title="收藏" @click="saveMovie" />
    </div>
    <div class="page_wrap">
      <div class="page_hd" v-if="loading === 'loaded'">
        <div class="media_info_wrp">
          <div class="media_info">
            <div class="info_box">
              <div class="info_img">
                <img :src="movie.image" class="pos_img">
              </div>
              <div class="info_text">
                <div class="title">
                  <span>{{movie.titleCn}} ({{movie.year}})</span>
                  <span class="media_tags">
                    <span class="tag" v-for="tag in movie.type">{{tag}}</span>
                  </span>
                </div>
                <div class="en_title">{{movie.titleEn}}</div>
                <div class="type_tag">
                  <span>{{movie.runTime}}</span>
                  <span>{{movie.release.date}} </span>
                  <span>{{movie.release.location}}上映 - </span>
                  <span v-if="movie.is3D">3D</span>
                  <span v-if="!movie.is3D">2D</span>
                  <span v-if="movie.isIMAX">/ IMAX</span>
                  <span v-if="movie.isIMAX3D">/ IMAX3D</span>
                  <span v-if="movie.isDMAX">/ 中国巨幕</span>
                </div>
                <div class="intro">
                  <div class="list">
                    <div class="item">
                      <div class="title">导演：</div>
                      <div class="name"><span v-for="director in movie.directors">{{director}}</span></div>
                    </div>
                    <div class="item">
                      <div class="title">演员：</div>
                      <div class="name"><span v-for="actor in movie.actors">{{actor}}、</span>...</div>
                    </div>
                  </div>
                  <div class="intro_text">剧情：{{movie.content}}</div>
                </div>
                <div class="rating" v-if="movie.rating > 0"><span class="value">{{movie.rating}}</span>分</div>
              </div>
            </div>
          </div>
          <div class="media_bg">
            <div class="pos_bg" :style="`background-image: url(${movie.image})`"></div>
          </div>
        </div>
      </div>
      <div class="page_bd" v-if="loading === 'loaded'">
        <div class="content">
          <div class="title">预告片：</div>
          <div class="video_list"></div>
        </div>
      </div>
      <div class="page_ft">
        <mu-dialog :open="dialog" title="分享到" @close="close">
          <div id="soshid"></div>
          <mu-flat-button slot="actions" @click="close" primary label="关闭" />
        </mu-dialog>
      </div>
      <div class="loading_box">
        <mu-circular-progress :size="45" v-if="loading === 'loading'" />
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
      movie: {},
      current_src: '',
      loading: 'init',
      Dplayer: null,
      dialog: false,
    };
  },
  created() {
    _self = this;
    this.getMovieDetail();
  },
  activated() {
    // this.resetData()
    // this.getMovieDetail();
  },
  methods: {
    resetData() {
      this.movie = {};
      this.current_src = '';
    },
    changeSource(item) {
      this.current_src = item.src;
      this.initDplayer();
    },
    initDplayer() {
      let Dplayer_dom = this.$refs.Dplayer_dom;
      this.Dplayer = new DPlayer({
        element: Dplayer_dom,
        video: {
          url: _self.current_src,
          // pic: _self.movie.cover,
          autoplay: true,
          lang: 'zh',
          screenshot: true,
          hotkey: true,
          preload: 'auto',
        },
        // 加载弹幕
        // danmaku: {
        //     id: '1',
        //     api: 'https://api.prprpr.me/dplayer/'
        // },
        contextmenu: [{
          text: '版本: v1.5.0',
          link: 'https://github.com/MoePlayer/DPlayer/releases'
        }, {
          text: 'HTML5视频播放器',
          link: 'https://github.com/DIYgod/DPlayer'
        }]
      });
    },
    getMovieDetail() {
      let params = {};
      params.movieId = this.$route.params.movie_id;
      params.ts = '201851015581118117';
      params.locationId = this.city.id;
      this.loading = 'loading';
      this.$store.dispatch('getMovieDetail', params).then(function(response) {
        let res = response.data;
        if (response.ok && response.status === 200) {
          _self.loading = 'loaded';
          _self.movie = JSON.parse(res);
          _self.$nextTick(() => {
            _self.saveHistory();
          })
        } else {
          _self.loading = 'loaded';
        }

      }).catch(function(err) {
        _self.loading = 'loaded';
      });
    },
    saveHistory() {
      let arr = [];
      arr = Store.get('view_list');
      if (arr) {
        arr = arr.filter((item) => {
          return item.id != _self.movie.id;
        })
        arr.unshift(this.movie);
        // 仅仅保留最近浏览的30个数据
        if (arr.length >= 30) {
          arr = arr.slice(0, 30);
        }
      } else {
        arr = [];
        arr.unshift(this.movie);
      }
      Store.set('view_list', arr);
    },
    saveMovie() {
      let arr = [];
      arr = Store.get('favorite_list');
      if (arr) {
        arr = arr.filter((item) => {
          return item.id != _self.movie.id;
        })
        arr.unshift(this.movie);
      } else {
        arr = [];
        arr.unshift(this.movie);
      }
      Store.set('favorite_list', arr);
      Toast({
        message: '已收藏',
        position: 'bottom',
        duration: 3000
      });
    },
    shareMovie() {
      let router_path = this.$route.path;
      if (this.isCordova) {
        this.initCordovaShare();
      } else {
        this.dialog = true;
        this.initWebShare();
      }

    },
    close() {
      this.dialog = false;
    },
    initCordovaShare() {
      let opt = {};
      opt.url = location.href;
      opt.message = `《${this.movie.title}》在线观看_电视剧_美剧_免费电影在线看_2017最新电影`;
      window.plugins.socialsharing.shareWithOptions(opt, (onSuccess) => {
        console.log(onSuccess);
      }, (onError) => {
        console.log(onError);
      });
    },
    initWebShare() {
      let opt = {};
      opt.url = location.href;
      opt.title = `《${this.movie.title}》在线观看_电视剧_美剧_免费电影在线看_2017最新电影`;
      opt.pic = this.movie.cover;
      opt.digest = '';
      opt.sites = ['weixin,', 'weibo', 'qzone', 'tqq', 'douban', 'tieba'];

      this.$nextTick(() => {
        sosh('#soshid', opt)
      })
    },
  },
  computed: {
    isCordova() {
      return this.$store.state.user.is_cordova;
    },
    city() {
      return this.$store.state.user.city;
    },
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

  margin: 0 auto;
  .page_hd {
    .media_info_wrp {
      position: relative;
      .media_info {
        position: relative;
        margin: 0 auto;
        z-index: 101;
        top: 70px;
        width: 1200px;
        .info_box {
          display: flex;
          flex-wrap: wrap;
          color: #eee;
          .info_img {
            .pos_img {
              width: 225px;
              height: auto;
              display: block;
              border-radius: 4px;
            }
          }

          .info_text {
            padding-left: 20px;
            .title {
              padding-top: 5px;
              display: inline-block;
              font-size: 20px;
              line-height: 22px;
              font-weight: 700;
              white-space: nowrap;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              .media_tags {
                display: inline-block;
                margin-left: 20px;
                vertical-align: top;
                .tag {
                  font-size: 12px;
                  display: inline-block;
                  vertical-align: middle;
                  margin-right: 10px;
                  height: 20px;
                  padding: 0 4px;
                  line-height: 20px;
                  border: 1px solid #fff;
                  border-radius: 3px;
                }
              }
            }
            .en_title {
              color: #fff;
              font-size: 17px;
            }
            .type_tag {
              padding-top: 15px;
            }
            .intro {
              .list {
                padding-top: 15px;
                .item {
                  margin-bottom: 5px;
                  .title {
                    padding-top: 0;
                    font-size: 15px;
                    font-weight: normal;
                  }
                  display: flex;
                }
              }
              .intro_text {
                max-width: 800px;
                padding-top: 15px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
              }
            }
            .rating {
              padding-top: 10px;
              .value {
                padding-right: 5px;
                font-weight: bold;
                font-size: 40px;
              }
            }
          }
        }
      }
      .media_bg {
        height: 520px;
        width: 100%;
        position: absolute;
        overflow: hidden;
        top: -70px;
        left: 0;
        transform: translateZ(0);
        &:after {
          display: block;
          content: '';
          height: 600px;
          width: 100%;
          position: absolute;
          overflow: hidden;
          top: -70px;
          left: 0;
          z-index: 11;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .pos_bg {
          position: absolute;
          background-size: cover;
          background-position: 50%;
          width: 110%;
          min-width: 1120px;
          height: 496px;
          top: 50%;
          left: 50%;
          margin: -260px -55%;
          z-index: 10;
          background-repeat: no-repeat;
          -webkit-filter: blur(40px);
          -moz-filter: blur(40px);
          -ms-filter: blur(40px);
          filter: blur(40px);
          filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
        }
      }
    }
  }
  .page_bd {
    padding-top: 200px;
    .content {
      max-width: 1200px;
      margin: auto;
      .player_box {
        padding: 15px;
        width: 100%;
        overflow: hidden;
      }
      .btn_box {
        padding: 30px;
        text-align: center;
        .btn {
          margin-right: 15px;
          margin-bottom: 15px;
          &.active {
            opacity: 0.7;
            filter: alpha(opacity=70);
          }
        }
      }
    }
  }
  .page_ft {}
  .loading_box {
    text-align: center;
    padding-top: 40px;
  }
}

</style>
<style scoped lang="less">
@import url('../assets/less/common.less');
// 响应式布局，流式布局
// 导航栏响应式

/* 大屏幕（大桌面显示器，最小宽度 1200px） */

@media (min-width: @screen_mg_min) {
  .page_wrap {
    margin: 0 auto;
    .page_bd {}
  }
}







/* 大屏幕（大桌面显示器，大于等于 1200px） */

@media (max-width: @screen_lg_min) {
  .page_wrap {
    .page_bd {}
  }
}







/* 中等屏幕（桌面显示器，大于等于 992px） */

@media (max-width: @screen_md_min) {
  .page_wrap {
    .page_bd {}
  }
}








/* 小屏幕（平板，大于等于 768px） */

@media (max-width: @screen_sm_min) {
  .page_wrap {
    .page_bd {}
  }
}








/* 小屏幕（手机，大于等于 640px） */

@media (max-width: @screen_mi_min) {
  .page_wrap {
    width: 100%!important;
    .page_bd {}
  }
}

</style>
<style lang="less">
.movie_detail {
  .mu-appbar {
    background-color: transparent!important;
  }
}

</style>
