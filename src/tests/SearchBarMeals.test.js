import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';
import meals from '../../cypress/mocks/meals';

const mock = {
  meals: [
    {
      idMeal: '52781',
      strMeal: 'Irish stew',
      strDrinkAlternate: null,
      strCategory: 'Beef',
      strArea: 'Irish',
      strInstructions: 'Heat the oven to 180C/350F/gas mark 4. Drain and rinse the soaked wheat, put it in a medium pan with lots of water, bring to a boil and simmer for an hour, until cooked. Drain and set aside.\r\n\r\nSeason the lamb with a teaspoon of salt and some black pepper. Put one tablespoon of oil in a large, deep sauté pan for which you have a lid; place on a medium-high heat. Add some of the lamb – don\'t overcrowd the pan – and sear for four minutes on all sides. Transfer to a bowl, and repeat with the remaining lamb, adding oil as needed.\r\n\r\nLower the heat to medium and add a tablespoon of oil to the pan. Add the shallots and fry for four minutes, until caramelised. Tip these into the lamb bowl, and repeat with the remaining vegetables until they are all nice and brown, adding more oil as you need it.\r\n\r\nOnce all the vegetables are seared and removed from the pan, add the wine along with the sugar, herbs, a teaspoon of salt and a good grind of black pepper. Boil on a high heat for about three minutes.\r\n\r\nTip the lamb, vegetables and whole wheat back into the pot, and add the stock. Cover and boil for five minutes, then transfer to the oven for an hour and a half.\r\n\r\nRemove the stew from the oven and check the liquid; if there is a lot, remove the lid and boil for a few minutes.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sxxpst1468569714.jpg',
      strTags: 'Stew,Meat',
      strYoutube: 'https://www.youtube.com/watch?v=kYH2qJXnSMo',
      strIngredient1: 'whole wheat',
      strIngredient2: 'lamb loin chops',
      strIngredient3: 'olive oil',
      strIngredient4: 'shallots',
      strIngredient5: 'carrots',
      strIngredient6: 'turnips',
      strIngredient7: 'celeriac',
      strIngredient8: 'charlotte potatoes',
      strIngredient9: 'white wine',
      strIngredient10: 'caster sugar',
      strIngredient11: 'fresh thyme',
      strIngredient12: 'oregano',
      strIngredient13: 'chicken stock',
      strIngredient14: null,
      strIngredient15: null,
      strIngredient16: null,
      strIngredient17: null,
      strIngredient18: null,
      strIngredient19: null,
      strIngredient20: null,
      strMeasure1: '300g soaked overnight in water',
      strMeasure2: '2kg cut into 3cm cubes',
      strMeasure3: '120ml',
      strMeasure4: '24 Skinned',
      strMeasure5: '4 large',
      strMeasure6: '2',
      strMeasure7: '1',
      strMeasure8: '350g',
      strMeasure9: '150ml',
      strMeasure10: '1 tsp',
      strMeasure11: '4 sprigs',
      strMeasure12: '4 sprigs',
      strMeasure13: '450ml',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
      strSource: 'http://www.ottolenghi.co.uk/recipes/meat/irish-stew-shop',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    }],
};

describe('Testa searchbar no meals', () => {
  it('Testa botão de search por nome', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock),
    });
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });

    const searchBtn = await screen.findByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const searchInput = await screen.findByTestId('search-input');
    const nameRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Irish stew');
    const filterSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(3);
    userEvent.clear(searchInput);
  });

  it('Testa botão de search por ingredient', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });

    const searchBtn = await screen.findByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = await screen.findByTestId('search-input');
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    const filterSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(ingredientRadio);

    userEvent.type(searchInput, 'Tomato');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(3);
    userEvent.clear(searchInput);
    const letterRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(letterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(4);

    userEvent.clear(searchInput);
    userEvent.click(letterRadio);
    userEvent.type(searchInput, 'aaaaa');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(4);
  });
});
