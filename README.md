## Installation


```bash
npm install find-available-server
```

## Usage

```bash
const {findAvailableServer} = require('find-available-server');

const servers = [
	{
		"url": "http://doesNotExist.bosta.co",
		"priority": 1
	},
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

findAvailableServer(servers).then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
```