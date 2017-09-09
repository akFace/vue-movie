<template>
    <Layout :has_menu="false" :has_footer="false" :has_share="false" title="设置">
        <div class="page_wrap">
            <div class="page_bd">
                <mu-list>
                  <mu-list-item title="使用侧边栏模式">
                    <mu-switch slot="right" label="" v-model="mod_switch" @change="modSwitch" />
                  </mu-list-item>
                  <mu-list-item title="主题色彩">
                    <mu-paper slot="right" class="paper" circle :zDepth="1" />
                  </mu-list-item>
                </mu-list>
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
            mod_switch: false,
        };
    },
    created() {
        _self = this;
        this.getModSwitch();
    },
    methods: {
        modSwitch(val) {
            Store.set('mod_switch', val);
        },
        getModSwitch() {
            let a = Store.get('mod_switch') || false;
            this.mod_switch = a;
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
        .paper {
            width: 20px;
            height: 20px;   
            background: -moz-linear-gradient(top, red 0%, blue 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,red), color-stop(100%,blue));
            background: -webkit-linear-gradient(top, red 0%,blue 100%);
            background: -o-linear-gradient(top, red 0%,blue 100%);
            background: -ms-linear-gradient(top, red 0%,blue 100%);
            background: linear-gradient(to bottom, red 0%,blue 100%);
        }
    }
}

</style>