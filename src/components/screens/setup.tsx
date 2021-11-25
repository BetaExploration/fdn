import { Box, Button, IconSearch, Input, Skeleton, Stack, Text } from "degen";
import React, { useEffect, useRef } from "react";
import { useDiscord } from "../../utils/context/discord";
import useModal from "../../utils/hooks/useModal";
import GuildElem from "../base/guildElem";


export default function SetUp() {
    const input = useRef<HTMLInputElement>(null);
    const modal = useRef(null);
    const { modalOpen, setModalOpen } = useModal(modal, false);

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
        <>
            <Box>
                { !userToken ?
                    <Stack direction="horizontal" align="flex-end">
                        <Input ref={input} placeholder="don't worry... we won't steal it :)" label={
                            <Stack align="center" direction="horizontal">
                                <Text size="base" weight="medium"> {"your very secret internal access token please..."} </Text>
                                <Button onClick={() => setModalOpen(true)} size="small" shape="circle" variant="transparent"><IconSearch/></Button>
                            </Stack>
                        }/>
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
            
            <Modal wrapper={modal} isOpen={modalOpen} />

        </>
    )
}

export const Modal = ({wrapper, isOpen}) => {

    return (
        <>{isOpen && 
            <Box position="absolute" top="0" left="0" width="viewWidth" height="viewHeight" display="flex" justifyContent="center" alignItems="center" backgroundColor="foregroundSecondary" style={{opacity: "10"}}>
                <Box ref={wrapper} width="80" height="80" backgroundColor="background" borderRadius="large" padding="6">
                <Stack>
                    <Text> 
                        {"hey, you're not supposed to be here..."}
                        <br/>
                        {"this is where you find out how to get your access token"}
                    </Text>
                </Stack>
                </Box>
            </Box>  
        }</>
    )
}