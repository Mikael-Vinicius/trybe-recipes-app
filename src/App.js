import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeMeal from './pages/RecipeMeal';
import RecipeDrink from './pages/RecipeDrink';
import RecipeMealProgress from './pages/RecipeMealProgress';
import RecipeDrinkProgress from './pages/RecipeDrinkProgress';
import Recipes from './pages/Recipes';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals/:id-da-receita" component={ RecipeMeal } />
      <Route exact path="/drinks/:id-da-receita" component={ RecipeDrink } />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        component={ RecipeDrinkProgress }
      />
      <Route
        exact
        path="/meals/:id-da-receita/in-progress"
        component={ RecipeMealProgress }
      />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}
