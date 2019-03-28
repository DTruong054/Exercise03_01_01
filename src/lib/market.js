var quoteManager = require('./quoteManager');

var runInterval;

module.exports = {
  //Run is getting the value of this function, the stop pair is getting the value of this without parameters
  run (socket) {
    runInterval = setInterval(function () {
      quoteManager.updateQuotes()
      .then((newData) => {
        socket.emit('new_data', JSON.stringify(newData));
      })
      .catch((err) => {
        console.error(error);
      });
    }, 1000);
  },

  stop () {
    clearInterval(runInterval);
  }
};
