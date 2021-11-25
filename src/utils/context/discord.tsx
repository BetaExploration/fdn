import React, { createContext, useMemo, useState } from "react"
import { patchAllNotifSettings, patchNotifSettings } from "../api/notifications"
import { Guild, notifPreferences } from "../types/discord"


type DiscordContextValue = {
    /** List of guilds a user is a part of */
    guilds: Guild[];
    setGuilds(guilds: Guild[]): void;
    userToken: string;
    setUserToken(token: string): void;
    loading: boolean;
    setLoading(loading: boolean): void;
    error: string;
    setError(error: string): void;
    updateNotifPreferences(guildId: string): void;
    submitInitialNotifPreferences(initialGuilds: Guild[]): void;
}

const DiscordContext = createContext<DiscordContextValue | null>(null)

export const DiscordProvider = ({children}) => {
    const [guilds, setGuilds] = useState<Guild[]>(undefined)
    const [userToken, setUserToken] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>(undefined)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateNotifPreferences = (guildId: string) => {
        setGuilds(guilds.map(guild => {
            if (guild.guild.id === guildId) {
                setLoading(true);
                patchNotifSettings('OTEzMTQyNDc3MzQxNDg3MTI0.YZ6MTw.imfyxE_0uTigEKMg2dMfEAEQn8U', guild.guild.id, (guild.notifPreferences === notifPreferences.Important) ? guild.notifPreferences = notifPreferences.NotImportant : guild.notifPreferences = notifPreferences.Important).then((updatedPrefence) => {
                    guild.notifPreferences = updatedPrefence
                    setLoading(false);
                }).catch(err => {
                    setLoading(false);
                    setError(err.message)
                })
            }
            return guild
        }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const submitInitialNotifPreferences = (initialGuilds: Guild[]) => {
        setLoading(true);
        patchAllNotifSettings(userToken, initialGuilds ).then((guilds) => {
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err.message)
        });
    }

    const value = useMemo(() => ({
        guilds,
        setGuilds,
        userToken,
        setUserToken, 
        loading,
        setLoading,
        error,
        setError,
        updateNotifPreferences,
        submitInitialNotifPreferences
    }),
    [guilds, userToken, loading, error, updateNotifPreferences, submitInitialNotifPreferences])

    return <DiscordContext.Provider value={value}>{children}</DiscordContext.Provider>
}

export const useDiscord = () => {
  const context = React.useContext(DiscordContext)
  if (!context) throw Error('Must be used within ThemeProvider')
  return context
}