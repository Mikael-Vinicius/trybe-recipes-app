import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

describe('Testando o componente Header', () => {
  it('Testa botão de profile', () => {
    const { history } = renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Testa botão de search', () => {
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
