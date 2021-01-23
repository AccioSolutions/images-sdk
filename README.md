# @acciosolutions/images

[![NPM Module](https://img.shields.io/npm/v/@acciosolutions/images.svg)](https://www.npmjs.com/package/@acciosolutions/images)

A library to upload images from NodeJS

The API of this library is inspired by https://imgur.com

[![Dependency Status](https://img.shields.io/david/AccioSolutions/images-sdk.svg)](https://david-dm.org/AccioSolutions/images-sdk)

## Install

Using npm

```bash
npm install --save @acciosolutions/images
```

Using yarn

```bash
yarn add @acciosolutions/images
```

## Usage

You need import the AccioClient from library

```js
import { AccioClient } from "@acciosolutions/images";
```

```js
import AccioClient from "@acciosolutions/images";
```

```js
const AccioClient = require("@acciosolutions/images");
```

```js
const { AccioClient } = require("@acciosolutions/images");
```

You need setup the AccioClient with ClientID and ClientSecret

```js
const client = new AccioClient({
  clientId: string;
  clientSecret: string;
})
```

### Methods

- [ _AccioClient_ uploadFromPath() ] (https://github.com/acciosolutions/images-sdk#AccioClient.uploadFromPath)

#### _AccioClient_ uploadFromPath()

Usage

```js
const file = path.resolve(__dirname, "image.png");
const response: UploadResponse = await client.uploadFromPath(file);
```

### Interfaces

```ts
interface UploadResponse {
  deleteHash: string;
  uuid: string;
  url: string;
  directUrl: string;
  createdAt: string;
  updatedAt: string;
}
```

## License

@acciosolutions/images is released under the [MIT](License) license.
