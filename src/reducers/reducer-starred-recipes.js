import * as actions from '../actions/recipeActions';

export default function (state = [], action) {
    switch (action.type) {

        case actions.STAR_RECIPE:
            return [...state, action.payload];

        case actions.REMOVE_STAR_RECIPE:
            let indexPosition = state.indexOf(action.payload);
            return [
                ...state.slice(0, indexPosition),
                ...state.slice(indexPosition + 1)
            ];
    }
    return state;
}