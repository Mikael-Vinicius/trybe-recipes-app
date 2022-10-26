const finishRecipe = (history, recipeDetail, pathname, id) => {
  const path = '/done-recipes';
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const obj = [
    {
      id,
      type:
          pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
            ? 'meal'
            : 'drink',
      nationality:
          pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
            ? recipeDetail.strArea
            : '',
      category: recipeDetail.strCategory,
      alcoholicOrNot:
          pathname === `/drinks/${id}` || pathname === `/drinks/${id}/in-progress`
            ? recipeDetail.strAlcoholic
            : '',
      name:
          pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
            ? recipeDetail.strMeal
            : recipeDetail.strDrink,
      image:
          pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
            ? recipeDetail.strMealThumb
            : recipeDetail.strDrinkThumb,
      doneDate: new Date(),
      tags: recipeDetail.strTags ? recipeDetail.strTags.split(',') : [],
    },
  ];
  if (doneRecipes) {
    if (doneRecipes.some((e) => e.id === id)) {
      const removedItems = doneRecipes.filter((e) => e.id !== id);
      localStorage.setItem('doneRecipes', JSON.stringify(removedItems));
      return history.push(path);
    }
    const allStorage = [...doneRecipes, ...obj];
    localStorage.setItem('doneRecipes', JSON.stringify(allStorage));
    return history.push(path);
  }
  localStorage.setItem('doneRecipes', JSON.stringify(obj));
  return history.push(path);
};

export default finishRecipe;
