import logo from './logo.svg';
import './App.css';
import { htmlConverterReact } from 'html-converter-react';
// OR
import { htmlConverterReact as _htmlConverterReact } from 'html-converter-full';

const text = '<p>Paragraph</p>';
const textEls = '<p>Paragraph</p><b>Second paragraph</b>';
const dangerousText = '<p>Paragraph<script></script></p>';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
      {htmlConverterReact(text)}
      {htmlConverterReact(textEls)}
      {htmlConverterReact(dangerousText)}
      {/* Or */}
      {_htmlConverterReact(text)}
      {_htmlConverterReact(textEls)}
      {_htmlConverterReact(dangerousText)}
    </div>
  );
}

export default App;
