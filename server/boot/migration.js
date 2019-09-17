'use strict';

module.exports = function(app) {
  var cardSets = [
    {
      'name': 'Fibonacci',
      'values': [
        '1',
        '2',
        '3',
        '5',
        '8',
        '13',
        '21',
        '34',
        '55',
        '89',
        '&#9749;',
        '&#F937;',
        '?',
      ],
    },
    {
      'name': 'T-shirt Size',
      'values': [
        'XXS',
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        '?',
      ],
    },
  ];

  Promise.map(cardSets, ({name, values}) =>
    app.models.CardSet.findOrCreate({where: {name}}, {name})
    .then(([{id}]) =>
      Promise.map(values, (value) =>
        app.models.Card.findOrCreate(
          {where: {value: value, cardSetID: id}},
          {value: value, cardSetID: id}
        )
      )
    )
  );
};
