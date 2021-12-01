/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useMemo, useState } from "react"
import { getRawGuilds } from "../api/guilds"
import { patchAllNotifSettings } from "../api/notifications"
import { toggleNotifPreference } from "../tools"
import { Guild, notifPreferences } from "../types/discord"


type DiscordContextValue = {
    /** List of guilds a user is a part of */
    guilds: Guild[];
    setGuilds(guilds: Guild[]): void;
    /** List of guilds cached, will always match the notif. settings on discord */
    cachedGuilds: Guild[];
    setCachedGuilds(guilds: Guild[]): void;
    /** User's internal access Token */
    userToken: string;
    setUserToken(token: string): void;
    logout(): void;
    /** loading */
    loading: boolean;
    setLoading(loading: boolean): void;
    /** error */
    error: string;
    setError(error: string): void;
    /** local object has been updated */
    updated: boolean;
    setUpdated(updated: boolean): void;
    /** method to update a guilds notif prefences locally */
    updateNotifPreferences(guildId: string): void;
    /** method to batch update all servers */
    saveNotifPreferences(): void;
    /** method to load guild list */
    loadGuilds(): void;
}

const DiscordContext = createContext<DiscordContextValue | null>(null)

export const DiscordProvider = ({children}) => {
    const [guilds, setGuilds] = useState<Guild[]>(undefined)
    const [cachedGuilds, setCachedGuilds] = useState<Guild[]>(undefined)
    const [userToken, setUserToken] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>(undefined)
    const [updated, setUpdated] = useState<boolean>(false)

    const updateNotifPreferences = (guildId: string) => {
        setGuilds(guilds.map(guild => {
            if (guild.guild.id === guildId) {
                guild.notifPreferences = toggleNotifPreference(guild.notifPreferences);
                setUpdated(true)
            }
            return guild
        }))
    }

    const saveNotifPreferences = () => {
        const cachedGuilds = (JSON.parse(localStorage.getItem('cachedGuilds')) || []).sort((a, b) => a.guild.id - b.guild.id);
        const guildsToUpdate = cachedGuilds.length > 0 ?
            guilds.sort((a: any, b: any) => a.guild.id - b.guild.id).filter((guild, index) => {
                return JSON.stringify(guild.notifPreferences) !== JSON.stringify(cachedGuilds[index].notifPreferences);
            })
            :
            guilds

        setLoading(true);
        patchAllNotifSettings(userToken, guildsToUpdate).then(() => {
            setCachedGuilds(guilds.sort((a: any, b: any) => a.guild.name.localeCompare(b.guild.name)))
            setLoading(false);
            setUpdated(false);
            setError(undefined);
        }).catch(err => {
            setLoading(false);
            console.log(err)
            setError(err.message)
        });
    }

    const loadGuilds = () => {
        setLoading(true);
        if (!guilds && cachedGuilds) {
            setGuilds(cachedGuilds);
            setLoading(false);
            setUpdated(false);
        } else {
            getRawGuilds(userToken).then((guilds) => {
                setGuilds(guilds.map(guild => ({
                    guild,
                    notifPreferences: notifPreferences.NotImportant
                })).sort((a: any, b: any) => a.guild.name.localeCompare(b.guild.name)));
                setLoading(false);
                setError(undefined);
                setUpdated(true);
            }).catch(err => {
                (err.message !== 'Request failed with status code 429') && setError(err.message)
                console.log(err.message)
                setLoading(false)
            })
        }
    }

    const logout = () => {
        setUserToken(undefined)
        localStorage.removeItem("userToken")
        localStorage.removeItem("cachedGuilds")
        setGuilds(undefined)
        setCachedGuilds(undefined)
        setError(undefined);
        setLoading(false);
    }

    useEffect(() => {
        if (!userToken) {
            try {
                setUserToken(localStorage.getItem('userToken'));
                
            } catch {
                setUserToken(undefined);
            }
        }
        if (userToken && localStorage.getItem('userToken') === null) {
            localStorage.setItem('userToken', userToken);
        }
    }, [userToken])

    useEffect(() => {
        if (cachedGuilds) {
            localStorage.setItem('cachedGuilds', JSON.stringify(cachedGuilds))
        } else if (!cachedGuilds && JSON.parse(localStorage.getItem('cachedGuilds'))) {
            setCachedGuilds(JSON.parse(localStorage.getItem('cachedGuilds')))
        }
    }, [cachedGuilds, guilds])

    const value = useMemo(() => ({
        guilds,
        setGuilds,
        cachedGuilds,
        setCachedGuilds,
        userToken,
        setUserToken, 
        logout,
        loading,
        setLoading,
        error,
        setError,
        updated,
        setUpdated,
        updateNotifPreferences,
        saveNotifPreferences,
        loadGuilds
    }),
    [guilds, userToken, logout, loading, error, updated, setUpdated, updateNotifPreferences, saveNotifPreferences, loadGuilds])

    return <DiscordContext.Provider value={value}>{children}</DiscordContext.Provider>
}

export const useDiscord = () => {
  const context = React.useContext(DiscordContext)
  if (!context) throw Error('Must be used within DiscordProvider')
  return context
}