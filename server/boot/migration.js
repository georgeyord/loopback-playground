'use strict';

const cardSets = require('./migrations/cardsets.json');

module.exports = function (app) {
  Promise.map(cardSets, ({ name, values }) => app.models.CardSet.findOrCreate(
    { where: { name } },
    { name }
  )
    .then(([{ id }]) => Promise.map(values, (value) => app.models.Card.findOrCreate(
      { where: { value, cardSet: id } },
      { value, cardSet: id }
    ))));
};
