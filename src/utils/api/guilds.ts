import axios from "axios";
import { Guild, notifPreference, rawGuild } from "../types/discord";
import { baseAPI } from "./base";

export const getRawGuilds = async (token: string): Promise<rawGuild[]> => {
  let guilds = await axios.get(`${baseAPI}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return mapAxiosToRawGuild(guilds.data);
};

const mapAxiosToRawGuild = (guilds: any[]): rawGuild[] => {
  return guilds.map((guild) => ({
    id: guild.id,
    name: guild.name,
    icon: guild.icon,
    owner: guild.owner,
    permissions: guild.permissions,
    features: guild.features,
  }));
};


