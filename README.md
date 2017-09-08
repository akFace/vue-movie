## 基于vue2.0构建的在线电影网【film】，webpack+vue+vuex+keepAlive+muse-ui+cordova 全家桶，打包成APP

[在线demo](http://www.66re.cn/movie)

## 屏幕截图，该项目使用了响应式布局，适配全分辨率的屏幕
![美丽花儿](http://ww2.sinaimg.cn/large/56d258bdjw1eugeubg8ujj21kw16odn6.jpg "美丽花儿")

<figure class="half">
    <img src="http://ww2.sinaimg.cn/large/56d258bdjw1eugeubg8ujj21kw16odn6.jpg" width="200">
    <img src="http://ww2.sinaimg.cn/large/56d258bdjw1eugeubg8ujj21kw16odn6.jpg" width="200">
</figure>

```
# web目录结构

├─build                 # build配置目录
├─config                # 相关配置
├─screenshot            # 屏幕截图
├─src                   # 项目源码主目录	
│  ├─assets             # 资源
│  │  └─less            # less通用文件目录
│  ├─components         # 页面及其组件
│  ├─router             # 路由
│  └─vuex               # vuex，其中包含了全局api，状态管理器
│      └─modules        # moduless
├─static                # 外部资源引入
│  ├─css                # 外部样式
│  │  ├─font            # 字体图标
│  │  └─woff            # 字体图标
│  └─js                 # 外部js	
└─test                  # 测试用，不用管这个
    ├─e2e
    │  ├─custom-assertions
    │  └─specs
    └─unit
        └─specs

```

> A Vue.js project

## Build Setup

``` bash
## install dependencies
npm install

## serve with hot reload at localhost:8083
npm run dev

## build for production with minification
npm run build


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
