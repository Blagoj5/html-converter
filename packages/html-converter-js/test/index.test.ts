import { htmlConverter } from "../src";

const dangerousTags = /(script)|(alert)/;
const htmlUseCases = [
  "<p>Test</p>",
  "<p>Test</p><b>Test-Bold</b>",
  "<div>test</div>",
];
const htmlUseCasesDangerous = [
  '<p onClick={alert("Im dangerous")}>Test</p>',
  "<p><script></script></p>",
  "<div>test<script>Steal Something</script></div>",
];
const stringUseCases = ["Test", "TestTest-Bold", "test"];
const stringUseCasesDangerous = ["Test<script>test</script>"];

import { JSDOM } from "jsdom";

describe("htmlConverter", () => {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const element = dom.window.document.querySelector("p");

  beforeEach(() => {
    element!.innerHTML = ""; // reset
  });

  test("should return error if invalid props to dompurify passed", () => {
    const convertedDataCallback = () =>
      htmlConverter("test", "p", { RETURN_DOM: true });
    expect(convertedDataCallback).toThrow();
  });

  test("should return the same string", () => {
    htmlUseCases.forEach((useCase) => {
      const [, cleanData] = htmlConverter(useCase, "div");
      expect(cleanData).toMatch(useCase);

      const [, cleanData2] = htmlConverter(useCase, element!);
      expect(cleanData2).toMatch(useCase);
    });

    stringUseCases.forEach((useCase) => {
      const [, cleanData] = htmlConverter(useCase, "div");
      expect(cleanData).toMatch(useCase);

      const [, cleanData2] = htmlConverter(useCase, element!);
      expect(cleanData2).toMatch(useCase);
    });
  });

  test("should sanitize data and create new element", () => {
    // ['<p onClick={alert("Im dangerous")}>Test</p>', '<p><script></script></p>'].forEach((useCase) => {
    htmlUseCasesDangerous.forEach((useCase) => {
      element!.innerHTML = ""; // reset

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, cleanData] = htmlConverter(useCase, "div");

      expect(cleanData).toEqual(expect.not.stringMatching(dangerousTags));

      element?.insertAdjacentHTML("beforeend", cleanData); // newTag is not valid because of jsdom and because im not testing it on an actual browser env
      expect(element?.children).toHaveLength(1);
    });

    stringUseCasesDangerous.forEach((useCase) => {
      element!.innerHTML = ""; // reset

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, cleanData] = htmlConverter(useCase, "div");

      expect(cleanData).toEqual(expect.not.stringMatching(dangerousTags));

      element?.insertAdjacentHTML("beforeend", cleanData); // newTag is not valid because of jsdom and because im not testing it on an actual browser env

      expect(element?.childNodes).toHaveLength(1);
    });
  });

  test("should sanitize data and append to existing element", () => {
    htmlUseCasesDangerous.forEach((useCase) => {
      element!.innerHTML = ""; // reset

      const [, cleanData] = htmlConverter(useCase, element!);

      expect(cleanData).toEqual(expect.not.stringMatching(dangerousTags));

      expect(element?.children).toHaveLength(1);
    });

    stringUseCasesDangerous.forEach((useCase) => {
      element!.innerHTML = ""; // reset

      const [, cleanData] = htmlConverter(useCase, element!);

      expect(cleanData).toEqual(expect.not.stringMatching(dangerousTags));

      expect(element?.childNodes).toHaveLength(1);
    });
  });
});
