# Relay <img src="https://s8.postimg.cc/kqvsuvir9/Relay_Logo.jpg" alt="relay logo" width="100" align="right"/>

Native text editor that reports NPL sentiment analysis. 

[![Build Status](https://semaphoreci.com/api/v1/thomascountz1/relay/branches/master/badge.svg)](https://semaphoreci.com/thomascountz1/relay)

![Relay Screenshot](https://user-images.githubusercontent.com/19786848/45965404-614b8780-bff6-11e8-8351-4524a8cc1203.png)

## Quick Start
Download and Install here: https://github.com/Thomascountz/relay/releases

Use as you would a simple text editor. You can save your file, as well as the analysis, as a `.relay` file, you can open both `.relay` and `.txt` files, and when you click "Analyze," the magic happens!

At the top of the editor is the "ToneBar," this bar displays the overall tone of your document. It is not just the averaging of the tones found in each of the sentences, it's a seperate analysis that takes into account more that just the individual parts. 

Within the editor, you will see your sentences highlight in order to indicate the individual sentence's tone. This represents the most prevalent tone found in your sentence that peaks about a `5.0`. As you continue to type, your analysis will remain the same until you click "Analyze" once again.

### Known Issues

- Opening a document within the edtior will override any unsaved changes **WITHOUT WARNING**
- The external API may be sleeping when you first analyze your document. It may take up to 20 seconds for your analysis to appear

### Installation

Released here: https://github.com/Thomascountz/relay/releases

## Development

### Stack

- Electron - Desktop app javascript framework
- React - View templating framework
- Babel - ES6/JSX transformation
- Webpack - Asset manager/bundler
- npm - Javascript package manager
- Jest - Javascript test runner written for React
- Enzyme - Javascript testing utilities written for React
- NPL API - [Relay-service](https://github.com/thomascountz/relay-service)

### Installation
Based on the boilerplate here: https://github.com/Thomascountz/react-electron-webpack

- Clone this repo: `https://github.com/Thomascountz/relay.git`
- `cd` into `relay`
- Run `npm install`
- Hack away!

### Running Unit Test
```
npm test  # - or - #  jest --watchAll
```

Runs Jests and watches for file changes before automatically rerunning specs

### Running the Development Server
```
npm run-script start   # - or - #   npm start
```

Runs both `webpack --mode development` to package app into `/dist`, and `electron .` to serve the app, in parallel

### Packing for Release
```
npm run-script rebuild
```

### Issues and Bug Reports

https://github.com/Thomascountz/relay/issues

Runs `electron-packager`, for `darwin` only, and outputs/**overwrites** results into `/builds`


