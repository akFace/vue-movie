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

// 全局路由拦截
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
                // 假设该请求后端返回错误代码为1是需要登录的，则跳转至登录页面
                let {fullPath} = store.state.route;
                router.push({path: '/user/login', query: {redirect: fullPath}});
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

    // 时光网api
    getTrailerList({ commit, state }, params) {
        return Vue.http.get('PageSubArea/TrailerList.api', { params });
    },
    // http://m.mtime.cn/Service/callback.mi/Movie/MovieComingNew.api?locationId=290&t=201851715513334306
    getComingNewList({ commit, state }, params) {
        return Vue.http.get('Movie/MovieComingNew.api', { params });
    },
    // http://m.mtime.cn/Service/callback.mi/Showtime/LocationMovies.api?locationId=290&t=201851715502658639
    getLocationMovies({ commit, state }, params) {
        return Vue.http.get('Showtime/LocationMovies.api', { params });
    },
    // http://m.mtime.cn/Service/callback.mi/movie/Detail.api?movieId=217497&locationId=290&t=201851716201928006
    getMovieDetail({ commit, state }, params) {
        return Vue.http.get('movie/Detail.api', { params });
    },
    // http://m.mtime.cn/Service/callback.mi/Showtime/MovieComments.api?movieId=217497&pageIndex=1&t=20185171611112771
    getMovieComments({ commit, state }, params) {
        return Vue.http.get('Showtime/MovieComments.api', { params });
    },

    // http://m.mtime.cn/Service/callback.mi/Movie/HotLongComments.api?movieId=217497&pageIndex=1&t=201852016544868515
    getHotLongComments({ commit, state }, params) {
        return Vue.http.get('Movie/HotLongComments.api', { params });
    },
    // http://m.mtime.cn/Service/callback.mi/Search/HotKeyWords.api?t=201851716235830291
    getSearchHotKeyWords({ commit, state }, params) {
        return Vue.http.get('Search/HotKeyWords.api', { params });
    },
    // http://m.mtime.cn/Service/callback.mi/Showtime/SearchVoice.api?keyword=%E5%A4%8D%E4%BB%87%E8%80%85%E8%81%94%E7%9B%9F3&pageIndex=1&searchType=3&locationId=290&t=201851716251789323
    getSearchVoice({ commit, state }, params) {
        return Vue.http.get('Showtime/SearchVoice.api', { params });
    },
    // http://m.mtime.cn/Service/callback.mi/Showtime/HotCitiesByCinema.api?t=20185192041974071
    getCityList({ commit, state }, params) {
        return Vue.http.get('Showtime/HotCitiesByCinema.api', { params });
    },
}
