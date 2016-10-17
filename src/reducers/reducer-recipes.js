function getAllRecipes() {
  let allRecipes = [];
  let request = new XMLHttpRequest();
  const url = 'https://learnjsrecipes-ee1c4.firebaseio.com/allRecipes.json';
  request.open('GET', url, false);
  // request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  request.onreadystatechange = () => {
    if ((request.readyState === 4) && request.status === 200) {
      allRecipes = JSON.parse(request.responseText);
    }
    else {
      const errorMessage = request.responseText;
      alert(`Error: ${request.status} ${errorMessage}`);
    }
  };
  request.send();
  return allRecipes;
}

export default function (state = getAllRecipes() || []) {
  return state;
}
