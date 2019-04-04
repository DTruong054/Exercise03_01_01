var popGen = require('../lib/popGen'),
    dataStore = require('../lib/dataStore'),
    mainContent = require('../../generators/mainContent.js');

module.exports = function (request, reply) {
  //Starting off with a const, so we can iterate though the function
  const gen = mainContent()
  gen.next();
  popGen.getPopularSlices()
    .then((popSlices) => {
      //This is an arrow function
      gen.next(popSlices);
      return popGen.getMostPopular();
    })
    .then((mostPopular) => {
      gen.next(mostPopular);
      return popGen.getNewestSlice();
    })
    .then((newestSlice) => {
      gen.next(newestSlice);
      return popGen.getMostImproved();
    })
    .then((mostImproved) => {
      gen.next(mostImproved);
      return dataStore.getPizzas();
    })
    .then((pizzas) => {
      return reply.view('index', mainContext.context);
    })
  // var context = {};

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