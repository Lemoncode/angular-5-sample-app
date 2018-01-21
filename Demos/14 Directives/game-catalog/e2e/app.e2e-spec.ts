import { GameCatalogPage } from './app.po';

describe('game-catalog App', () => {
  let page: GameCatalogPage;

  beforeEach(() => {
    page = new GameCatalogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
