import * as actions from '../actions/recipeActions';

function initialLoad() {
  let initialRecipes = [];
  let request = new XMLHttpRequest();
  const url = 'https://learnjsrecipes-ee1c4.firebaseio.com/allRecipes.json?orderBy="id"&limitToFirst=8';
  request.open('GET', url, false);
  // request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  request.onreadystatechange = () => {
    if ((request.readyState === 4) && request.status === 200) {
      initialRecipes = JSON.parse(request.responseText);
    }
    else {
      const errorMessage = request.responseText;
      alert(`Error: ${request.status} ${errorMessage}`);
    }
  };
  request.send();
  return initialRecipes;
}

export default function (state = initialLoad() || [], action) {
  switch (action.type) {

    case actions.SHOW_RECIPES:
      return action.payload;

    case actions.SHOW_MORE_RECIPES:
      let recipes = [];
      let request = new XMLHttpRequest();
      const url = `https://learnjsrecipes-ee1c4.firebaseio.com/allRecipes.json?orderBy="id"&startAt=${action.payload.lastDisplayed+1}&endAt=${action.payload.lastDisplayed + action.payload.fetch}`;
      request.open('GET', url, false);
      request.onreadystatechange = () => {
        if ((request.readyState === 4) && request.status === 200) {
          recipes = JSON.parse(request.responseText);
        }
        else {
          const errorMessage = request.responseText;
          alert(`Error: ${request.status} ${errorMessage}`);
        }
      };
      request.send();
      // map recipes from object to array
      let newRecipes = [];
      for (let recipeIndex in recipes) {
        newRecipes.push(recipes[recipeIndex]);
      }
      return [...state, ...newRecipes];
  }
  return state;
}