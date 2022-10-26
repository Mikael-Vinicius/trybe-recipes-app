function handleFavorites({
  pathname,
  id,
  recipeDetail,
  favoriteR,
  setFavoriteRecipe,
}) {
  const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
    },
  ];
  if (favoritesStorage) {
    if (favoritesStorage.some((e) => e.id === id)) {
      const removedItems = favoritesStorage.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedItems));
      return setFavoriteRecipe(!favoriteR);
    }
    const allStorage = [...favoritesStorage, ...obj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(allStorage));
    return setFavoriteRecipe(!favoriteR);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
  return setFavoriteRecipe(!favoriteR);
}

export default handleFavorites;
