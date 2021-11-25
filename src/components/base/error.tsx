import { Box, Text } from "degen";
import React from "react";
import { useDiscord } from "../../utils/context/discord";

export default function Error() {
    
    const { error } = useDiscord();
    return (
        <Box>
            <Text color="red">
                hey, there is an error.
                <br/> 
                you probably {"didn't"} input the right token...
                <br/>
                and we are not really good at fixing erros, so...
                <br/>
                just go ahead and spam the <Text color="red" weight="bold" size="large" as="span"> {"'STOP USING MY TOKEN'"} </Text> button or refresh the page
                <br/>
                we would appreciate it, thanks
                </Text>
        </Box>
    )
}