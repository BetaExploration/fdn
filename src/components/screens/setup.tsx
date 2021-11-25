import { Box, Button, Input, Skeleton, Stack, Text } from "degen";
import React, { useEffect, useRef, useState } from "react";
import { getRawGuilds } from "../../utils/api/guilds";
import { useDiscord } from "../../utils/context/discord";
import { Guild, notifPreferences, rawGuild } from "../../utils/types/discord";
import GuildElem from "../base/guildElem";


export default function SetUp() {
    const input = useRef<HTMLInputElement>(null);

    const {userToken, setUserToken, loading, setLoading, error, setError, submitInitialNotifPreferences } = useDiscord();
    const [ initialGuilds, setInitialGuilds ] = useState<Guild[]>(undefined);

    useEffect(() => {
        if (userToken) {
            setLoading(true)
            getRawGuilds(userToken).then((guilds) => {
                setInitialGuilds(guilds.map(guild => ({
                    guild,
                    notifPreferences: notifPreferences.NotImportant
                })));
                console.log(guilds)
                setLoading(false)
                console.log(loading)
            }).catch(err => {
                setError(err.message)
                setLoading(false)
            })
        }
    }, [loading, setError, setLoading, userToken])

    const setImportant = (guild_id: string) => {
        setInitialGuilds(initialGuilds.map(guild => {
            if (guild.guild.id === guild_id) {
                (guild.notifPreferences === notifPreferences.Important) ? guild.notifPreferences = notifPreferences.NotImportant : guild.notifPreferences = notifPreferences.Important;
            }
            return guild
        }))
    }
    
    return (
        <Box>
            { !initialGuilds ? 
                <Stack direction="horizontal" align="flex-end">
                    <Input ref={input} label="your very important internal access token... please?"/>
                    <Button onClick={() => setUserToken(input.current.value)}> lez,go </Button>
                </Stack>
            :
                <Stack space="12">
                    <Stack space="0">
                        <Text> {"click on the server's that matter to you!"}</Text>
                        <Text> {"when you're ready... click ready."}</Text>
                    </Stack>
                    <Skeleton loading={loading}>
                        <Stack direction="horizontal">
                            {initialGuilds.map((guild) => (<GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={setImportant}/>))}
                        </Stack>
                    </Skeleton>
                    <Button loading={loading} onClick={() => submitInitialNotifPreferences(initialGuilds)}> Ready? </Button>
                </Stack>
            }
        </Box>
    )
}