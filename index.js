const { findServer } = require('./AvailbaleServer');

const findAvailableServer = async(sentServers) => {

  return await findServer(sentServers)
    .then(workingServer => {
      return workingServer;
    })
    .catch(error => {
      return {errorMessage: error.message};
    });
};

module.exports = {
  findAvailableServer,
};