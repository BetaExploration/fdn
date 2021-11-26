import { Box, Stack, Text } from "degen";
import React from "react";
import ReactModal from 'react-modal'

export default function Modal ({wrapper, isOpen, children}) {

    return (
        <>
            <ReactModal isOpen={isOpen} preventScroll={true} style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0,0, 0.8)'
                },
                content: {
                    position: 'absolute',
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alighItems: 'center',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    border: 'none',
                    backgroundColor: 'transparent',
                }
            }}>
                <Box ref={wrapper} display="flex" maxWidth="1/2" backgroundColor="background" borderRadius="large" padding="12">
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
            </ReactModal>  
        </>
    )
}