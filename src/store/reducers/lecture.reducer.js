/* eslint-disable prettier/prettier */
import { LECTURE_ATTENDED } from '../actiontypes/action.types';
const initialState = {
    onGoingLecture : null
} 
export const lectureReducer = (state = initialState , action) => {
    switch (action.type) {
        case LECTURE_ATTENDED:
            state.onGoingLecture = action.onGoingLecture;
            return {
                ...state
            }
        default:
            return state
    }
}