export default function HTMLDecode(text?: string) {
  if (!text) {
    return;
  }

  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}
