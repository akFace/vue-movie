<template>
  <Layout :has_share="false">
    <div class="wrap">
        <mu-list>
          <mu-list-item title="观看历史" to="/history">
            <mu-icon slot="left" value="history"/>
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
          <mu-list-item title="我的收藏" to="/favorite">
            <mu-icon slot="left" value="favorite"/>
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
          <mu-list-item title="关于" to="/about">
            <mu-icon slot="left" value="timeline"/>
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
        </mu-list>
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

</style>
