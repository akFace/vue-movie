import Vue from 'vue';
import VueResource from 'vue-resource';
import { API_ROOT } from '../config.js';
import store from './store';
import router from '../router';
import { Toast } from 'mint-ui';
Vue.use(VueResource);

// HTTP相关
Vue.http.options.crossOrigin = true;
Vue.http.options.timeout = 30 * 1000;
Vue.http.options.xhr = { withCredentials: true };
Vue.http.options.root = API_ROOT; // api地址请求前缀
Vue.http.interceptors.push(function(request, next) {
    request.params = request.params || {};
    let version_code = store.state.user.version_code
    if (version_code) {
        request.params.version = version_code;
    }
    next(function(response) {
        if (response.ok) {
            if (response.status === 200) {
                // 正常返回
            } else if (response.data.error === 1) {
                // 需要登录
            } else if (response.data.error === 4) {
                // 参数错误
                // alert(response.data.message);
            } else if (response.data.error === 5) {
                // 程序异常
                alert(response.data.message);
            }
        } else {
            Toast('获取数据失败...');
            console.error(`${response.status}-${response.statusText}\n${response.url}`)
        }
    });
});
export default {
    getAllList({ commit, state }, params) {
        return Vue.http.get('index', { params });
    },
    getFilmsDetail: function({ commit, state }, params) {
        return Vue.http.get('films/{film_id}', { params });
    },
    getFilms({ commit, state }, params) {
        return Vue.http.get('films', { params });
    },
    getTvList({ commit, state }, params) {
        return Vue.http.get('tvs', { params });
    },
    getTvDetail: function({ commit, state }, params) {
        return Vue.http.get('films/{tv_id}', { params });
    },
    // 参数 https://www.ifilm.ltdsearch?q=keyword
    getSearch({ commit, state }, params) {
        return Vue.http.get('search', { params });
    },
    postUserFavor({ commit, state }, params) {
        return Vue.http.post('user_favor', params);
    },
    deleteUserFavor({ commit, state }, params) {
        return Vue.resource('user_favor').delete(params, null);
    },
    
}
