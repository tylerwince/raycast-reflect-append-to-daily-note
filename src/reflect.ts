import { appendToDailyNote, ReflectApiError } from "./api";
import { getPreferenceValues, openExtensionPreferences, LaunchProps } from "@raycast/api";
import { confirmAlert, showToast, Toast, closeMainWindow } from "@raycast/api";

export default async (props: LaunchProps<{ arguments: Arguments.Reflect }>) => {
  const preferences: Preferences.Reflect = getPreferenceValues();

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Appending to Reflect Daily Note...",
  });

  try {
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
