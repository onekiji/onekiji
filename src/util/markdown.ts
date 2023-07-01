function breakMd(md: string) {
  return md.split("\n\n");
}

export function getTitleMd(markdown: string) {
  return breakMd(markdown)[0].replace("# ", "");
}

export function getFirstParagraphMd(markdown: string) {
  return breakMd(markdown)[1];
}

export function readingTimeMd(markdown: string) {
  const words = breakMd(markdown).reduce((acc, curr) => {
    return acc + curr.split(" ").length;
  }, 0);
  const minutes = Math.ceil(words / 200); // 200 words per minute is the average reading speed
  return minutes;
}
