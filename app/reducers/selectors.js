export const usernameSelector = state => {
    debugger;
    if(state.loginReducer.username){
        return state.username
    }
    return null;
}

export const passwordSelector = state => {
    debugger;
    if(state.loginReducer.password){
        return state.password
    }
    return null;
}