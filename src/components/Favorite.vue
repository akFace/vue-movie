<template>
    <Layout class="favorite" :has_menu="false" :has_footer="false" title="收藏夹">
        <div class="menu" slot="bar_menu" >
            <mu-menu-item title="清空收藏" @click="clearFavorite" />
        </div>
        <div class="page_wrap">
            <div class="page_bd">
                <div class="list">
                    <div class="item" v-for="movie in list" :key="movie.id"
                            @click="jumpDetail(movie.movie_id)" 
                            @touchstart='touchStart(movie)'
                            @touchmove='touchMove'
                            @touchend='touchEnd'>
                        <div class="img" :style="`background-image: url(${movie.image})`"></div>
                        <div class="box">
                            <div class="tag" :class="`tag${movie.tag}`">{{ movie.tag | getType }}</div>
                            <div class="title">{{ movie.titleCn }}</div>
                        </div>
                    </div>
                </div>
                <div class="empty" v-if="!list.length">暂时无收藏噢...</div>
            </div>
            <mu-dialog class="dialog" :open="dialog" title="确定删除" @close="close">
                {{ tuch_item.titleCn }}
                <mu-flat-button slot="actions" @click="close" primary label="取消"/>
                <mu-flat-button slot="actions" primary @click="confirm" label="确定"/>
              </mu-dialog>
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
            timeOutEvent: 0,
            tuch_item: {},
            dialog: false,
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
        touchStart(movie) {
            this.tuch_item = movie;
            this.timeOutEvent = setTimeout(this.longPress,500);
            // e.preventDefault();
        },
        touchMove() {
            clearTimeout(this.timeOutEvent); 
                this.timeOutEvent = 0; 
        },
        touchEnd() {
            clearTimeout(this.timeOutEvent);
            if(this.timeOutEvent!=0){ 
                // alert("你这是点击，不是长按"); 
            } 
            return false; 
        },
        longPress() {
            // 长按触发
            this.timeOutEvent = 0;
            this.dialog = true;
        },
        close() {
            this.dialog = false;
        },
        confirm() {
            this.dialog = false;
            this.list = this.list.filter((item) => {
                return this.tuch_item.id !== item.id;
            });
            Store.set('favorite_list', this.list);
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
    not supported by any browser */
    .page_bd {
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
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Chrome/Safari/Opera */
                -khtml-user-select: none; /* Konqueror */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                not supported by any browser */
                .img {
                    width: 100px;
                    height: 60px;
                    background-repeat: no-repeat;
                    background-size: 100%;
                    -webkit-touch-callout: none; /* iOS Safari */
                    -webkit-user-select: none; /* Chrome/Safari/Opera */
                    -khtml-user-select: none; /* Konqueror */
                    -moz-user-select: none; /* Firefox */
                    -ms-user-select: none; /* Internet Explorer/Edge */
                    user-select: none; /* Non-prefixed version, currently
                    not supported by any browser */
                }
                .box {
                    flex: 1;
                    padding-top: 5px;
                    padding-left: 10px;
                    -webkit-touch-callout: none; /* iOS Safari */
                    -webkit-user-select: none; /* Chrome/Safari/Opera */
                    -khtml-user-select: none; /* Konqueror */
                    -moz-user-select: none; /* Firefox */
                    -ms-user-select: none; /* Internet Explorer/Edge */
                    user-select: none; /* Non-prefixed version, currently
                not supported by any browser */
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
    .dialog {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                not supported by any browser */
    }
}

</style>
<style lang="less">
    .favorite {
        .content_wrap {
            height: 100%;
            background: #f5f5f5;
        }
    }
</style>