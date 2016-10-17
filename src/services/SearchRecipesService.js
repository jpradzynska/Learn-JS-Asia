const setsInterleave = (set1, set2) => set1.filter(item => set2.includes(item)).length > 0;

class SearchRecipesService {
  splitIntoKeywords(word) {
      return word.match(/\S+/g);
  }
  filterRecipes(searchQuery, allRecipes) {
    if(!searchQuery) {
      return allRecipes;
    } else {
      const keywords = this.splitIntoKeywords(searchQuery);
      return allRecipes.filter(recipe => {
        const nameKeywords = this.splitIntoKeywords(recipe.name);
        const descKeywords = this.splitIntoKeywords(recipe.description);
        return setsInterleave(nameKeywords, keywords) || setsInterleave(descKeywords, keywords);
      });
    }
  }
}

export default SearchRecipesService;