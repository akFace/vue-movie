<template>
  <Layout :has_menu="false" :has_footer="false" title="关于我">
    <div class="wrap">
        <h4>基于vue2.0开发</h4>
        <h5>最新最好看的电影APP</h5>
        <h6>开源项目：<a href="https://github.com/kang558/vue-movie">GitHub</a></h6>
    </div>
  </Layout>
</template>

<script>
let _self;
import Layout from '@/components/Layout';

export default {
    data: function() {
        return {
            
        };
    },
    created() {
        _self = this;
    },
    mounted() {
        
    },
    methods: {
        
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
  .wrap {
    text-align: center;
    padding-top: 30px;
  }
</style>
