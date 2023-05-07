//Return the current date as an ISO string without the time (which is what the Reflect API expects)
export function getTodaysDateAsISOString() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().substring(0, 10);
}

export function collectNestedText(
  selectedText: string | undefined,
  clipboardText: string | undefined,
  preferences: Preferences.QuickAppend
) {
  let nestedText = "";
  if (selectedText) {
    nestedText = selectedText;
  } else if (preferences.includeClipboard && clipboardText) {
    nestedText = `${clipboardText}`;
  }
  return nestedText;
}

export function processArgumentText(
  text: string,
  preferences: Preferences.QuickAppend,
  nestedText: string | undefined
) {
  if (preferences.prependTimestamp) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    text = `${timestamp} ${text}`;
  }
  if (nestedText) {
    text = `${text}\n- ${nestedText}`;
  }
  return text;
}
