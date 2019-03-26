var quoteManager = require('./quoteManager');

var runInterval;

module.exports = {
  //Run is getting the value of this function, the stop pair is getting the value of this without parameters
  run (socket) {
    runInterval = setInterval(function () {
      quoteManager.updateQuotes(function (err, newData) {
        socket.emit('new_data', JSON.stringify(newData));
      });
    }, 1000);
  },

  stop: function () {
    clearInterval(runInterval);
  }
};
