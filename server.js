const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());

const getWorkingServers = (sentServers) => {

  return new Promise((resolve, reject) => {
    const urls = sentServers.map(server => {
      return server.url;
    });
    const arr = [];
    urls.forEach(url => {
      arr.push(
        request({
          url: url,
          timeout: 5000,
          method: 'GET',
          resolveWithFullResponse: true
        })
      )
    });
    Promise.all(arr)
      .then((data) => {
        const responseStatus = data.map(response => {
          if(response.statusCode >= 200 && response.statusCode <= 299){
            return {
              url: response.request.href,
              statusCode: response.statusCode
            };
          }
        });
        resolve(responseStatus);
      })
      .catch(error => { 
        reject({
          message: "invalid url caused error",
          url: error.options.url,
          Errror: error.name,
          statusCode: error.statusCode
        });
      });
  });
};
const findServer = async (sentServers) => {

  const workingServers = await getWorkingServers(sentServers);
  sentServers = _.map(sentServers, (sentServer) => {
    sentServer.url = sentServer.url.replace(/(^\w+:|^)\/\//, '').toLowerCase();
    return sentServer;
  });

  _.forEach(workingServers, (workingServer) => {
    const matchedServer = _.find(sentServers, { url: workingServer.url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '').replace('www.','') });
    workingServer.priority = matchedServer.priority;
  });
  console.log(workingServers)
};

app.post('/servers/available', async function(req, res) {

  
  const sentServers = req.body;
  const availableServer = await findServer(sentServers);
});

app.listen(3030, (err) => {
  if (err) console.log(err);
  console.log(`Running on port ${3030}`);
});