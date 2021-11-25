import { Box, Stack, Text } from "degen";
import React from "react";

export default function Modal ({wrapper, isOpen, children}) {

    return (
        <>{isOpen && 
            <Box position="absolute" top="0" left="0" width="viewWidth" height="viewHeight" display="flex" justifyContent="center" alignItems="center" backgroundColor="foregroundSecondary" style={{opacity: "10"}}>
                <Box ref={wrapper} width="80" height="80" backgroundColor="background" borderRadius="large" padding="6">
                <Stack>
                    { children ? children :
                        <Text> 
                            {"hey, you're not supposed to be here..."}
                            <br/>
                            {"close this, the devs f**ed up"}
                        </Text>
                    }
                </Stack>
                </Box>
            </Box>  
        }</>
    )
}