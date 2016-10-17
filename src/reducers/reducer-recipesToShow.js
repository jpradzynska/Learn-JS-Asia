import * as actions from '../actions/recipeActions';

export default function (state = [], action) {
    switch (action.type) {
        case actions.SHOW_RECIPES:
            return action.payload;
    }
    return state;
}