import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

it('Verifica redirecionamento dos botões no footer', async () => {
  const { history } = renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });
  const btnDrink = await screen.findByTestId('drinks-bottom-btn');
  userEvent.click(btnDrink);
  expect(history.location.pathname).toBe('/drinks');

  const btnMeals = await screen.findByTestId('meals-bottom-btn');
  userEvent.click(btnMeals);
  expect(history.location.pathname).toBe('/meals');
});
