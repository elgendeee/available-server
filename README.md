

## Installation


```bash
npm install
```

## Usage

```bash
npm start
```
then do a post request to url:
```bash
http://localhost:3030/servers/available
```
## a working demo here
```bash
https://vast-ocean-57397.herokuapp.com/servers/available
```
## npm package
```bash
https://www.npmjs.com/package/find-available-server
```

## examples of servers

1) that will return the lowest priority valid url
```
[
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
]
```

2) that will return that there is no valid server
```
[
	{
 "url": "https://httpstat.us/401",
 "priority": 1
 },
 {
 "url": "https://httpstat.us/402",
 "priority": 1
 },
 {
 "url": "https://httpstat.us/403",
 "priority": 7
 },
 {
 "url": "https://httpstat.us/404",
 "priority": 2
 }
]```

