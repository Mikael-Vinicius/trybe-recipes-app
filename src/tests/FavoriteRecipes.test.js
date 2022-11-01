import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

const storageMock = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  },
];

describe('Testa tela de favoritos', () => {
  it('Verifica renderização da página', async () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(storageMock));
    renderWithRouterAndContext(<App />, { initialEntries: ['/favorite-recipes'] });
    const mealsBtn = await screen.findByTestId('filter-by-meal-btn');
    const drinksBtn = await screen.findByTestId('filter-by-drink-btn');
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(mealsBtn);
    userEvent.click(mealsBtn);
    userEvent.click(drinksBtn);
    userEvent.click(drinksBtn);
    userEvent.click(allBtn);
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    const shareBtn2 = await screen.findByTestId('1-horizontal-share-btn');
    const favoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    const favoriteBtn2 = await screen.findByTestId('1-horizontal-favorite-btn');
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    userEvent.click(shareBtn2);
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn2);
    expect(favoriteBtn).not.toBeInTheDocument();
  });
});
