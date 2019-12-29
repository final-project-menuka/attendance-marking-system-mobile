/* eslint-disable prettier/prettier */
import { LECTURE_ATTENDED } from '../actiontypes/action.types';
export function markAttendance(lectureInfo) {
    return dispatch => {
        dispatch(markAttendanceAsync(lectureInfo));
    }
}
export function markAttendanceAsync(lectureInfo) {
    return {
        type: LECTURE_ATTENDED,
        onGoingLecture: lectureInfo
    }
}