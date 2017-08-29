const state = {
    is_login: false,
    self_user: {},
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
}

export default {
    state,
    mutations
}
