## html-converter-js

**html-converter-js** is an utility function that provides easy way to convert your string into a safely sanitized html. It's built on top of dompurify.

Works only on client-side (CSR).

Full documentation: https://github.com/Blagoj5/html-converter#readme

### Installation

```
npm install html-converter-js
yarn add html-converter-js
```

### Usage

Javascript code:

```js
import { htmlConverter } from 'html-converter-js'; // ES6
const { htmlConverter } = require('html-converter-js'); // ES5
const element = document.querySelector('#test-p');

const text = '<p>Paragraph</p>';
const textEls = '<p>Paragraph</p><p>Second paragraph</p>';
const dangerousText = '<p>Paragraph<script></script></p>';

// Two ways:
// 1
const [newlyCreatedEl, cleanedData] = htmlConverter(text, 'p'); // If you provide HTML tag -> it will create the specified element and it will append the sanitized text into that element. Drawback: you have to automatically add it to the element you want

element.appendChild(newlyCreatedEl);
// or
element?.insertAdjacentElement('beforeend', newlyCreatedEl);
// or just add the cleaned/sanitized string you want like this
element?.insertAdjacentHTML('beforeend', cleanData); // newTag is not valid because of jsdom and because im not testing it on an actual browser env

// 2
const [_, cleanedData] = htmlConverter(text, element); // If you pass the element itself it will append the sanitized text using insertAdjacentHTML into that element. The first element of the returned array is the element itself.

console.log(`Sanitzed text: ${cleanedData} has been added to element ${element}`);
```

For html:

```html
<html>
  <head>
    <title>My Notes</title>
    <link href="style.css" rel="stylesheet" />
  </head>
  <body>
    <h1>My App</h1>
    <p id="test-p"></p>
  </body>
</html>
```

### Usage with script tag

Bundled version of the package must be used:

```html
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="node_modules/html-converter-js/dist/bundle.js"></script>
  </head>
  <body>
    <h1>My app</h1>
    <p id="p-test"></p>
    <script>
      const { htmlConverter } = require('html-converter-js');
      const element = document.getElementById('p-test');

      const text = '<p>Paragraph</p>';
      const textEls = '<p>Paragraph</p><p>Second paragraph</p>';
      const dangerousText = `<p>Paragraph<script><\/script></p>`;

      // Two ways:
      // 1
      const [newlyCreatedEl, cleanData] = htmlConverter(text, 'b'); // If you provide HTML tag -> it will create the specified element and it will append the sanitized text into that element. Drawback: you have to automatically add it to the element you want
      console.log(cleanData);

      element.appendChild(newlyCreatedEl);
      // or
      element?.insertAdjacentElement('beforeend', newlyCreatedEl);
      // or just add the cleaned/sanitized string you want like this
      element?.insertAdjacentHTML('beforeend', cleanData); // newTag is not valid because of jsdom and because im not testing it on an actual browser env
      // 2
      const [_, cleanedData] = htmlConverter(textEls, element); // If you pass the element itself it will append the sanitized text using insertAdjacentHTML into that element. The first element of the returned array is the element itself.

      console.log(`Sanitzed text: ${cleanedData} has been added to element ${element}`);
    </script>
  </body>
</html>
```

#### Options

<!-- prettier-ignore -->
| Option           | Description                                                               | Default      |
| ---------------- | ------------------------------------------------------------------------- | ------------ |
| str              | The string to be sanitized and parsed into a html                         |              |
| element  |  type: **HTMLElement \| keyof HTMLElementTagNameMap**. Description: If you provide html tag (b, p, div ...) it will create new element with that tag and return the newly created element with the sanitized version of the string inside of it. However, if you provide HTMLElement it will just append the sanitzed string to that element. **Return: [HTMLElement, string], the first element of the array is the newly created element or the element that was updated and the second element of the array is the sanitzed data/string**  | |
| dompurifyConfig  | [Dompurify options](https://www.npmjs.com/package/dompurify)              | undefined    |
