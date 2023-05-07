import { appendToDailyNote, ReflectApiError } from "./api";
import { processArgumentText } from "./utils";
import { getSelectedText, getPreferenceValues, openExtensionPreferences, LaunchProps } from "@raycast/api";
import { confirmAlert, showToast, Toast, closeMainWindow } from "@raycast/api";

export default async (props: LaunchProps<{ arguments: Arguments.QuickAppend }>) => {
  const preferences: Preferences.QuickAppend = getPreferenceValues();

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Appending to Reflect Daily Note...",
  });

  try {
    const selectedText = await getSelectedText();
    props.arguments.text = processArgumentText(props.arguments.text, preferences, selectedText)
    await appendToDailyNote(
      preferences.authorizationToken,
      preferences.graphId,
      props.fallbackText || props.arguments.text,
      preferences.listName
    );

    toast.hide();
  } catch (error) {
    if (error instanceof ReflectApiError) {
      toast.style = Toast.Style.Failure;
      toast.title = error.message;

      await confirmAlert({
        title: error.message,
        icon: "reflect.png",
        primaryAction: {
          title: "Open Preferences",
          onAction: openExtensionPreferences,
        },
      });
    }
  } finally {
    await closeMainWindow();
  }
};
