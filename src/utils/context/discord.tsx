/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useMemo, useState } from "react"
import { getRawGuilds } from "../api/guilds"
import { loadNotifSettings, patchAllNotifSettings } from "../api/notifications"
import { Guild, notifPreferences } from "../types/discord"


type DiscordContextValue = {
    /** List of guilds a user is a part of */
    guilds: Guild[];
    setGuilds(guilds: Guild[]): void;
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
    const [userToken, setUserToken] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>(undefined)
    const [updated, setUpdated] = useState<boolean>(false)

    const updateNotifPreferences = (guildId: string) => {
        setGuilds(guilds.map(guild => {
            if (guild.guild.id === guildId) {
                guild.notifPreferences = (guild.notifPreferences === notifPreferences.Important) ? notifPreferences.NotImportant : notifPreferences.Important;
                setUpdated(true)
            }
            return guild
        }))
    }

    const saveNotifPreferences = () => {
        setLoading(true);
        patchAllNotifSettings(userToken, guilds).then(() => {
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
        getRawGuilds(userToken).then((guilds) => {
            loadNotifSettings(userToken, guilds).then(g => {
                setGuilds(g);
                setLoading(false);
                setUpdated(true);
                setError(undefined);
            })
        }).catch(err => {
            (err.message !== 'Request failed with status code 429') && setError(err.message)
            console.log(err.message)
            setLoading(false)
        })
    }

    const logout = () => {
        setUserToken(undefined)
        localStorage.removeItem("userToken")
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

    const value = useMemo(() => ({
        guilds,
        setGuilds,
        userToken,
        setUserToken, 
        logout,
        loading,
        setLoading,
        error,
        setError,
        updated,
        updateNotifPreferences,
        saveNotifPreferences,
        loadGuilds
    }),
    [guilds, userToken, logout, loading, error, updated, updateNotifPreferences, saveNotifPreferences, loadGuilds])

    return <DiscordContext.Provider value={value}>{children}</DiscordContext.Provider>
}

export const useDiscord = () => {
  const context = React.useContext(DiscordContext)
  if (!context) throw Error('Must be used within DiscordProvider')
  return context
}