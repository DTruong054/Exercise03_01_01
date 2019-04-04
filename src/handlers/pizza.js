var dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  const { ticker } = request.params;

  if (!ticker) {
    return reply('No ticker provided');
  }

  dataStore.getPizza(ticker)
    .then(reply)
    .catch(reply)
};
