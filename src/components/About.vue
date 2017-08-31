<template>
  <Layout :has_menu="false" :has_footer="false" title="关于我">
    <div class="wrap">
        <h5>最新最好看的电影APP v1.0.1</h5>
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
