import axios from "axios";
import { Guild, notifPreference } from "../types/discord";
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

  let updatedSettings = await axios.all(requests);
  return mapAxiosToNotifSettings(updatedSettings);
};

export const patchNotifSettings = async (token: string, guild_id: string, notifPreference) => {
  const request = await axios.patch(`${baseAPI}/${guild_id}/settings`,
        notifPreference,
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );

    let updatedSettings = request.data;
    return mapAxiosToNotifSettings(updatedSettings)[0];
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