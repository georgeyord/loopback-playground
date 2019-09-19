'use strict';

const cardSets = require('./migrations/testing/cardset-with-cards.json');

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'testing') return;
  console.log('Run migrations for testing...');

  Promise.map(cardSets, ({ name, values }) => app.models.CardSet.findOrCreate(
    { where: { name } },
    { name }
  )
    .then(([{ id }]) => Promise.map(values, (value) => app.models.Card.findOrCreate(
      { where: { value, cardSetID: id } },
      { value, cardSetID: id }
    ))))
    .then(([[[{ cardSetID }]]]) => {
      app.models.Room.create(
        {
          name: 'Room1',
          cardSetID
        }
      );
    });
};
