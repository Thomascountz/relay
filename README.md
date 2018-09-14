# Relay <img src="https://s8.postimg.cc/kqvsuvir9/Relay_Logo.jpg" alt="relay logo" width="100" align="right"/>

Native text editor that reports NPL sentiment analysis 


[![Build Status](https://semaphoreci.com/api/v1/thomascountz1/relay/branches/master/badge.svg)](https://semaphoreci.com/thomascountz1/relay)

![Screen Shot 2018-09-14 at 2.14.59 PM.png](https://waffleio-direct-uploads-production.s3.amazonaws.com/uploads/58cc2389b8f05b2000fc6b5c/125516c66e82c728ace21e0d46db978826878de9bce1b057e40fa0c5710b772a6455f76b7191a37af1132f4f5a565ecc3c4a4356bcbbd671f3e57862804e0ebfd66b0c72903445f9b98a16be01ba21d91dd4e3ba834ad2f42f67b6d5db1063474f4dcbed5727a19f41c95df54de8495dad1a3460e4712431.png)

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
