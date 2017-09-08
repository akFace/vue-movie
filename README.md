### 基于vue2.0构建的在线电影网【film】，webpack+vue+vuex+keepAlive+muse-ui+cordova 全家桶，cordova 打包成APP

### [在线demo](http://www.66re.cn/movie)   
###### apk安装包后续再放出吧 O(∩_∩)O

### 屏幕截图，该项目使用了响应式布局，适配全分辨率的屏幕
#### 移动端效果
<figure class="half">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/01.png" width="400">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/03.png" width="400">
</figure>
#### PC端效果

<figure class="center">
    <img src="https://raw.githubusercontent.com/kang558/vue-movie/master/screenshot/pc.png">
</figure>


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
