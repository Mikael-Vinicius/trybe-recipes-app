import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

describe('Teste página de in-progress', () => {
  it('Testa renderização da página de meals', async () => {
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals/53050/in-progress'] });
    const categoryTitle = await screen.findByTestId('recipe-category');
    expect(categoryTitle).toBeInTheDocument();
    const checkBoxes = await screen.findAllByRole('checkbox');
    expect(checkBoxes).toHaveLength(13);
    checkBoxes.forEach((e) => {
      userEvent.click(e);
    });
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(finishBtn);
  });
  it('Testa renderização da página de drinks', async () => {
    renderWithRouterAndContext(<App />, { initialEntries: ['/drinks/17222/in-progress'] });
    const categoryTitle = await screen.findByTestId('recipe-category');
    expect(categoryTitle).toBeInTheDocument();
    const checkBoxes = await screen.findAllByRole('checkbox');
    expect(checkBoxes).toHaveLength(4);
    checkBoxes.forEach((e) => {
      userEvent.click(e);
    });
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(finishBtn);
  });
});
