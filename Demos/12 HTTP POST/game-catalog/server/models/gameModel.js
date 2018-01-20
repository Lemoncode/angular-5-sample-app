const GAMES = [
  {
      name: 'Super Mario Bros',
      dateRelease: '13 September 1985',
      imageUrl: 'http://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1280w.jpg',
      sellers: [
          {
              id: 1,
              name: 'Old shop',
              price: 95,
              amount: 2,
              isAvailable: true,
          },
          {
              id: 2,
              name: 'New shop',
              price: 115,
              amount: 1,
              isAvailable: true,
          },
          {
              id: 3,
              name: 'Regular shop',
              price: 135,
              amount: 0,
              isAvailable: false,
          }
      ]
  },
  {
      name: 'Legend of Zelda',
      dateRelease: '21 February 1986',
      imageUrl: 'http://www.hobbyconsolas.com/sites/hobbyconsolas.com/public/styles/main_element/public/media/image/2013/06/227201-analisis-legend-zelda-oracle-ages/seasons.jpg?itok=A8pOGd_f',
      sellers: [
          {
              id: 3,
              name: 'Old shop',
              price: 125,
              amount: 0,
              isAvailable: false,
          },
          {
              id: 4,
              name: 'New shop',
              price: 145,
              amount: 1,
              isAvailable: true,
          },
      ]
  },
  {
      name: 'Sonic',
      dateRelease: '26 June 1981',
      imageUrl: 'https://www-sonicthehedgehog-com-content.s3.amazonaws.com/test/Sonic_Mania_Block_3_video_1_2.jpg',
  },
];

const getGames = () => GAMES;
const getGame = (name) => GAMES.find((game) => game.name === name);
const addGame = (game) => {
  const imageUrl = (game.imageUrl) ? game.imageUrl : 'https://c1.staticflickr.com/6/5447/18686626819_224c6414ce_m.jpg';
  const gameWithImageUrlResolved = Object.assign({}, game, imageUrl);
  // const gameWithImageUrlResolved = {
  //     ...game,
  //     imageUrl,
  // };
  GAMES.push(gameWithImageUrlResolved);
};
const getGameIndexByName = (name) => GAMES.findIndex((g) => g.name === name);
const updateGame = (game) => {
  const gameIndex = getGameIndexByName(game.name);
  if (gameIndex > -1) {
      GAMES[gameIndex] = game;
  }
};
const deleteGame = (name) => {
  const gameIndex = getGameIndexByName(name);
  if (gameIndex > -1) {
      GAMES.splice(gameIndex, 1);
  }
}

module.exports = {
  getGames,
  getGame,
  addGame,
  updateGame,
  deleteGame
}
