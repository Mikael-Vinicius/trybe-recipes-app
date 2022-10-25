import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './RenderWith';
import drinks from '../../cypress/mocks/drinks';

const mock = {
  drinks: [
    {
      idDrink: '17222',
      strDrink: 'A1',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Cocktail glass',
      strInstructions: 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
      strInstructionsES: 'Vierta todos los ingredientes en una coctelera, mezcle y sirva con hielo en un vaso frío.',
      strInstructionsDE: 'Alle Zutaten in einen Cocktailshaker geben, mischen und über Eis in ein gekühltes Glas servieren.',
      strInstructionsFR: null,
      strInstructionsIT: 'Versare tutti gli ingredienti in uno shaker, mescolare e servire con ghiaccio in un bicchiere freddo.',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      strIngredient1: 'Gin',
      strIngredient2: 'Grand Marnier',
      strIngredient3: 'Lemon Juice',
      strIngredient4: 'Grenadine',
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1 3/4 shot ',
      strMeasure2: '1 Shot ',
      strMeasure3: '1/4 Shot',
      strMeasure4: '1/8 Shot',
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2017-09-07 21:42:09',
    }],

};

describe('Testa searchbar no drinks', () => {
  it('Testa botão de search por nome', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock),
    });
    renderWithRouterAndContext(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = await screen.findByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const searchInput = await screen.findByTestId('search-input');
    const nameRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'A1');
    const filterSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(2);
    userEvent.clear(searchInput);
  });

  it('Testa botão de search por ingredient', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    renderWithRouterAndContext(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = await screen.findByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = await screen.findByTestId('search-input');
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    const filterSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(ingredientRadio);

    userEvent.type(searchInput, 'Gin');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(2);
    userEvent.clear(searchInput);
    const letterRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(letterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(3);

    userEvent.clear(searchInput);
    userEvent.click(letterRadio);
    userEvent.type(searchInput, 'aaaaa');
    userEvent.click(filterSearch);
    expect(global.fetch).toBeCalledTimes(3);
  });
});
