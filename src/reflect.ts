import { appendToDailyNote } from "./api";

import { getPreferenceValues, closeMainWindow, LaunchProps } from "@raycast/api";

export default async (props: LaunchProps<{ arguments: Arguments.Reflect }>) => {
  const preferences: Preferences.Reflect = getPreferenceValues();

  await appendToDailyNote(
    preferences.authorizationToken,
    preferences.graphId,
    props.fallbackText || props.arguments.text,
    preferences.listName
  );

  await closeMainWindow();
};
