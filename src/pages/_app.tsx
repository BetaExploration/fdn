import { ThemeProvider } from 'degen'
import 'degen/styles'
import 'tailwindcss/tailwind.css'
import { DiscordProvider } from '../utils/context/discord'

function MyApp({ Component, pageProps }) {
  return (
      <DiscordProvider>
        <ThemeProvider defaultMode={'dark'} defaultAccent="indigo">
          <Component {...pageProps} />
        </ThemeProvider>
      </DiscordProvider>
  )
}

export default MyApp
