var api = require('./api'),
  _ = require('lodash');

function getPopularSlices() {
  return new Promise((resolve, reject) => {
    _getFinalQuotes()
      .then((finalQuotes) => {
      const orderedQuotes = _.orderBy(finalQuotes, ['quote'], ['desc']);

      resolve(_.take(orderedQuotes, 4));
    })
    .catch(reject);
  });
}

function getMostPopular() {
  return new Promise((resolve, reject) => {
    _getFinalQuotes()
    .then((finalQuotes) => {
      const mostPopular = finalQuotes.reduce(function (best, curr) {
        if (curr.quote > best.quote) {
          return curr;
        }
        return best;
      }, {
        quote: 0
      });
      resolve(mostPopular);
    })
    .catch(reject);
  }); 
}

function getNewestSlice() {
  return new Promise((resolve, reject) => {
    api.getPizza('HAWA')
    .then((pizza) => {
      resolve({
        ticker: 'HAWA',
        quote: pizza.getLast()
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
}

/** STEPS TO CONVERT
 * Get rid of callback
 * Create a return nre Promise
 * Add resolve, and reject with an arrow function
 * Copy and paste code.
 * Switch var to const
 * Create a arrow function
 * Copy and paste code
 * Change callback to resolve
 * Add a .catch(reject)
 */
function getMostImproved() {
  return new Promise((resolve, reject) => {
    api.getAllQuotes()
    .then((allQuotes) => {
      const diffQuotes = [];
      for (var key in allQuotes) {
        diffQuotes.push({
          ticker: key,
          diff: allQuotes[key][allQuotes[key].length - 1] - allQuotes[key][0],
          quote: allQuotes[key][allQuotes[key].length - 1]
        });
      }
  
      const mostImproved = diffQuotes.reduce(function (best, curr) {
        if (curr.diff > best.diff) {
          return curr;
        }
        return best;
      }, { diff: 0 });
      resolve(mostImproved);
    })
    .catch(reject);
  });
}

function _getFinalQuotes() {
  .then((allQuotes) => {
    return new Promise((resolve, reject) => {
      const finalQuotes = [];
    api.getAllQuotes(function (err, allQuotes) {
      for (var key in allQuotes) {
        finalQuotes.push({
          ticker: key,
          quote: allQuotes[key][allQuotes[key].length - 1],
          diffLast: _percentOf(allQuotes[key][allQuotes[key].length - 2], allQuotes[key][allQuotes[key].length - 1])
        });
      }
      resolve(finalQuotes);
  })
  .catch(reject);
  });
}

function _percentOf(val1, val2) {
  return (val2 - val1) / val1;
}

module.exports = {
  //When the names are the same, there is no need for extra
  getPopularSlices,
  getMostPopular,
  getNewestSlice,
  getMostImproved
};