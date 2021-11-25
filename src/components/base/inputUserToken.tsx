import { Box, Button, IconExclamation, Input, Stack, Text } from "degen";
import React, { useRef } from "react";
import { useDiscord } from "../../utils/context/discord";
import useModal from "../../utils/hooks/useModal";

export default function InputUserToken() {
    const input = useRef<HTMLInputElement>(null);
    const modal = useRef(null);
    const { modalOpen, setModalOpen } = useModal(modal, false);

    const { setUserToken } = useDiscord();
    
    return (
        <>
            <Stack direction="horizontal" align="flex-end">
                <Input ref={input} placeholder="don't worry... we won't steal it :)" label={
                    <Stack align="center" direction="horizontal">
                        <Text size="base" weight="medium"> {"your very secret internal access token please..."} </Text>
                        <Button onClick={() => setModalOpen(true)} size="small" shape="circle" variant="transparent"><IconExclamation/></Button>
                    </Stack>
                }/>
                <Button onClick={() => setUserToken(input.current.value)}> lez,go </Button>
            </Stack>   
            <Modal wrapper={modal} isOpen={modalOpen} /> 
        </>
    )
}

const Modal = ({wrapper, isOpen}) => {

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