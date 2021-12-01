import { Box, Button, IconClose, IconSearch, Stack, Text } from 'degen';
import Head from 'next/head';
import React, { useRef } from 'react';
import Dashboard from '../components/screens/dashboard';
import SetUp from '../components/screens/setup';
import { useDiscord } from '../utils/context/discord';
import useModal from '../utils/hooks/useModal';

export default function Home() {

  const { logout, userToken, cachedGuilds } = useDiscord();
  return (
    <div>
      <Head>
        <title>FDN</title>
      </Head>

      <Box backgroundColor="background" minHeight="viewHeight" maxWidth="viewWidth" paddingX={{xs: '6', md: "32"}} paddingBottom="24">
          <Box display="flex" height={{xs: '20', md: '40'}} padding={{xs: '0', md: '8'}} justifyContent="flex-end" alignItems="center">
            { userToken && <Stack>
              <Button onClick={() => {logout()}} variant="secondary" size="small" suffix={<IconClose/>}> stop using my token... </Button>
            </Stack>}
          </Box>
          <Stack space={{xs: '12', md: '24'}}>
            <Stack>
              <Text size="headingOne" weight="bold" color="foreground"> Hey! </Text>
              <Text size="extraLarge"> so... f**k discord notifications... right?</Text>
            </Stack>
            <Stack space={{xs: '4', md: '8'}}>
              <Stack direction="horizontal" align="center">
                <Text size="extraLarge" weight="medium" color="foreground"> {"let's fix that real quick:"} </Text>
              </Stack>
              
              { !cachedGuilds ?
                <SetUp/>
              :
                <Dashboard/>
              }

            </Stack>
          </Stack>
      </Box>
    </div>
  )
}

