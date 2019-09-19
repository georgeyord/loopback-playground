'use strict';

module.exports = function (Model) {
  // Model is the model class
  // options is an object containing the config properties from model definition
  Model.defineProperty('created', { type: Date, default: '$now' });
  Model.defineProperty('modified', { type: Date, default: '$now' });
  // Observe the change of model to update the updateAt property
  Model.observe('before save', (ctx, next) => {
    // Check if we have full or partial update of model to update corresponding properties
    if (ctx.instance) {
      ctx.instance.updatedAt = new Date();
    } else if (ctx.data && ctx.data.$set) {
      ctx.data.$set.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });
};
