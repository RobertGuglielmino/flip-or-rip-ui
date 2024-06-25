import { extendTheme } from '@chakra-ui/react'

// Add your color mode config
const theme = {
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    }
}

export default extendTheme(theme);