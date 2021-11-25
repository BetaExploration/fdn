import { Avatar, Box } from "degen";
import React from "react";
import { notifPreferences } from "../../utils/types/discord";


export default function GuildElem({ id, name, icon, notifPreference, handleNotifPreferenceChange }) {
    const cdn = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

    
    return (
        <Box onClick={() => handleNotifPreferenceChange(id)} width="14" height="14" borderRadius="full" borderWidth="1" borderColor={notifPreference === notifPreferences.Important ? 'accent' : 'foregroundSecondary'} cursor="pointer" display="flex" justifyContent="center" alignItems="center">
            <Avatar noBorder label={name} size="12" src={cdn} placeholder={icon === null}/>
        </Box>
    )
}