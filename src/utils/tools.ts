import { notifPreference, notifPreferences } from "./types/discord";


export const compareNotifPreferences = (a: notifPreference, b: notifPreference): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
}

export const toggleNotifPreference = (pref: notifPreference): notifPreference => {
    return JSON.stringify(pref) ===
    JSON.stringify(notifPreferences.Important)
      ? notifPreferences.NotImportant
      : notifPreferences.Important;
}