import { format } from "date-fns";
import { runAppleScript } from "run-applescript";
import { getSelectedText } from "@raycast/api";

//Return the current date as an ISO string without the time (which is what the Reflect API expects)
export function getTodaysDateAsISOString() {
  return format(new Date(), "yyyy-MM-dd");
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
    text = await addBrowserURL(text);
  }
  return text;
}

async function addSelectedText(text: string) {
  try {
    const selectedText = await getSelectedText();
    return `${text}\n- ${selectedText}`;
  } catch (error) {
    return text;
  }
}

async function addBrowserURL(text: string) {
  const url = await runAppleScript(`
  tell application "System Events" to set frontApp to name of first process whose frontmost is true
if (frontApp = "Safari") or (frontApp = "Webkit") then
	using terms from application "Safari"
		tell application frontApp to set currentTabUrl to URL of front document
	end using terms from
else if (frontApp = "Google Chrome") or (frontApp = "Google Chrome Canary") or (frontApp = "Chromium") then
	using terms from application "Google Chrome"
		tell application frontApp to set currentTabUrl to URL of active tab of front window
	end using terms from
else if (frontApp = "Arc") then
	using terms from application "Arc"
		tell application frontApp to set currentTabUrl to URL of active tab of window 1
	end using terms from
else
	return ""
end if
return currentTabUrl
  `);
  if (url === "") {
    return text;
  }
  return `${text}\n- ${url}`;
}
