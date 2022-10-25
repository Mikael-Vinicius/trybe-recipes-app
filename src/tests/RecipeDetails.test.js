import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

describe('Testa ações da pagina de detalhes', () => {
  it('verifica se a pagina é renderizada corretamente', async () => {
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals/52977'] });
    const ingredient = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredient[0].innerHTML).toEqual('Lentils');
    expect(ingredient[1].innerHTML).toEqual('1 cup ');
  });
});
