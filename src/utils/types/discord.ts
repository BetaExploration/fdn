
export type rawGuild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export type Guild = {
    guild: rawGuild;
    notifPreferences: notifPreference;
}

export type notifPreference =
  | typeof notifPreferences.Important
  | typeof notifPreferences.NotImportant
  | typeof notifPreferences.Empty;

export const notifPreferences = {
  Important: {
    "suppress_everyone": false,
    "suppress_roles": false,
    "message_notifications": 0,
    "mobile_push": true,
    "muted": false,
  },
  NotImportant: {
    "suppress_everyone": true,
    "suppress_roles": true,
    "message_notifications": 2,
    "mobile_push": false,
    "muted": true,
  },
  Empty: {}
} as const;
