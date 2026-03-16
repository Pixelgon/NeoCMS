const TRAILING_EMPTY_PARAGRAPHS_REGEX =
  /(?:<p(?:\s[^>]*)?>\s*(?:<br\s*\/?>|&nbsp;|\u00A0)?\s*<\/p>\s*)+$/gi;

export const stripTrailingEmptyParagraphs = (html: string) => {
  return html.replace(TRAILING_EMPTY_PARAGRAPHS_REGEX, "").trim();
};
