export function mediaPath(source: string) {
  return source.replace(/\.(png|jpe?g)$/i, ".webp");
}
export function cleanText(text: string) {
  return text
    .replace(/\u00e2\u20ac\u201d/g, "—")
    .replace(/\u00e2\u20ac\u201c/g, "–")
    .replace(/\u00c2/g, "");
}
