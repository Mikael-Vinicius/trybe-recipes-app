import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

const storageMock = {
  email: 'trybe@trybe.com',
};

describe('Testa tela de profile', () => {
  it('Renderiza tela de profile e testa funcionalidades', async () => {
    global.localStorage.setItem('user', JSON.stringify(storageMock));
    renderWithRouterAndContext(<App />, { initialEntries: ['/profile'] });
    const profileEmail = await screen.findByTestId('profile-email');
    expect(profileEmail.innerHTML).toBe('trybe@trybe.com');
    const logoutBtn = await screen.findByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
  });
  it('Testa redirecionamento para Done-Recipes', async () => {
    renderWithRouterAndContext(<App />, { initialEntries: ['/profile'] });
    const profileEmail = await screen.findByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    const doneBtn = await screen.findByTestId('profile-done-btn');
    userEvent.click(doneBtn);
  });
  it('Testa redirecionamento para Favorite-Recipes', async () => {
    global.localStorage.setItem('user', JSON.stringify(storageMock));
    renderWithRouterAndContext(<App />, { initialEntries: ['/profile'] });
    const favoriteBtn = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
  });
});
