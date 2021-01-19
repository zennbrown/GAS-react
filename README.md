# GAS-react

With gas-react you can create a react app bundle that will work on the Google App Script server, allowing you to build react apps that integrate with the the google suite.

</br>

![NPM](https://img.shields.io/npm/l/gas-react) ![NPM](https://img.shields.io/npm/v/gas-react) ![NPM](https://img.shields.io/npm/dw/gas-react) ![GIT](https://img.shields.io/github/last-commit/zennbrown/gas-react)

---

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [API](#api)
- [Features](#features)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

---

## Installation

- Create a new react app with <a href="https://github.com/facebook/create-react-app" target="_blank">create-react-app</a>
- Open a command line in your app directory
- Run `npm install gas-react`

```shell
$ npm install gas-react
```

## Setup

- To get started, run `npx gas-react init`

```shell
$ npx gas-react init
```

## Usage

- Once gas-react is installed and initialized, run `npm run build` to create your gas bundle

```shell
$ npm run bundle
```
This will bundle your client and server code it to the `/clasp` folder

Use <a href="https://developers.google.com/apps-script/guides/clasp" target="_blank">clasp</a> to push your files to Google

> Check out our <a href="https://github.com/JazzBrown1/gas-react-example" target="_blank">gas-react-example</a> repo for more info on how to do this

---

## API

Gas-react includes a simple and familiar api interface for client-server communication.

> Server Example

```javascript
import { server } from 'gas-react';

server.before((req) => { console.log('Request:', req); });

server.on('hello', ({ body }) => `Hello ${body}`);

```
> Client Example

```javascript
import React, { useState, useEffect } from 'react';
import { client } from 'gas-react';

function HelloWorld() {
  const [val, setVal] = useState('Loading..');

  useEffect(() => {
    client.send('hello', 'World').then((response) => {
      if (!response.error) setVal(response.body);
      else setVal('Server Error');
    }).catch(() => {
      setVal('Connection Error');
    });
  }, []);

  return (
    <div className="hello-world">
      <div>{val}</div>
    </div>
  );
}

export default HelloWorld;
```
---

## Features

- Compile React-Apps into a Google App Scripts friendly bundle
- Simple and familiar client - server api protocol
- Created to be used with the create-react-app toolSet, unleashing its power
- Javascript ES6 module support for GAS server

---

## Team

| <a href="https://github.com/zennbrown" target="_blank">**zennbrown**</a> | <a href="https://github.com/JazzBrown1" target="_blank">**JazzBrown1**</a> |
| :---: |:---:|
| [![ZeeJayproductions](https://avatars3.githubusercontent.com/u/43099003?s=200&v=4)](https://github.com/zennbrown)    | [![ZeeJayproductions](https://avatars0.githubusercontent.com/u/49795452?s=200&v=4)](https://github.com/JazzBrown1) |
| <a href="https://github.com/zennbrown" target="_blank">`github.com/zennbrown`</a> | <a href="https://github.com/JazzBrown1" target="_blank">`github.com/JazzBrown1`</a> |

---

## FAQ

**We haven't had any questions yet but please feel free to get in touch if you have a query!**

---

## Support


Contact zennbrowndev@gmail.com for support


---

## License

![NPM](https://img.shields.io/npm/l/gas-react)

- **[MIT license](https://opensource.org/licenses/MIT)**
