## html-converter-full

Are you tired of thinking for ways how to safely convert your string to a html or using dangerouslysetinnerhtml and worrying about any xss attacks when doing so? Well worry not, html-converter-full provides easy way to convert your string into a safely sanitized html. It's built on top of dompurify and it's made to work with react and vanilla js.

### What and why is sanitization important?

Data Sanitization or in this case XSS Sanitization is crucial to prevent a [XSS Attack](https://owasp.org/www-community/attacks/xss/). Sanitization must be done before rendering any third-party content into the UI. So what html-converter does is it removes any dangeroues tags like `<script /> or alert` (of course if you intend to have some dangerous tags in your code, you can completely disable sanitization or filter out those tags)

### Two main functions for converting:

1. html-converter-react - Isomorphic React converter (works on SSR and CSR) for translating your string into a html. <b>Returns JSX.Element | JSX.Element[] | string with sanitized data</b>(all dangerous tags removes)
2. html-converter-js - Vanilla Js converter (works only on CSR) for translating your string into a html. Read bellow to see how it works

### html-converter-full

It has both html-converter-react and html-converter-js

#### Installation

```
npm install html-converter-full
yarn add html-converter-full
```

#### Usage

```js
import { htmlConverterReact, htmlConverter } from 'html-converter-full';
```

### html-converter-react

Works both on server side and client side (CSR/SSR). You can use Next.js/Gatsby.js/CRA

#### Installation

```
npm install html-converter-react
yarn add html-converter-react
```

#### Usage

```js
import { htmlConverterReact } from 'html-converter-react';

const text = '<p>Paragraph</p>';
const textEls = '<p>Paragraph</p><p>Second paragraph</p>';
const dangerousText = '<p>Paragraph<script></script></p>';

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      {htmlConverterReact(text)}
      {htmlConverterReact(textEls)}
      {htmlConverterReact(dangerousText)}
    </div>
  );
};
```

**Explanation:**

- htmlConverterReact(text) - returns JSX.Element paragraph
- htmlConverterReact(textEls) - returns JSX.Element paragraph with sanitized data: `<p>Paragraph</p>` (without script tag)
- htmlConverterReact(dangerousText) - returns JSX.Element[] array of jsx elements, two paragraphs

#### Options

| Option           | Description                                                               | Default      |
| ---------------- | ------------------------------------------------------------------------- | ------------ |
| str              | The string to be sanitized and parsed into a html                         |              |
| dompurifyConfig  | [Dompurify options](https://www.npmjs.com/package/dompurify)              | undefined    |
| htmlParserConfig | [HTMLReactParserOptions](https://www.npmjs.com/package/html-react-parser) | {trim: true} |

### html-converter-js

Works only on client-side

#### Installation

```
npm install html-converter-js
yarn add html-converter-js
```

#### Usage

```js
import { htmlConverter } from 'html-converter-js';
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

#### Options

<!-- prettier-ignore -->
| Option           | Description                                                               | Default      |
| ---------------- | ------------------------------------------------------------------------- | ------------ |
| str              | The string to be sanitized and parsed into a html                         |              |
| element  |  type: **HTMLElement \| keyof HTMLElementTagNameMap**. Description: If you provide html tag (b, p, div ...) it will create new element with that tag and return the newly created element with the sanitized version of the string inside of it. However, if you provide HTMLElement it will just append the sanitzed string to that element. **Return: [HTMLElement, string], the first element of the array is the newly created element or the element that was updated and the second element of the array is the sanitzed data/string**  | |
| dompurifyConfig  | [Dompurify options](https://www.npmjs.com/package/dompurify)              | undefined    |
