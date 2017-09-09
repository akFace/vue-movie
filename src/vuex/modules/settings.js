const state = {
    mod_switch: false,
}

// mutations
const mutations = {
    
    'SET_MOD_SWITCH' (state, mod_switch) {
        state.mod_switch = mod_switch;
    },
}

export default {
    state,
    mutations
}
