import { Box, Button, IconExclamation, Input, Stack, Text } from "degen";
import React, { useRef } from "react";
import { useDiscord } from "../../utils/context/discord";
import useModal from "../../utils/hooks/useModal";
import Modal from "./modal";

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
            <Modal wrapper={modal} isOpen={modalOpen}> 
                {/* Instructions to get Token */}
            </Modal>
        </>
    )
}

