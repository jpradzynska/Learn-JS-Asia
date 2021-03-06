import React, {Component, PropTypes} from 'react';
import ContextMenu from './ReactContextMenu';
import MoreIcon from '../images/moreIcon.png';
import StarIcon from '../images/starIcon.png';
import PdfIcon from '../images/pdfIcon.png';

export default class RecipeBox extends Component {

  static propTypes = {
    recipeFromParent: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    starredRecipes: PropTypes.arrayOf(PropTypes.number).isRequired,
    actions: React.PropTypes.object.isRequired
  }

  starRecipeHandler() {
    const {actions: {starRecipe}} = this.props;
    starRecipe(this.props.recipeFromParent.id);
  }

  removeStarRecipeHandler() {
    const {actions: {removeStarRecipe}} = this.props;
    removeStarRecipe(this.props.recipeFromParent.id);
  }

  printRecipeHandler() {
    const {actions: {printRecipe}} = this.props;
    printRecipe('/pdf/dummyRecipe.pdf');
  }

  openMenuHandler(event) {
    event.preventDefault();

    const recipeBox = event.target.closest('.recipeBox');
    const openedContextMenuId = 'context-menu-' + recipeBox.id;
    const {actions: {openContextMenu}} = this.props;

    openContextMenu(openedContextMenuId);
  }

  mouseOverHandler(event) {
    const name = event.currentTarget.id;
    const {actions: {hoverRecipeBox}} = this.props;
    hoverRecipeBox(name);
  }

  render() {
    const recipeId = this.props.recipeFromParent.id;
    const recipeName = this.props.recipeFromParent.name;

    const name = 'recipe-box-' + recipeId;
    const hoverClass = ((name) === this.props.recipe.currentlyHoverRecipeBoxId) ? 'recipeBox recipe-hover' : 'recipeBox recipe-no-hover';

    const contextMenuItems = [
      {'icon': PdfIcon, 'label': 'Get as file', 'function': this.printRecipeHandler.bind(this)}
    ];

    let starImg;
    if (this.props.starredRecipes.indexOf(recipeId) > -1) {
      starImg = <img className="star-icon" src={StarIcon} />
      contextMenuItems.unshift({'icon': StarIcon, 'label': 'Remove from favourites', 'function': this.removeStarRecipeHandler.bind(this)});
    }
    else {
      contextMenuItems.unshift({'icon': StarIcon, 'label': 'Add to favourites', 'function': this.starRecipeHandler.bind(this)});
    }

    const {actions: {unhoverRecipeBox}} = this.props;

    return (
      <div className={hoverClass}
           id={name}
           onMouseOver={this.mouseOverHandler.bind(this)}
           onMouseOut={unhoverRecipeBox}>

        <img src={this.props.recipeFromParent.image}></img>

        <div className="recipeDesc">
          <img className="more-icon" src={MoreIcon} onClick={this.openMenuHandler.bind(this)}></img>
          <h3 className="recipe-box-text">{recipeName}</h3>
          {starImg}
        </div>

        <ContextMenu {...this.props} contextID={name} items={contextMenuItems}/>
      </div>
    );
  }
}
