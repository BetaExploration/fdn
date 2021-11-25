import { Card, Box, Stack, Button, IconCheck, Text, IconClose } from "degen";
import React from "react";


export function NotImportant () {

    return (
        <Card padding="6"> 
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Box width="64" height="16" borderRadius="large" paddingX="4" paddingY="2" margin="2" backgroundColor="foregroundSecondary">
                    <Stack direction="horizontal" align="center" justify="space-between">
                        <Text> suppress @everyone and @here </Text>
                        <Button tone="red" variant="primary" size="small" shape="square">
                            <IconClose/>
                        </Button>
                    </Stack>
                </Box>
                <Box width="64" height="16" borderRadius="large" paddingX="4" paddingY="2" margin="2" backgroundColor="foregroundSecondary">
                    <Stack direction="horizontal" align="center" justify="space-between">
                        <Text> suppress all role @mentions </Text>
                        <Button tone="red" variant="primary" size="small" shape="square">
                            <IconClose/>
                        </Button>
                    </Stack>
                </Box>
                <Box width="64" height="16" borderRadius="large" paddingX="4" paddingY="2" margin="2" backgroundColor="foregroundSecondary">
                    <Stack direction="horizontal" align="center" justify="space-between">
                        <Text> mobile push notifications </Text>
                        <Button tone="red" variant="primary" size="small" shape="square">
                            <IconClose/>
                        </Button>
                    </Stack>
                </Box>
                <Box width="64" height="16" borderRadius="large" paddingX="4" paddingY="2" margin="2" backgroundColor="foregroundSecondary">
                    <Stack direction="horizontal" align="center" justify="space-between">
                        <Text> muted </Text>
                        <Button tone="green" variant="primary" size="small" shape="square">
                            <IconCheck/>
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Card>
    )
}