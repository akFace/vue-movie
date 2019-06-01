<template>
  <div class="wrap">
    <h3>F2图表</h3>
    <canvas ref="chart_dom" id="myChart" width="100%" height="260" style="width: 100%;height: 260px"></canvas>
  </div>
</template>
<script>
let _self;
import F2 from '@antv/f2/lib/index';
require('@antv/f2/lib/interaction/pan');
// require('@antv/f2/lib/plugin/scroll-bar');
import '@antv/f2/lib/interaction/';

export default {
  data() {
    return {

    }

  },
  mounted() {
    this.initF2Chart();
  },
  methods: {
    initF2Chart() {
      // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      const data = [{
          "title": "Bohemian Rhapsody",
          "artist": "Queen",
          "release": 1975,
          "year": "1999",
          "rank": "1",
          "count": 978
        },
        {
          "title": "Hotel California",
          "artist": "Eagles",
          "release": 1977,
          "year": "1999",
          "rank": "2",
          "count": 1284
        },
        {
          "title": "Child In Time",
          "artist": "Deep Purple",
          "release": 1972,
          "year": "1999",
          "rank": "3",
          "count": 1117
        },
        {
          "title": "Stairway To Heaven",
          "artist": "Led Zeppelin",
          "release": 1971,
          "year": "1999",
          "rank": "4",
          "count": 1132
        },
        {
          "title": "Paradise By The Dashboard Light",
          "artist": "Meat Loaf",
          "release": 1978,
          "year": "1999",
          "rank": "5",
          "count": 1187
        },
        {
          "title": "Yesterday",
          "artist": "The Beatles",
          "release": 1965,
          "year": "1999",
          "rank": "6",
          "count": 909
        },
        {
          "title": "Angie",
          "artist": "The Rolling Stones",
          "release": 1973,
          "year": "1999",
          "rank": "8",
          "count": 1183
        },
        {
          "title": "Bridge Over Troubled Water",
          "artist": "Simon & Garfunkel",
          "release": 1970,
          "year": "1999",
          "rank": "9",
          "count": 1111
        },
        {
          "title": "A Whiter Shade Of Pale",
          "artist": "Procol Harum",
          "release": 1967,
          "year": "1999",
          "rank": "10",
          "count": 1190
        },
        {
          "title": "Hey Jude",
          "artist": "The Beatles",
          "release": 1968,
          "year": "1999",
          "rank": "11",
          "count": 1037
        }
      ];
      let chart_dom = this.$refs.chart_dom;
      var chart = new F2.Chart({
        id: chart_dom,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        // 设置缩放区域
        release: {
          min: 1966,
          max: 1970
        }
      });
      chart.axis('y', {
        label: {
          fill: '#fff'
        },
        grid: {
          lineDash: null,
          stroke: 'rgba(255, 255, 255, 0.2)'
        }
      });
      chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        background: {
          radius: 2,
          fill: '#1890FF',
          padding: [3, 5]
        },
        nameStyle: {
          fill: '#fff'
        },
        onShow: function onShow(ev) {
          var items = ev.items;
          items[0].name = items[0].title;
        }
      });
      chart.line().position('release*count');
      chart.point().position('release*count').style({
        lineWidth: 1,
        stroke: '#fff'
      });

      chart.interaction('pan');

      // 绘制 tag
      data.map(function(obj) {
        // 设置标记点
        chart.guide().tag({
          position: [obj.release, obj.count],
          withPoint: false,
          content: `${obj.count}°C`,
          limitInPlot: true,
          offsetX: 5,
          direct: 'cr'
        });
      });
      chart.render();
    }
  }

};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
