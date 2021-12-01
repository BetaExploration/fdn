import { Card, Box, Stack, Button, IconCheck, Text, IconClose, useTheme, IconChevronDown, IconChevronUp } from "degen";
import React, { useState } from "react";


export function Important () {

    const { mode } = useTheme();
    const [show, setShow] = useState(false);

    return (
        <Box onClick={() => setShow(!show)} height={{xs: show ? 'auto' : '16'}} transitionProperty="all" transitionDuration="1000" maxWidth="max" marginTop="6" padding="2" borderRadius="2xLarge" backgroundColor={mode === 'dark' ? 'black': 'white'} cursor="pointer"> 
                <Box display="flex" width="full" justifyContent="space-between" alignItems="center" paddingX="4" paddingY="1">
                    <Text size="large"> important servers </Text>
                    <Button variant="secondary" size="small" shape="square">
                        {show ? <IconChevronDown /> : <IconChevronUp />}
                    </Button>
                </Box>
                <Box width="full" display="flex" visibility={show ? "visible" : "hidden"} flexWrap="wrap" alignItems="center" >
                    <SettingBadge text="muted" active={false}/>
                    <SettingBadge text="suppress @everyone and @here" active={false}/>
                    <SettingBadge text="suppress all role @mentions" active={false}/>
                    <SettingBadge text="mobile push notifications" active/>
                </Box>
        </Box>
    )
}

export function NotImportant () {
    const { mode } = useTheme();  
    const [show, setShow] = useState(false);  
    
    return (
        <Box height={{xs: show ? 'auto' : '16'}} transitionProperty="all" transitionDuration="1000" maxWidth="max" padding="2" marginTop="6" borderRadius="2xLarge" backgroundColor={mode === 'dark' ? 'black': 'white'} cursor="pointer"> 
                <Box onClick={() => setShow(!show)}  display="flex" width="full" justifyContent="space-between" alignItems="center" paddingX="4" paddingY="1">
                    <Text size="large"> non-important servers </Text>
                    <Button variant="secondary" size="small" shape="square">
                        {show ? <IconChevronDown /> : <IconChevronUp />}
                    </Button>
                </Box>
                <Box width="full" display="flex" visibility={show ? "visible" : "hidden"} flexWrap="wrap" alignItems="center">
                    <SettingBadge text="muted" active/>
                    <SettingBadge text="suppress @everyone and @here" active/>
                    <SettingBadge text="suppress all role @mentions" active/>
                    <SettingBadge text="mobile push notifications" active={false}/>
                </Box>
        </Box>
    )
}

const SettingBadge = ({text, active}) => {

    return (
        <Box width={{xs: "full", md: "44"}} display="flex" alignItems="center" justifyContent="space-between" height="20" borderRadius="large" paddingX="4" paddingY="2" margin="2" backgroundColor="foregroundSecondary">
            <Text size="label"> {text} </Text>
            <Button tone={active ? "green" : "red"} variant="primary" size="small" shape="square">
                {active ? <IconCheck/> : <IconClose/>}
            </Button>
        </Box>
    )
}