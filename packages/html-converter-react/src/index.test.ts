import { htmlConverterReact } from '.';

const dangerousTags = /(script)|(alert)/;
const htmlUseCases = ['<p>Test</p>', '<p>Test</p><b>Test-Bold</b>', '<div>test</div>'];
const htmlUseCasesDangerous = [
  '<p onClick={alert("Im dangerous")}>Test</p>',
  '<p><script></script></p>',
  '<div>test<script>Steal Something</script></div>',
];
const stringUseCases = ['Test', 'TestTest-Bold', 'test'];
const stringUseCasesDangerous = ['Test<script>test</script>'];

describe('htmlConverterReact', () => {
  test('should return error if invalid options are passed to dompurify', () => {
    const convertedDataCallback = () => htmlConverterReact(htmlUseCases[0], { RETURN_DOM: true });
    expect(convertedDataCallback).toThrow();
  });

  test('should return JSX.Element or JSX.Element[]', () => {
    htmlUseCases.forEach((useCase) => {
      let convertedValue = htmlConverterReact(useCase);
      expect(typeof convertedValue === 'object').toBeTruthy();
      if (Array.isArray(convertedValue)) {
        expect(convertedValue).toHaveLength(2);
        convertedValue = convertedValue[0]; // get the first elment for checking if the object is in the right form
      }

      expect(convertedValue).toMatchObject({
        type: (convertedValue as JSX.Element).type,
        key: (convertedValue as JSX.Element).key,
        props: (convertedValue as JSX.Element).props,
      });
    });
  });

  test('should return sanitized JSX.Element or JSX.Element[]', () => {
    htmlUseCasesDangerous.forEach((useCase) => {
      let convertedValue = htmlConverterReact(useCase);
      expect(typeof convertedValue === 'object').toBeTruthy(); // needs to be JSX.Element or JSX.Element[]
      if (Array.isArray(convertedValue)) {
        expect(convertedValue).toHaveLength(2);
        convertedValue = convertedValue[0]; // get the first elment for checking if the object is in the right form
      }

      expect(convertedValue).toMatchObject({
        type: (convertedValue as JSX.Element).type,
        key: (convertedValue as JSX.Element).key,
        props: (convertedValue as JSX.Element).props,
      });

      expect((convertedValue as JSX.Element).props.children).toEqual(expect.not.stringMatching(dangerousTags));
    });
  });

  test('should return string', () => {
    stringUseCases.map((useCase) => {
      expect(typeof htmlConverterReact(useCase) === 'string').toBeTruthy();
    });
  });

  test('should return sanitized string', () => {
    stringUseCasesDangerous.map((useCase) => {
      const convertedValue = htmlConverterReact(useCase, undefined);

      expect(typeof convertedValue === 'string').toBeTruthy();
      expect(convertedValue as string).toEqual(expect.not.stringMatching(dangerousTags));
    });
  });
});
