var api = require('./api');

module.exports = {
  //This is holding a function
  //This doesn't need the function call, since the code can tell that this is already a function.
  updateQuotes (callback) {
    api.getAllPizzas(function (err, pizzas) {
      var newData = [],
        pizza;

      for (var key in pizzas) {
        pizza = pizzas[key];
        newData.push({
          ticker: pizza.ticker,
          nextQuote: pizza.getNext()
        });
      }

      console.log(newData);
      console.log('updating quotes');
      callback(null, newData);
    });
  }
};
