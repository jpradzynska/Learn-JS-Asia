import * as actions from '../actions/recipeActions';

function getStarredRecipes() {
  let starredRecipes = [];
  let request = new XMLHttpRequest();
  const url = 'https://learnjsrecipes-ee1c4.firebaseio.com/starred.json';
  request.open('GET', url, false);
  // request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  request.onreadystatechange = () => {
    if ((request.readyState === 4) && request.status === 200) {
      starredRecipes = JSON.parse(request.responseText);
    }
    else {
      const errorMessage = request.responseText;
      alert(`Error: ${request.status} ${errorMessage}`);
    }
  };
  request.send();
  return starredRecipes;
}

export default function (state = getStarredRecipes() || [], action) {

  let starredRecipes = [...state];
  let url = 'https://learnjsrecipes-ee1c4.firebaseio.com/starred.json';

  switch (action.type) {

    case actions.STAR_RECIPE:
      let request = new XMLHttpRequest();
      starredRecipes.push(action.payload);
      request.open('PUT', url, false);
      request.send(JSON.stringify(starredRecipes));
      return starredRecipes;

    case actions.REMOVE_STAR_RECIPE:
      request = new XMLHttpRequest();
      let indexPosition = starredRecipes.indexOf(action.payload);
      starredRecipes = [
        ...starredRecipes.slice(0, indexPosition),
        ...starredRecipes.slice(indexPosition + 1)
      ];
      request.open('PUT', url, false);
      request.send(JSON.stringify(starredRecipes));

      return starredRecipes;
  }
  return state;
}