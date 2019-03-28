var api = require('./api');

module.exports = {
  //This is holding a function
  //This doesn't need the function call, since the code can tell that this is already a function.
  updateQuotes () {
    //This is getting converted to a promise
    //Promises are used to better async programming
    return new Promise((resolve, reject) => {
      api.getAllPizzas(function (err, pizzas) {
        var newData = [], pizza;

        //This is err trapping
        if (err) {
          reject(err);
        } else{
          for (var key in pizzas) {
            pizza = pizzas[key];
            //Replacing callback 
            newData.push({
              ticker: pizza.ticker,
              nextQuote: pizza.getNext()
            });
          }
    
          //This can expand the variable and execute javascript code
          console.log(`${JSON.stringify(newData)} updating quotes`);
          //sucess
          resolve(newData);
          // callback(null, newData);
        }
      });
    });
  }
};
