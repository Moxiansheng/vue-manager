const tokenLabel = "token";

const state = {
    user: {
        userId: Number,
        userName: String,
    },
    token: ""
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, jwt){
        state.token = jwt
        localStorage.setItem(tokenLabel, jwt)
    },
    deleteToken(state){
        state.token = "";
        localStorage.removeItem(tokenLabel);
    },
    deleteUser(state){
        state.user.userId = -1;
        state.user.userName = "";
    }
};


export default {
    namespaced: true,
    state,
    mutations,
}
