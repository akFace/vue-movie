<template>
  <Layout :has_menu="false" :has_footer="false" :has_share="false" title="设置">
    <div class="page_wrap">
      <div class="page_bd">
        <mu-list>
          <mu-list-item title="使用侧边栏模式">
            <mu-switch slot="right" label="" v-model="mod_switch" @change="modSwitch" />
          </mu-list-item>
          <mu-list-item title="主题色彩" @click="setTheme">
            <mu-paper slot="right" class="paper" circle :zDepth="1" />
          </mu-list-item>
        </mu-list>
        <mu-dialog :open="dialog" title="选择主题">
          <span v-for="(item, i) in themes" @click="changeTheme(i)">
                <mu-paper class="themes_paper" circle :zDepth="1" :class="`themes_${i}`"></mu-paper>
            </span>
          <mu-flat-button slot="actions" @click="closeDialog" primary label="关闭" />
        </mu-dialog>
      </div>
    </div>
  </Layout>
</template>
<script>
let _self;
import Layout from '@/components/Layout';
import { Toast } from 'mint-ui';
import Store from 'storejs'

import def from '!raw-loader!muse-ui/dist/theme-default.css';
import light from '!raw-loader!muse-ui/dist/theme-light.css';
import dark from '!raw-loader!muse-ui/dist/theme-dark.css';
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css';
import teal from '!raw-loader!muse-ui/dist/theme-teal.css';

export default {
  data: function() {
    return {
      mod_switch: false,
      dialog: false,
      theme: 'light',
      themes: {
        def,
        light,
        dark,
        carbon,
        teal
      }
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
    setTheme() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    changeTheme(theme) {
      this.theme = theme;
      const styleEl = this.getThemeStyle();
      styleEl.innerHTML = this.themes[theme] || '';
      Store.set('theme', theme);
    },
    getThemeStyle() {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.body.appendChild(styleEl)
      return styleEl
    }
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
      display: inline-block;
      width: 20px;
      height: 20px;
      background: -moz-linear-gradient(top, red 0%, blue 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, red), color-stop(100%, blue));
      background: -webkit-linear-gradient(top, red 0%, blue 100%);
      background: -o-linear-gradient(top, red 0%, blue 100%);
      background: -ms-linear-gradient(top, red 0%, blue 100%);
      background: linear-gradient(to bottom, red 0%, blue 100%);
    }
  }
}

</style>
<style>
.themes_paper {
  display: inline-block;
  margin-left: 10px;
  width: 20px;
  height: 20px;
}

.themes_def {
  background: #7e57c2!important;
}
.themes_light {
  background: #2196f3!important;
}

.themes_dark {
  background: #424242!important;
}

.themes_carbon {
  background: #474a4f!important;
}

.themes_teal {
  background: #009688!important;
}

</style>
