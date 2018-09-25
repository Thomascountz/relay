# Relay <img src="https://s8.postimg.cc/kqvsuvir9/Relay_Logo.jpg" alt="relay logo" width="100" align="right"/>

Native text editor that reports NPL sentiment analysis 


[![Build Status](https://semaphoreci.com/api/v1/thomascountz1/relay/branches/master/badge.svg)](https://semaphoreci.com/thomascountz1/relay)

![Relay Screenshot](https://user-images.githubusercontent.com/19786848/45965404-614b8780-bff6-11e8-8351-4524a8cc1203.png)

## Stack

- Electron - Desktop app javascript framework
- React - View templating framework
- Babel - ES6/JSX transformation
- Webpack - Asset manager/bundler
- npm - Javascript package manager
- Jest - Javascript test runner written for React
- Enzyme - Javascript testing utilities written for React
- NPL API - Coming Soon

## Installation

Released here: https://github.com/Thomascountz/relay/releases

## Issues and Bug Reports

https://github.com/Thomascountz/relay/issues

## Development

Based on the boilerplate here: https://github.com/Thomascountz/react-electron-webpack

- Clone this repo: `https://github.com/Thomascountz/relay.git`
- `cd` into `relay`
- Run `npm install`
- Hack away!

```
npm run-script start   # - or - #   npm start
```

Runs both `webpack --mode development` to package app into `/dist`, and `electron .` to serve the app, in parallel

```
npm run-script rebuild
```

Runs `electron-packager`, for `darwin` only, and outputs/**overwrites** results into `/builds`

```
npm test  # - or - #  jest --watchAll
```

Runs Jests and watches for file changes before automatically rerunning specs
