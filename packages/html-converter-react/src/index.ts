import parse, { HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify, { sanitize } from 'isomorphic-dompurify';

type ReturnType = string | JSX.Element | JSX.Element[];

export const htmlConverterReact = (
  str: string,
  dompurifyConfig?: DOMPurify.Config,
  htmlParserConfig: HTMLReactParserOptions = { trim: true }
): ReturnType => {
  // Sanitizing the data
  const cleanData = sanitize(str, dompurifyConfig || ({} as any));

  if (typeof cleanData !== 'string')
    throw new Error(
      "The sanitized data isn't string. Don't provide any of the properties that change the return type of dompurify. Example DON'T PROVIDE: RETURN_DOM_IMPORT?: boolean; RETURN_TRUSTED_TYPE?: boolean; WHOLE_DOCUMENT?: boolean"
    );

  //   returning html string
  return parse(cleanData, htmlParserConfig) as any;
};
