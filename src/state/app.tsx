const SET_SELECTED_REPOSITORY = 'SET_SELECTED_REPOSITORY';

export interface TSelectedRepo {
    name: string;
    ownerName: string;
}

export const selectRepo = (selectedRepo: TSelectedRepo) => ({
    type: SET_SELECTED_REPOSITORY, selectedRepo,
})

interface Action {
    type: string;
    selectedRepo: TSelectedRepo;
}

const initialState = {
    selectedRepo:  {
        name: '',
        ownerName: '',
    },
}

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_SELECTED_REPOSITORY:
            return { ...state, selectedRepo: action.selectedRepo };
        default:
            return state;
    }
}
