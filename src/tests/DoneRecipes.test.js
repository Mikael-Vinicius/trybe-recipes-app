import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

const storageMock = [
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: '2022-10-26T18:40:38.025Z',
    tags: [],
  },
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '2022-10-26T19:00:25.102Z',
    tags: [
      'Pasta',
      'Curry',
    ],
  },
];

describe('testa tela de receitas finalizadas', () => {
  it('Testa renderização da página com local storage', async () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('doneRecipes', JSON.stringify(storageMock));
    renderWithRouterAndContext(<App />, { initialEntries: ['/done-recipes'] });
    const nameOfRecipe = await screen.findByTestId('1-horizontal-name');
    expect(nameOfRecipe.innerHTML).toEqual('Spicy Arrabiata Penne');
    const mealsBtn = await screen.findByTestId('filter-by-meal-btn');
    const drinksBtn = await screen.findByTestId('filter-by-drink-btn');
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    const shareBtnDrink = await screen.findByTestId('0-horizontal-share-btn');
    const shareBtnMeal = await screen.findByTestId('1-horizontal-share-btn');
    userEvent.click(shareBtnDrink);
    userEvent.click(shareBtnMeal);
    userEvent.click(mealsBtn);
    userEvent.click(drinksBtn);
    userEvent.click(allBtn);
  });
});
