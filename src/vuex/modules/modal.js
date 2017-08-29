const state = {
    show: false,
    msg: '',
    type: 'alert', // 'input'
    label: '',
    holder: '输入提示',
    confirm_text_default: '确定',
    cancel_text_default: '取消',
}

const mutations = {
    'RESET_MODAL' (state) {
        state = {
            show: false,
            msg: '',
            type: 'alert', // 'input'
            label: '',
            holder: '输入提示',
            confirm_text_default: '确定',
            cancel_text_default: '取消',
        }
    },
    'MODAL_SHOW' (state, params) {
        state.show = true;
        state.label = params.label || '提示';
        state.msg = params.msg;
        state.confirm_text = params.confirm_text || state.confirm_text_default;
        state.cancel_text = params.cancel_text || state.cancel_text_default;
        state.type = params.type || 'alert';
    },
    'MODAL_HIDE' (state) {
        state.show = false;
    },

}

export default {
    state,
    mutations
}
