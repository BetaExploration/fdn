import { Box, Button, Card, IconCheck, Stack, Tag, Text } from 'degen';
import React from "react";
import { useDiscord } from '../../utils/context/discord';
import { notifPreferences } from '../../utils/types/discord';
import GuildElem from '../base/guildElem';
import { Important } from '../base/important';


export default function Dashboard() {

    const { guilds, setGuilds, updateNotifPreferences } = useDiscord();

    return (
        <>
            {guilds && 
                <Stack space="12">
                    <Stack>
                        <Text size="large"> important servers </Text>
                        <Important/>
                        <Stack direction="horizontal">
                            {guilds.map(guild => {
                                if (guild.notifPreferences === notifPreferences.Important) {
                                    console.log(guild);
                                    return (
                                        <GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={() => updateNotifPreferences(guild.guild.id)}/>
                                    )
                                }
                            })}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Text size="large"> non-important servers </Text>
                        <Important/>
                        <Stack direction="horizontal">
                            {guilds.map(guild => {
                                console.log(guild.notifPreferences === notifPreferences.NotImportant)
                                if (guild.notifPreferences === notifPreferences.NotImportant) {
                                    console.log(guild);
                                    return (
                                        <GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={() => updateNotifPreferences(guild.guild.id)}/>
                                    )
                                }
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            }
        </>
    )
}