import { format } from "date-fns";
import { getSelectedText } from "@raycast/api";

//Return the current date as an ISO string without the time (which is what the Reflect API expects)
export function getTodaysDateAsISOString() {
  return format(new Date(), "yyyy-MM-dd");
}

export function applyTextTransform(text: string, preferences: Preferences.QuickAppend) {
  if (preferences.prependTimestamp) {
    const timestamp = format(new Date(), "h:maaa");
    text = `${timestamp} ${text}`;
  }
  if (preferences.includeSelectedText) {
    let selectedText: string | undefined;
    try {
      selectedText = await getSelectedText();
    }
    catch (error) { 
      selectedText = undefined; 
    }
    text = `${text}\n- ${selectedText}`;
  }
  return text;
}

export function getBrowserURL() {
  let url: string | undefined;
  return url;
}