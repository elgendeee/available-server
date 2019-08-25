const express = require('express');
const bodyParser = require('body-parser');
const { findServer } = require('./AvailbaleServer');

const app = express();
app.use(bodyParser.json());

app.post('/servers/available', async function(req, res) {

  const sentServers = req.body;
  await findServer(sentServers)
    .then(workingServer => {
      res.send(workingServer);
    })
    .catch(error => {
      res.send({errorMessage: error.message});
    });
});

const port = process.env.PORT || 3030;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Running on port ${port}`);
});