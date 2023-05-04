import fetch, { Response } from "node-fetch";
import { getTodaysDateAsISOString } from "./utils";

// TODO: authorizationToken and graphId are typed as "any"" temporarily because the auto-generated types are not working
export async function appendToDailyNote(authorizationToken: any, graphId: any, text: string, listName?: string) {
  const url = `https://reflect.app/api/graphs/${graphId}/daily-notes`;

  const data = {
    date: getTodaysDateAsISOString(),
    text: text,
    list_name: listName,
    transform_type: "list-append",
  };

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  //TODO: Error handling
  try {
    await fetch(url, options);
  } catch (error) {
    console.error(error);
  }
}
