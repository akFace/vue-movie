const state = {
    router_direction: '',
}

// mutations
const mutations = {
    
    'SET_ROUTER_DIRECTION' (state, router_direction) {
        state.router_direction = router_direction;
    },
    'UPDATA_ROUTER_DIRECTION' (state, router_direction) {
        state.router_direction = router_direction;
    },
}

export default {
    state,
    mutations
}
