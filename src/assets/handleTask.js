const handleTask = ({ target }, pathname, id) => {
  target.parentNode.classList.toggle('done');
  const ingredient = target.parentNode.innerText;
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  if (pathname === `/meals/${id}/in-progress`) {
    if (inProgressRecipes.meals[id].some((e) => e === ingredient)) {
      const filteredElements = inProgressRecipes.meals[id].filter(
        (e) => e !== ingredient,
      );
      inProgressRecipes.meals[id] = filteredElements;
      return localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(inProgressRecipes),
      );
    }
    inProgressRecipes.meals[id] = [
      ...inProgressRecipes.meals[id],
      ingredient,
    ];
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
  if (pathname === `/drinks/${id}/in-progress`) {
    if (inProgressRecipes.drinks[id].some((e) => e === ingredient)) {
      const filteredElements = inProgressRecipes.drinks[id].filter(
        (e) => e !== ingredient,
      );
      inProgressRecipes.drinks[id] = filteredElements;
      return localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(inProgressRecipes),
      );
    }
    inProgressRecipes.drinks[id] = [
      ...inProgressRecipes.drinks[id],
      ingredient,
    ];
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
};

export default handleTask;
