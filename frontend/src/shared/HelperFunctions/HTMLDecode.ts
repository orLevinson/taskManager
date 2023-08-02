function hasUnescapedEntities(code: string) {
  const htmlEntityRegex = /&[^;]+;/g;
  const unescapedEntities = code.match(htmlEntityRegex);

  return unescapedEntities !== null && unescapedEntities.length > 0;
}

export default function HTMLDecode(text?: string): string | undefined {
  if (!text) {
    return;
  }

  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  if (hasUnescapedEntities(textArea.value)) {
    return HTMLDecode(textArea.value);
  }
  return textArea.value;
}
