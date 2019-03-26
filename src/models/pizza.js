var fluxGen = require('../lib/fluxGen');

function getRand() {
  return +(Math.random() * 10000).toFixed(0);
}

//Spread syntax spreads the list of parameters into an array
class Pizza {
  // var self = this;
  constructor(startingDate, quotes, ...pizzaProps) {
    this.startingDate = startingDate;
    //When you want to destructuring you need to put what you want to destructuring into array brackets.
    //If you are destructuring from an array, you need to have []
    [this.ticker, this.name, this.startingQuote, this.variability = getRand(), this.positivity = getRand()] = pizzaProps;
    this.quotes = quotes || [this.startingQuote];
  }
  // private methods
  //Can't be gotten to from outside the class
  _addQuote(quote) {
    return this.quotes.push(quote);
  }

  _getQuote (quoteIndex) {
    return this.quotes[quoteIndex];
  }

  //Public Methods
  //This is to allow all user to call
  getNext () {
    var newQuote = fluxGen(this.getLast(), 1, this.variability, this.positivity)[0];
    this._addQuote(newQuote);
    return newQuote;
  };

  getLast () {
    return this._getQuote(this.quotes.length - 1);
  };

  getDatedQuotes () {
    var quotesMap = {},
    //This knows to destructure because it has {} around it
      { startingDate: curDate } = this;

    this.quotes.forEach(function (quote) {
      quotesMap[curDate] = quote;
      curDate.setDate(curDate.getDate() + 1);
    });

    return quotesMap;
  };
}

Pizza.hydrate = function (pizzaObj) {
  var newPizza = new Pizza(
    pizzaObj.startingDate,
    pizzaObj.quotes,
    pizzaObj.ticker,
    pizzaObj.name,
    pizzaObj.startingQuote,
    pizzaObj.variability,
    pizzaObj.positivity);

  newPizza.quotes = pizzaObj.quotes;
  return newPizza;
};


module.exports = Pizza;