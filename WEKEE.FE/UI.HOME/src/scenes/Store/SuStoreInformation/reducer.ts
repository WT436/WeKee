import ActionTypes from './constants';
import { UHomeActions, UHomeState } from './types';

declare var abp: any;

export const initialState: UHomeState = {
    loading: false,
    completed: true,
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
};

function uHomeReducer(
    state: UHomeState = initialState,
    action: UHomeActions
) {
    switch (action.type) {
// OPEN PAGE
        case ActionTypes.WATCH_PAGE_START:
            return {
                ...state,
                loading: true
            };

        case ActionTypes.WATCH_PAGE_COMPLETED:
            return {
                ...state,
                loading: true,
                completed: true
            };

        case ActionTypes.WATCH_PAGE_ERROR:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}

export default uHomeReducer;