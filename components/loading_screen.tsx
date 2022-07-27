import { Box, Container } from '@chakra-ui/react'
import LoadingSpin from 'react-loading-spin'

const LoadingScreen = () => {
    return(
        <Box bg='gray.50' width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
                    <LoadingSpin  />
        </Box>
    )
}

export default LoadingScreen    
