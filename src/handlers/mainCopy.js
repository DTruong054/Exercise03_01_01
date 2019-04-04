var popGen = require('../lib/popGen'),
  dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  var context = {};

  //Creating an array that will return promises
  const promises = [
    popGen.getPopularSlices(),
    popGen.getMostPopular(),
    popGen.getNewestSlice(),
    popGen.getMostImproved(),
    dataStore.getPizzas(),
]
//Designed to take an array of promises, and give back the results after the last call
//This is an easier way to do waterfalls
Promise.all(promises)
.then((results) => {
  //Results is suppose to fill in  the context object
  const context = {
    popSlices: results[0],
    mostPopular: results[1],
    newestSlice: results[2],
    mostImproved: results[3],
    pizzas: results[4]
  };
  return reply.view('index', context)
})
.catch((err) => {
  console.error(err);
});

  popGen.getPopularSlices(function (err, popSlices) {
    context.popSlices = popSlices;

    popGen.getMostPopular(function (err, mostPopular) {
      context.mostPopular = mostPopular;

      popGen.getNewestSlice(function (err, newestSlice) {
        context.newestSlice = newestSlice;

        popGen.getMostImproved(function (err, mostImproved) {
          context.mostImproved = mostImproved;

          dataStore.getPizzas(function (err, pizzas) {
            context.pizzas = pizzas;

            return reply.view('index', context);
          });
        });
      });
    });
  });
};
