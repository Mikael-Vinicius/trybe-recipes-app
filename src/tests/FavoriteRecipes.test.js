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
];

describe('Testa tela de favoritos', () => {
  it('Verifica renderização da página', async () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(storageMock));
    renderWithRouterAndContext(<App />, { initialEntries: ['/favorite-recipes'] });
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    const favoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(await screen.findByText(/Link copied!/i)).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).not.toBeInTheDocument();
  });
});
