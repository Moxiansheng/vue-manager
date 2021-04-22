const state = {
    menuState:{
        menuSelectedKeys: ['0'],
        menuCollapsed: true,
    }
}

const mutations = {
    setMenuSelectedKeys(state, num) {
        state.menuState.menuSelectedKeys = num;
    },
    setMenuCollapsed(state){
        state.menuState.menuCollapsed = !state.menuState.menuCollapsed;
    }
};


export default {
    namespaced: true,
    state,
    mutations,
}
