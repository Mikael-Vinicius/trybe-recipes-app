import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

describe('Testa funcionalidade das categorias', () => {
  it('Verifica o toggle', async () => {
    jest.spyOn(global, 'fetch');
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });
    const beefCategory = await screen.findByTestId('Beef-category-filter');
    expect(beefCategory).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2);
    userEvent.click(beefCategory);
    expect(fetch).toHaveBeenCalledTimes(3);
    userEvent.click(beefCategory);
    expect(fetch).toHaveBeenCalledTimes(4);

    const drinksBtn = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    expect(fetch).toHaveBeenCalledTimes(6);
    const ordinaryDrinkCategory = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryDrinkCategory);
    expect(fetch).toHaveBeenCalledTimes(7);
    userEvent.click(ordinaryDrinkCategory);
    expect(fetch).toHaveBeenCalledTimes(8);
    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(ordinaryDrinkCategory);
    expect(fetch).toHaveBeenCalledTimes(9);
    userEvent.click(allBtn);
  });
});
