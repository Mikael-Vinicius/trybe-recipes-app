const verifyRecipes = (inProgressRecipes, pathname, id) => {
  const mealsIds = JSON.parse(localStorage.getItem('mealsIds'));
  const drinksIds = JSON.parse(localStorage.getItem('drinksIds'));
  if (pathname === `/meals/${id}/in-progress`) {
    if (inProgressRecipes.meals[id]) {
      return '';
    }
    mealsIds.forEach((e) => {
      inProgressRecipes.meals[e] = [];
    });
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
  if (pathname === `/drinks/${id}/in-progress`) {
    if (inProgressRecipes.drinks[id]) {
      return '';
    }
    drinksIds.forEach((e) => {
      inProgressRecipes.drinks[e] = [];
    });
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
};

export default verifyRecipes;
