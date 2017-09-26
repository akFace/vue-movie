<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
let _self;
import Store from 'storejs'
import def from '!raw-loader!muse-ui/dist/theme-default.css';
import light from '!raw-loader!muse-ui/dist/theme-light.css';
import dark from '!raw-loader!muse-ui/dist/theme-dark.css';
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css';
import teal from '!raw-loader!muse-ui/dist/theme-teal.css';

export default {
  name: 'app',
  data() {
    return {
      transitionName: '',
      themes: {
        def,
        light,
        dark,
        carbon,
        teal
      }
    }
  },
  watch: {
    // 页面切换过渡动画逻辑
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  created() {
    _self = this;
    this.setTheme();
  },
  methods: {
    setTheme() {
      let local_theme = Store.get('theme') || ''; // 获取本地主题
      const styleEl = this.getThemeStyle();
      styleEl.innerHTML = this.themes[local_theme] || '';
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
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
