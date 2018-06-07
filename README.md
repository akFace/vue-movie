### 基于vue2.0构建的在线电影网【film】，webpack + vue + vuex + vue-loader + keepAlive + muse-ui + cordova 全家桶，cordova 打包成APP

从零开始搭建，适合新手练手参考。api来源于网上，仅供开发参考之用，禁用于商业，否则后果自负。

### [在线demo](http://www.66re.cn/movie)   已经更换成时光网，因为时光网API防跨域原因，需要查看效果的可以clone下来本地运行体验哦。在线的不支持了，另外需要看旧版的可以切换到 [tag-0.1分支](https://github.com/kang558/vue-movie/tree/tag-0.1)
###### apk安装包 下载：[android-x86-debug.apk](http://oemc3y518.bkt.clouddn.com/android-x86-debug.apk) | 下载：[android-armv7-debug](http://oemc3y518.bkt.clouddn.com/android-armv7-debug.apk)

### 扫描二维码下载  
###### （请勿使用微信扫一扫）
<figure class="center">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/qr.png">
</figure>

### 屏幕截图，该项目使用了响应式布局，适配全分辨率的屏幕

#### 动图演示
<figure class="center">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/movie.gif" width="400">
</figure>

#### 移动端效果（非侧边栏模式）
<figure class="half">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/01.png" width="400">
</figure>

#### 启用侧边栏模式
<figure class="center">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/04.png" width="400">
</figure>

#### PC端效果
<figure class="center">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/pc.png">
</figure>

### 主要特色：

1. 组件化开发
2. 下拉刷新
3. 无限加载
4. 浏览历史
5. 响应式布局
6. 缓存数据
8. 收藏
9. 视频播放
10. md风格模式
11. 主题更换
12. 长按删除
13. 开发中...

### 目录结构
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

### 运行 

```
npm install

npm run dev

npm run build

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### License

[MIT](https://opensource.org/licenses/MIT)
