import { Box, Input, Stack, Text, useTheme } from 'degen';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Dashboard from '../components/screens/dashboard';
import SetUp from '../components/screens/setup';
import { useDiscord } from '../utils/context/discord';

export default function Home() {

  const { guilds, userToken, setGuilds, setUserToken } = useDiscord();

  return (
    <div>
      <Head>
        <title>FDN</title>
      </Head>

      <Box backgroundColor="background" minHeight="viewHeight" maxWidth="viewWidth" paddingTop="32" paddingX="32" >
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
