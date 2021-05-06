## html-converter-react

**html-converter-react** is an isomorphic utility function that provides easy way to convert your string into a safely sanitized html. It's built on top of dompurify and it's made to work with react.

Works both on server side and client side (CSR/SSR). You can use Next.js/Gatsby.js/CRA

Full documentation on: https://github.com/Blagoj5/html-converter#readme

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
