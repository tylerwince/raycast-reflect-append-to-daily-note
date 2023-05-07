//Return the current date as an ISO string without the time (which is what the Reflect API expects)
export function getTodaysDateAsISOString() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().substring(0, 10);
}

export function processArgumentText(text: string, preferences: Preferences.QuickAppend) {
  if (preferences.prependTimestamp) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    text = `${timestamp} ${text}`;
  }
  return text;
}