function breakMd(md: string) {
  return md.split("\n\n");
}

export function getTitleMd(markdown: string) {
  return breakMd(markdown)[0].replace("# ", "");
}

export function getFirstParagraphMd(markdown: string) {
  return breakMd(markdown)[1];
}
