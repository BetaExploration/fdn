import { Avatar, Box, Button, IconExclamation, IconSearch, Input, Skeleton, Stack, Text } from "degen";
import React, { useEffect, useRef } from "react";
import { useDiscord } from "../../utils/context/discord";
import useModal from "../../utils/hooks/useModal";
import GuildElem from "../base/guildElem";
import Error from "../base/error";
import InputUserToken from "../base/inputUserToken";
import Modal from "../base/modal";
import Image from 'next/image'
import important from '../../../public/assets/preferences/important.png'
import notImportant from '../../../public/assets/preferences/notImportant.png'

export default function SetUp() {

    const modal = useRef(null);
    const { modalOpen, setModalOpen } = useModal(modal, false);

    const {guilds, userToken, loading, error, updated, updateNotifPreferences, saveNotifPreferences, loadGuilds } = useDiscord();

    useEffect(() => {
        if (userToken && !guilds && !error) {
            loadGuilds();
        }
    }, [userToken, guilds, error, loadGuilds]);

    if (error && !loading && !guilds) {
        window.scrollTo(0, 0)
        return <Error/>
    }
    
    return (
        <>
            <Box>
                { !userToken ?
                    <InputUserToken/>
                : 
                    <Stack space="6">

                        <Stack direction="horizontal" align="center">
                            <Stack space="0">
                                <Text> {"click on the server's that matter to you!"}</Text>
                                <Text> {"we'll completely mute the rest..."}</Text>
                            </Stack>
                            <Stack>
                                <Button onClick={() => setModalOpen(true)} size="small" shape="circle" variant="primary"><IconExclamation/></Button>
                            </Stack>
                        </Stack>

                        <Skeleton loading={!guilds}>
                            <Box width="full" flexWrap="wrap" display="flex" marginBottom="6">
                                {guilds && guilds.map((guild) => (<GuildElem key={guild.guild.id} {...guild.guild} notifPreference={guild.notifPreferences} handleNotifPreferenceChange={() => updateNotifPreferences(guild.guild.id)}/>))}
                            </Box>
                        </Skeleton>

                        <Box position={{xs: 'fixed', md: 'relative'}} bottom={{xs: '5'}} right={{xs: '5'}}>
                            <Stack align={{xs: 'flex-end', md:'flex-start'}}>
                                <Button disabled={!guilds || !updated} loading={loading} onClick={() => (saveNotifPreferences())}> save </Button>
                            </Stack>
                        </Box>

                    </Stack>
                }
            </Box>

            <Modal wrapper={modal} isOpen={modalOpen}>

                <Stack direction={{ xs: 'vertical', md: 'horizontal'}}>

                    <Stack align="center">
                        <Stack space="0" align="center">
                            <Box width="12" height="12" borderRadius="full" backgroundColor="accent" cursor="pointer" display="flex" justifyContent="center" alignItems="center">
                            </Box>
                            <Text ellipsis variant="large"> important </Text>
                        </Stack>
                        {important && <Image src={important} alt="" />}
                    </Stack>

                    <Stack align="center">
                        <Stack space="0" align="center">
                            <Box width="12" height="12" borderRadius="full" backgroundColor="foregroundSecondary" cursor="pointer" display="flex" justifyContent="center" alignItems="center">
                            </Box>
                            <Text ellipsis variant="large"> muted </Text>
                        </Stack>
                       {notImportant && <Image src={notImportant} alt="" />}
                    </Stack>

                </Stack>

            </Modal>
        </>
    )
}