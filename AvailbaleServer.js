const request = require('request-promise-native');
const _ = require('lodash');

const getWorkingServers = (sentServers) => {

  function executeAllPromises(promises) {
    var resolvingPromises = promises.map(function(promise) {
      return new Promise(function(resolve) {
        var payload = new Array(2);
        promise.then(function(result) {
            payload[0] = result;
          })
          .catch(function(error) {
            payload[1] = error;
          })
          .then(function() {
            resolve(payload);
          });
      });
    });
    var errors = [];
    var results = [];
    return Promise.all(resolvingPromises)
      .then(function(items) {
        items.forEach(function(payload) {
          if (payload[1]) {
            errors.push(payload[1]);
          } else {
            results.push(payload[0]);
          }
        });
  
        return {
          errors: errors,
          results: results
        };
      });
  }

  const urls = sentServers.map(server => {
    return server.url;
  });

  const arr = [];
  urls.forEach(url => {
    arr.push(
      new Promise((resolve, reject) => {
        resolve(request({
          url: url,
          timeout: 5000,
          method: 'GET',
          resolveWithFullResponse: true
        }))
      })
    )
  });

  return new Promise((resolve, reject) => {
    executeAllPromises(arr).then(function(items) {
      if(!_.isEmpty(items.results)) {
        const responseStatus = items.results.map(response => {
          if(response.statusCode >= 200 && response.statusCode <= 299) {
            return {
              url: response.request.href,
              statusCode: response.statusCode
            };
          }
        });
        resolve(responseStatus)
      } else {
        reject({
            message: "No Valid Server!"
        })
      }
    
    });
  });
};

const findServer = (sentServers) => {

  return new Promise(async (resolve, reject) => {

    await getWorkingServers(sentServers)
      .then(workingServers => {
        if(_.isEmpty(workingServers)) {
          reject("No Available Server!");
        }
        sentServers = _.map(sentServers, (sentServer) => {
          sentServer.url = sentServer.url.replace(/(^\w+:|^)\/\//, '').toLowerCase();
          return sentServer;
        });
    
        _.forEach(workingServers, (workingServer) => {
          const matchedServer = _.find(sentServers, { url: workingServer.url
                                                        .replace(/(^\w+:|^)\/\//, '')
                                                        .replace(/\/$/, '')
                                                        .replace('www.','')
                                                    });
          workingServer.priority = matchedServer.priority;
        });
        workingServers = _.sortBy(workingServers, 'priority');
        resolve(workingServers[0])
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = { findServer };