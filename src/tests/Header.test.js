import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

const storageMock = {
  email: 'trybe@trybe.com',
};

describe('Testando o componente Header', () => {
  it('Testa botão de profile', async () => {
    global.localStorage.setItem('user', JSON.stringify(storageMock));
    const { history } = renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });
    const profileBtn = await screen.findByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Testa renderização do botão de search', async () => {
    global.localStorage.setItem('user', JSON.stringify(storageMock));
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals'] });
    const searchBtn = await screen.findByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
