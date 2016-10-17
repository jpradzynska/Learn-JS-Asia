import * as actions from '../actions/recipeActions';

export default function (state = {currentlyOpenContextMenuId: '', currentlyHoverRecipeBoxId: ''}, action) {
    switch (action.type) {

        case actions.OPEN_CONTEXT_MENU:
            return {...state, currentlyOpenContextMenuId: action.payload};

        case actions.CLOSE_CONTEXT_MENU:
            return {...state, currentlyOpenContextMenuId: ''};

        case actions.HOVER_RECIPE_BOX:
            return {...state, currentlyHoverRecipeBoxId: action.payload};

        case actions.UNHOVER_RECIPE_BOX:
            return {...state, currentlyHoverRecipeBoxId: ''};

        case actions.PRINT_RECIPE:
            window.open(action.payload);
    }
    return state;
}