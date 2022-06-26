import { actionTypes } from "./actionTypes/actions";

export const initialState = {
    posts: [],
    isLoading: true,
};


console.log(initialState.posts);
    
const reducer = (state , action) => {
    console.log(action);
    
    
    switch (action.type) {
        case actionTypes.FETCH_POSTS :
            return {
                ...state,
                ///                         + post
                posts: [...state.posts,  action.payload],
            };
        case actionTypes.START_LOADING:
            return { ...state, isLoading: true };
        case actionTypes.STOP_LOADING:
            return { ...state, isLoading: false };
        
        default:
            return state
    }
}

export default reducer;