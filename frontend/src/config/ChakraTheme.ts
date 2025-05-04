import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  styles: {
    global: {
      body: {
        h1: {
          fontSize: '5xl',
          fontWeight: 'bold',
        },
        h2: {
          fontSize: '4xl',
          fontWeight: 'bold',
        },
        h3: {
          fontSize: '3xl',
          fontWeight: 'bold',
        },
        h4: {
          fontSize: '2xl',
          fontWeight: 'bold',
        },
        h5: {
          fontSize: '1xl',
          fontWeight: 'bold',
        },
        h6: {
          fontSize: '0.875xl',
          fontWeight: 'bold',
        },
      },
    },
  },
})
