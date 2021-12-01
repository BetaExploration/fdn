import { Box, Button, Stack, Text } from 'degen';
import React, { useEffect, useState } from "react";
import { useDiscord } from '../../utils/context/discord';
import { compareNotifPreferences, toggleNotifPreference } from '../../utils/tools';
import { notifPreferences } from '../../utils/types/discord';
import Error from '../base/error';
import GuildElem from '../base/guildElem';
import { Important, NotImportant } from '../base/notifPrefInfo';



export default function Dashboard() {

    const { guilds, setGuilds, userToken, cachedGuilds, error, loading, loadGuilds, updated, setUpdated, saveNotifPreferences } = useDiscord();
    const [ important, setImportant] = useState(undefined);
    const [ notImportant, setNotImportant] = useState(undefined);
    
    useEffect(() => {
        if (userToken && !guilds && !error) {
            loadGuilds();
        }
        if ((guilds && !important && !notImportant) ) { 
            setImportant(guilds.filter(guild => compareNotifPreferences(guild.notifPreferences, notifPreferences.Important)).sort((a: any, b: any) => a.guild.name.localeCompare(b.guild.name)))
            setNotImportant(guilds.filter(guild => compareNotifPreferences(guild.notifPreferences, notifPreferences.NotImportant)).sort((a: any, b: any) => a.guild.name.localeCompare(b.guild.name)))
        }
    }, [userToken, guilds, error, loadGuilds, important, notImportant, cachedGuilds, updated]);

    if (error && !loading && !guilds) {
        window.scrollTo(0, 0)
        return <Error/>
    }

    const updateImportant = (guildId: string) => {
        setImportant(important.map(guild => {
            if (guild.guild.id === guildId) {
                guild.notifPreferences = toggleNotifPreference(guild.notifPreferences);
                setUpdated(true)
            }
            return guild
        }))
    }

    const updateNotImportant = (guildId: string) => {
        setNotImportant(notImportant.map(guild => {
            if (guild.guild.id === guildId) {
                guild.notifPreferences = toggleNotifPreference(guild.notifPreferences);
                setUpdated(true)
            }
            return guild
        }))
    }

    const confirmChanges = () => {
        setGuilds(important.concat(notImportant));
        setImportant(undefined);
        setNotImportant(undefined);
        saveNotifPreferences();
    }

    return (
        <>
            {important && notImportant &&
                <Stack space="12">
                    <Stack direction={{xs: 'vertical', md: 'horizontal'}}>
                        <Box width="full">
                            <Important />
                            <Stack direction="horizontal" wrap>
                                {important.map(guild => {
                                    return (
                                        <GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={() => updateImportant(guild.guild.id)}/>
                                    )
                                })}
                            </Stack>
                        </Box>
                        <Box width="full">
                            <NotImportant />
                            <Stack direction="horizontal" wrap>
                                {notImportant.map(guild => {
                                    return (
                                        <GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={() => updateNotImportant(guild.guild.id)}/>
                                    )
                                })}
                            </Stack>
                        </Box>
                    </Stack>
                    <Box position={{xs: 'fixed', md: 'relative'}} bottom={{xs: '5'}} right={{xs: '5'}}>
                        <Stack align={{xs: 'flex-end', md:'flex-start'}}>
                            <Button disabled={!guilds || !updated} loading={loading} onClick={() => confirmChanges()}> save </Button>
                        </Stack>
                    </Box>
                </Stack>
            }
        </>
    )
}