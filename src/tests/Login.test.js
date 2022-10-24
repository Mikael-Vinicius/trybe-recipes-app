import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';

describe('testando tela de login', () => {
  it('testando se o usuario pode logar', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
    const { history } = renderWithRouterAndContext(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(emailInput, 'mikael@hotmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btnSubmit);
    expect(history.location.pathname).toBe('/meals');
  });
});
