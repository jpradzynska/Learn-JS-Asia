require('normalize.css/normalize.css');
require('styles/App.css');

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RecipeBox from './RecipeBox.js';
import SearchRecipesService from './../services/SearchRecipesService.js';
import * as actions from '../actions/recipeActions';


class RecipesList extends Component {

    static propTypes = {
        allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
        recipesToShow: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    componentWillMount() {
        this.search = new SearchRecipesService();
        this.props.showRecipes(this.props.allRecipes);
    }

    handleSearch(event) {
        const searchQuery = event.target.value;
        const allRecipes = this.props.allRecipes;
        let filteredRecipesList = this.search.filterRecipes(searchQuery, allRecipes);
        this.props.showRecipes(filteredRecipesList);
    }

    render() {
        const recipesBoxes = this.props.recipesToShow.map(recipe => {
            return (
                <RecipeBox key={recipe.name} recipeFromParent={recipe}/>
            );
        });
        return (
            <div className="recipeList">
                <input type="text"
                       placeholder="Search recipes..."
                       onChange={this.handleSearch.bind(this)}/>
                <div id="cen">
                    {recipesBoxes}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allRecipes: state.allRecipes,
        recipesToShow: state.recipesToShow
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showRecipes: actions.showRecipes
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(RecipesList);
