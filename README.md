# [@synapsestudios/react-drop-n-crop](https://synapsestudios.github.io/react-drop-n-crop/)

A combined implementation of [react-dropzone](https://github.com/okonet/react-dropzone) and [react-cropper](https://github.com/roadmanfong/react-cropper) ([Cropper.js](https://github.com/fengyuanchen/cropperjs)) for front-end image upload/validation/cropping.

[![npm version](https://img.shields.io/npm/v/@synapsestudios/react-drop-n-crop.svg?style=flat)](https://www.npmjs.com/package/@synapsestudios/react-drop-n-crop)
[![react-drop-n-crop dependencies](https://img.shields.io/david/synapsestudios/react-drop-n-crop.svg)](https://david-dm.org/synapsestudios/react-drop-n-crop)
[![react-drop-n-crop peer dependencies](https://img.shields.io/david/peer/synapsestudios/react-drop-n-crop.svg)](https://david-dm.org/synapsestudios/react-drop-n-crop?type=peer)

## Demo

A demo is available at [https://synapsestudios.github.io/react-drop-n-crop/](https://synapsestudios.github.io/react-drop-n-crop/)

## Usage

#### Installing via CLI
```js
// yarn
yarn add @synapsestudios/react-drop-n-crop

// npm
npm install --save @synapsestudios/react-drop-n-crop
```

#### Importing JS
```js
import DropNCrop from '@synapsestudios/react-drop-n-crop';
```

#### Using JSX
```jsx
<DropNCrop
  onChange={(file) => {
    console.log(file);
  }}
/>
```

### Importing CSS
```js
// Minified, autoprefixed css, 
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';

// Not-minified, not-autoprefixed css
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.css';
```

### Using Stylus
If you are using Stylus you can import the .styl file into your build:
```styl
@import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.styl';
```
! See the [Stylus Variables](#stylus-variables) section below for variables/details.

## API

### `Props`

#### onChange: (required)

`onChange` is the callback function necessary to update the parent component with the final cropped image file. `onChange` receives a `File` object as an argument.
```js
onChange: PropTypes.func.isRequired,
```

#### canvasHeight:

`canvasHeight` is a `string` for the container inline style `height` property.
```js
canvasHeight: PropTypes.string, // default: '360px'
```

#### canvasWidth:

`canvasWidth` is a `string` for the container inline style `width` property.

```js
canvasWidth: PropTypes.string, // default: '100%'
```

#### className:

`className` is a `string` for the outermost container class name.

```js
className: PropTypes.string, // default: ''
```

#### cropperOptions:

`cropperOptions` is an `object` for customizing the cropper component. Lists of available options can be found here: https://github.com/roadmanfong/react-cropper
```js
cropperOptions: PropTypes.object, // default: {guides: true, viewMode: 0, autoCropArea: 1}
```

#### maxFileSize:

`maxFileSize` is a maximum `number` (in bytes) for file upload validation.
```js
maxFileSize: PropTypes.object, // default: 3145728
```

#### allowedFileTypes:

`allowedFileTypes` is an `array` (of strings) of valid MIME types for file upload validation.
```js
allowedFileTypes: PropTypes.array, // default: ['image/jpeg', 'image/jpg', 'image/png']
```

### Stylus Variables
react-drop-n-crop comes with a set of stylus variables that can be overridden to add your own project-specific theming, as shown below:

```styl
/* Theming by overriding default stylus variables with your projects colors */

$drop-n-crop--primary-color = $your-project-primary-color;
$drop-n-crop--error-color = $your-project-error-color;

$drop-n-crop--body-color = $your-project-body-color;
$drop-n-crop--heading-color = $your-project-heading-color;

$drop-n-crop--input-background-color = $your-project-background-color;
$drop-n-crop--input-border-color = $your-project-border-color;

@import '@synapsestudios.com/react-drop-n-crop/css/react-drop-n-crop.styl';
```

## Contributing

To run the project on your own computer:
* Clone this repository
* `yarn install` or `npm install`
* `yarn run storybook` or `npm run storybook`
* Visit http://localhost:5000/
* Changes made to files in the `src` directory should immediately compile and be visible in your browser.
