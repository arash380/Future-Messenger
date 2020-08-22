export const initialState = {
    user: null,
    websiteLink: 'future-messenger7.web.app'
}

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_MSG_SHOWING: "SET_MSG_SHOWING"
};

const reducer = (state, action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;