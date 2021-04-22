const getters = {
    token: state => state.user.token,
    user: state => state.user.user,
    userId: state => state.user.user.userId,
    userName: state => state.user.user.userName,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    menuState: state => state.menu.menuState,
    menuSelectedKeys: state => state.menu.menuState.menuSelectedKeys,
    menuCollapsed: state => state.menu.menuState.menuCollapsed
}

export default getters
