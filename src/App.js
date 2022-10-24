import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeMeal from './pages/RecipeMeal';
import RecipeDrink from './pages/RecipeDrink';
import RecipeMealProgress from './pages/RecipeMealProgress';
import RecipeDrinkProgress from './pages/RecipeDrinkProgress';

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
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}
