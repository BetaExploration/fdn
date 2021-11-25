import axios from "axios";
import {
  Guild,
  notifPreference,
  notifPreferences,
  rawGuild,
} from "../types/discord";
import { baseAPI } from "./base";

export const patchAllNotifSettings = async (token: string, guilds: Guild[]) => {
  const requests = guilds.map((guild) => {
    return axios.patch(
      `${baseAPI}/${guild.guild.id}/settings`,
      guild.notifPreferences,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  });

  await axios.all(requests);
};

export const loadNotifSettings = async (token: string, guilds: rawGuild[]) => {
  const requests = guilds.map((guild) => {
    return axios.patch(
      `${baseAPI}/${guild.id}/settings`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  });

  let preferences = await axios
    .all(requests)
    .then(
      axios.spread((...responses) => {
        console.log(
          mapAxiosToNotifSettings(responses.map((response) => response.data))
        );
        return mapAxiosToNotifSettings(
          responses.map((response) => response.data)
        );
      })
    )
    .catch((errors) => {
      // react on errors.
    });

  return guilds.map((guild, index) => ({
    guild,
    notifPreferences:
      JSON.stringify(preferences[index]) === JSON.stringify(notifPreferences.Important)
        ? notifPreferences.Important
        : notifPreferences.NotImportant,
  }));
};

const mapAxiosToNotifSettings = (settings: any[]): notifPreference[] => {
  return settings.map((setting) => ({
    suppress_everyone: setting.suppress_everyone,
    suppress_roles: setting.suppress_roles,
    message_notifications: setting.message_notifications,
    mobile_push: setting.mobile_push,
    muted: setting.muted,
  }));
};
