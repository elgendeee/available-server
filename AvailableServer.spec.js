const { expect } = require('chai');
const { describe, it }  = require('mocha');
const { findServer, getWorkingServers } = require('./AvailbaleServer');

const allValidServers = [
    {
      "url": "http://doesNotExist.bosta.co",
      "priority": 1
    },
    {
      "url": "http://bosta.co",
      "priority": 7
    },
    {
      "url": "http://offline.bosta.co",
      "priority": 2
    },
    {
      "url": "http://google.com",
      "priority": 4
    }
];

const allValidExceptOne = [
  {
    "url": "https://httpstat.us/403",
    "priority": 1
  },
  {
    "url": "http://bosta.co",
    "priority": 7
  },
  {
    "url": "http://offline.bosta.co",
    "priority": 2
  },
  {
    "url": "http://google.com",
    "priority": 4
  }
];

describe('AvailbaleServer - findServer =>', () => {

  it('return the available server with the lowest priority', async () => {

    const response = await findServer(allValidServers);
    expect(response.url).to.be.equal("http://doesnotexist.bosta.co/");
  }).timeout(10000);

  it('though there is an invalid server, return the available server with the lowest priority', async () => {

    const response = await findServer(allValidExceptOne);
    expect(response.url).to.be.equal("http://offline.bosta.co/");
  }).timeout(10000);
});