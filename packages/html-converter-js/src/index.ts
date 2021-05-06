import DOMPurify, { sanitize } from 'isomorphic-dompurify';

/**
 * @param str The string to be sanitized and converted to html
 * @param element If you provide tag it will create new element with that tag and return the newly created element with the sanitized version of the string inside of it. However, if you provide HTMLElement it will just append the sanitzed string to that element
 * @param dompurifyConfig Read dompurify documentation on npm/yarn.
 *
 */
export const htmlConverter = (
  str: string,
  element: HTMLElement | keyof HTMLElementTagNameMap,
  dompurifyConfig?: DOMPurify.Config
): [HTMLElement, string] => {
  if (typeof document === undefined)
    throw new Error(
      'This htmlConverter only works on client. Use htmlConverterReact for an isomorphic version of this function (if you are using react)'
    );

  // Sanitizing the data
  const cleanData = sanitize(str, dompurifyConfig || {});

  if (typeof cleanData !== 'string')
    throw new Error(
      "The sanitized data isn't string. Don't provide any of the properties that change the return type of dompurify. Example DON'T PROVIDE: RETURN_DOM_IMPORT?: boolean; RETURN_TRUSTED_TYPE?: boolean; WHOLE_DOCUMENT?: boolean"
    );

  if (typeof element === 'string') {
    const dom = document.createElement(element);
    // dom.innerHTML = cleanData;
    dom.insertAdjacentHTML('beforeend', cleanData);

    return [dom as HTMLElement, cleanData];
  }

  element.innerHTML = cleanData;
  return [element, cleanData];
};
