import { Card, Box, Stack, Button, IconCheck, Text, IconClose, useTheme } from "degen";
import React from "react";


export function Important () {

    const { mode } = useTheme();

    return (
        <Box display="flex" flexWrap="wrap" alignItems="center" marginTop="6" padding="2" boxShadow="0" borderRadius="2xLarge" backgroundColor={mode === 'dark' ? 'black': 'white'}> 
                <SettingBadge text="muted" active={false}/>
                <SettingBadge text="suppress @everyone and @here" active={false}/>
                <SettingBadge text="suppress all role @mentions" active={false}/>
                <SettingBadge text="mobile push notifications" active/>
        </Box>
    )
}

export function NotImportant () {
    const { mode } = useTheme();    
    
    return (
        <Box display="flex" flexWrap="wrap" alignItems="center" padding="2" marginTop="6" boxShadow="0" borderRadius="2xLarge" backgroundColor={mode === 'dark' ? 'black': 'white'}> 
                <SettingBadge text="suppress @everyone and @here" active/>
                <SettingBadge text="suppress all role @mentions" active/>
                <SettingBadge text="mobile push notifications" active={false}/>
                <SettingBadge text="muted" active/>
        </Box>
    )
}

const SettingBadge = ({text, active}) => {

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" width="44" height="20" borderRadius="large" paddingX="4" paddingY="2" margin="2" backgroundColor="foregroundSecondary">
            <Text size="label"> {text} </Text>
            <Button tone={active ? "green" : "red"} variant="primary" size="small" shape="square">
                {active ? <IconCheck/> : <IconClose/>}
            </Button>
        </Box>
    )
}