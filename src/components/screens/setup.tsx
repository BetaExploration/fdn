import { Box, Button, Input, Skeleton, Stack, Text } from "degen";
import React, { useEffect, useRef } from "react";
import { useDiscord } from "../../utils/context/discord";
import GuildElem from "../base/guildElem";


export default function SetUp() {
    const input = useRef<HTMLInputElement>(null);

    const {guilds, setGuilds, userToken, setUserToken, loading, setLoading, error, setError, updated, updateNotifPreferences, saveNotifPreferences, loadGuilds } = useDiscord();

    useEffect(() => {
        if (userToken && !guilds && !error) {
            loadGuilds();
        }
    }, [userToken, guilds, setGuilds, setLoading, setError, loading, loadGuilds, error])

    if (error && !loading) {
        return (
            <Box>
                <Text color="red">
                    hey, there is an error
                    <br/> 
                    and we are not really good at fixing erros, so...
                    <br/>
                    just go ahead and spam the {"'stop using my token'"} button or refresh the page
                    <br/>
                    we would appreciate it, thanks
                    </Text>
            </Box>
        )
    }
    
    return (
        <Box>
            { !userToken ?
                <Stack direction="horizontal" align="flex-end">
                    <Input ref={input} placeholder="don't worry... we won't steal it :)" label="your very important internal access token... please?"/>
                    <Button onClick={() => setUserToken(input.current.value)}> lez,go </Button>
                </Stack>
            : 
                <Stack space="14">
                    <Stack space="0">
                        <Text> {"click on the server's that matter to you!"}</Text>
                        <Text> {"we'll completely mute the rest..."}</Text>
                    </Stack>
                    <Skeleton loading={!guilds}>
                            <Stack direction="horizontal">
                                {guilds && guilds.map((guild) => (<GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={() => updateNotifPreferences(guild.guild.id)}/>))}
                            </Stack>
                    </Skeleton>
                    <Stack>
                        {updated && <Text> {"when you're ready... click save."}</Text> }
                        <Button disabled={!guilds || !updated} loading={loading} onClick={() => (saveNotifPreferences())}> {updated ? 'save?' : 'nothing to change'} </Button>
                    </Stack>
                </Stack>
            }
        </Box>
    )
}