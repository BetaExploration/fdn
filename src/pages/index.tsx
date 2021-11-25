import { Box, Button, IconClose, Stack, Stat, Text } from 'degen';
import Head from 'next/head';
import React from 'react';
import SetUp from '../components/screens/setup';
import { useDiscord } from '../utils/context/discord';

export default function Home() {

  const { logout } = useDiscord();

  return (
    <div>
      <Head>
        <title>FDN</title>
      </Head>

      <Box backgroundColor="background" minHeight="viewHeight" maxWidth="viewWidth" paddingX="32" >
          <Box display="flex" height="40" padding="8" justifyContent="flex-end" alignItems="center">
            <Stack>
              <Button onClick={() => {logout()}} variant="secondary" size="small" suffix={<IconClose/>}> stop using my token... </Button>
            </Stack>
          </Box>
          <Stack space='24'>
            <Stack>
              <Text size="headingOne" weight="bold" color="foreground"> Hey! </Text>
              <Text size="extraLarge"> so... f**k discord notifications... right?</Text>
            </Stack>
            <Stack space="8">
              <Text size="extraLarge" weight="medium" color="foreground"> {"let's fix that real quick:"} </Text>

              <SetUp />

            </Stack>
          </Stack>
      </Box>

    </div>
  )
}
