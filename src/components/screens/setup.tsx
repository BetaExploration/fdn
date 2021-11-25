import { Box, Button, IconExclamation, IconSearch, Input, Skeleton, Stack, Text } from "degen";
import React, { useEffect, useRef } from "react";
import { useDiscord } from "../../utils/context/discord";
import useModal from "../../utils/hooks/useModal";
import GuildElem from "../base/guildElem";
import Error from "../base/error";
import InputUserToken from "../base/inputUserToken";


export default function SetUp() {

    const {guilds, setGuilds, userToken, setUserToken, loading, setLoading, error, setError, updated, updateNotifPreferences, saveNotifPreferences, loadGuilds } = useDiscord();

    useEffect(() => {
        if (userToken && !guilds && !error) {
            loadGuilds();
        }
    }, [userToken, guilds, setGuilds, setLoading, setError, loading, loadGuilds, error])

    if (error && !loading && !guilds) {
        return <Error/>
    }
    
    return (
        <>
            <Box>
                { !userToken ?
                    <InputUserToken/>
                : 
                    <Stack space="6">
                        <Stack space="0">
                            <Text> {"click on the server's that matter to you!"}</Text>
                            <Text> {"we'll completely mute the rest..."}</Text>
                        </Stack>
                        <Skeleton loading={!guilds}>
                            <Box width="full" flexWrap="wrap" display="flex" marginBottom="6">
                                {guilds && guilds.map((guild) => (<GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={() => updateNotifPreferences(guild.guild.id)}/>))}
                            </Box>
                        </Skeleton>
                        <Stack>
                            {updated && <Text> {"when you're ready... click save."}</Text> }
                            <Button disabled={!guilds || !updated} loading={loading} onClick={() => (saveNotifPreferences())}> {updated ? 'save?' : 'nothing to change'} </Button>
                        </Stack>
                    </Stack>
                }
            </Box>
        </>
    )
}