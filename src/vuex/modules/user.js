const state = {
    is_login: false,
    self_user: {},
    is_cordova: false,
    city: {
        "count": 209,
        "id": 290,
        "n": "北京",
        "pinyinFull": "Beijing",
        "pinyinShort": "bj"
    }
}

// mutations
const mutations = {
    'SET_SELF_USER' (state, user) {
        state.self_user = user;
    },

    'SET_IS_LOGIN' (state, is_login) {
        state.is_login = is_login;
    },
    'UPDATE_SELF_USER' (state, userinfo) {
        for (let key in userinfo) {
            state.self_user[key] = userinfo[key];
        }

    },
    'SET_IS_CORDOVA' (state, is_cordova) {
        state.is_cordova = is_cordova;
    },
    'SET_CITY' (state, city) {
        state.city = city;
    },
}

export default {
    state,
    mutations
}
