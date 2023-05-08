import { format } from "date-fns";
import { runAppleScript } from "run-applescript";
import { getSelectedText } from "@raycast/api";

//Return the current date as an ISO string without the time (which is what the Reflect API expects)
export function getTodaysDateAsISOString() {
  return format(new Date(), "yyyy-MM-dd");
}

export async function addSelectedText(text: string) {
  try {
    let selectedText = await getSelectedText();
    return `${text}\n- ${selectedText}`;
  } catch (error) {
    return text;
  }
  
}

export async function addApplicationDeeplink(text:string) {
  let url = await runAppleScript(`
  tell application "System Events" to set frontApp to name of first process whose frontmost is true
  if (frontApp = "Safari") or (frontApp = "Webkit") then
    using terms from application "Safari"
      tell application frontApp to set currentTabUrl to URL of front document
      tell application frontApp to set currentTabTitle to name of front document
    end using terms from
  else if (frontApp = "Google Chrome") or (frontApp = "Google Chrome Canary") or (frontApp = "Chromium") then
    using terms from application "Google Chrome"
      tell application frontApp to set currentTabUrl to URL of active tab of front window
      tell application frontApp to set currentTabTitle to title of active tab of front window
    end using terms from
  else
    return ""
  end if
  return currentTabUrl
  `)
  if (url === "") {
    return text;
  }
  return `${text}\n- ${url}`;
}

export async function applyTextTransform(text: string, preferences: Preferences.QuickAppend) {
  if (preferences.prependTimestamp) {
    const timestamp = format(new Date(), "h:maaa");
    text = `${timestamp} ${text}`;
  }
  if (preferences.includeSelectedText) {
    text = await addSelectedText(text);
  }
  if (preferences.includeDeeplink) {
    text = await addApplicationDeeplink(text);
  }
  console.log(text);
  return text;
}

export function getBrowserURL() {
  let url: string | undefined;
  return url;
}