require('normalize.css/normalize.css');
require('styles/App.css');

import React, {Component, PropTypes} from 'react';
import mapStateToProps from '../containers/mapStateToProps';
import mapDispatchToProps from '../containers/mapDispatchToProps';
import {connect} from 'react-redux';
import RecipeBox from './RecipeBox.js';
import SearchRecipesService from './../services/SearchRecipesService.js';

@connect(mapStateToProps, mapDispatchToProps)
export default class RecipesList extends Component {

  static propTypes = {
    allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    recipesToShow: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.search = new SearchRecipesService();
  }

  handleSearch(event) {
    const searchQuery = event.target.value;
    const allRecipes = this.props.allRecipes;
    let filteredRecipesList = this.search.filterRecipes(searchQuery, allRecipes);
    const {actions: {showRecipes}} = this.props;
    showRecipes(filteredRecipesList);
  }

  handleShowMoreRecipes() {
    let currentlyShownRecipes = this.props.recipesToShow;
    let lastDisplayRecipe = currentlyShownRecipes[currentlyShownRecipes.length-1];
    const {actions: {showMoreRecipes}} = this.props;
    showMoreRecipes({lastDisplayed: lastDisplayRecipe.id || 0, fetch: 4});
  }

  getDocHeight() {
    let doc = document;
    return Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, doc.body.offsetHeight, doc.documentElement.offsetHeight, doc.body.clientHeight, doc.documentElement.clientHeight);
  }

  render() {
    window.onscroll = () => {
      if ((window.scrollY + window.innerHeight) == this.getDocHeight()) {
        this.handleShowMoreRecipes();
      }
    };

    const recipesBoxes = this.props.recipesToShow.map(recipe => {
      return (
        <RecipeBox {...this.props} key={recipe.id} recipeFromParent={recipe}/>
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

