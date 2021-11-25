import { Avatar, Box, Stack, Text } from "degen";
import React from "react";
import { notifPreferences } from "../../utils/types/discord";


export default function GuildElem({ id, name, icon, notifPreference, handleNotifPreferenceChange }) {
    const cdn = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

    
    return (
        <>
            <Box display="flex" margin="4" width="20" height="24">
                <Stack space="0" align="center">
                    <Box data-tip={name} onClick={() => handleNotifPreferenceChange(id)} width="20" height="20" borderRadius="full" borderWidth="2" borderColor={JSON.stringify(notifPreference) === JSON.stringify(notifPreferences.Important) ? 'accent' : 'foregroundSecondary'} cursor="pointer" display="flex" justifyContent="center" alignItems="center">
                        <Avatar noBorder label={name} size="16" src={cdn} placeholder={icon === null}/>
                    </Box>
                    <Box width="16">
                        <Text ellipsis variant="small"> {name} </Text>
                    </Box>
                </Stack>
            </Box>
            {/* <ReactTooltip place="bottom" effect="solid"/> */}
        </>
    )
}