'use strict';

const cardSets = require('./migrations/cardsets.json');

module.exports = function (app) {
  // Do not run migrations on testing env
  if (process.env.NODE_ENV === 'testing') return;
  logger.info('Run migrations...');

  Promise.map(cardSets, ({ name, values }) => app.models.CardSet.findOrCreate(
    { where: { name } },
    { name }
  )
    .then(([{ id }]) => Promise.map(values, (value) => app.models.Card.findOrCreate(
      { where: { value, cardSetID: id } },
      { value, cardSetID: id }
    ))));
};
