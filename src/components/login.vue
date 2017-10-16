<template>
  <Layout :has_menu="false" :has_share="false" :has_footer="false" title="登录">
    <div class="login_box">
      <div class="login" v-if="!getIsLogin">
        <h3>您还未登录</h3>
        <mu-raised-button label="登录" @click="loginEvent" primary/>
      </div>
      <div class="login" v-else >
        <h3>您已经登录</h3>
        <mu-raised-button label="退出登录" @click="loginOut" primary/>
      </div>
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
    loginEvent() {
      // 利用vuex设置登录状态
      this.$store.commit('SET_IS_LOGIN', true);
      this.$router.push('/');
    },
    loginOut() {
      this.$store.commit('SET_IS_LOGIN', false);
    },
  },
  computed: {
    getIsLogin() {
      return this.$store.state.user.is_login
    }
  },
  components: {
    Layout,
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login_box {
  padding: 20px;
}

</style>
