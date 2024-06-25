import './HelperHeader.css';
import {
    Flex, Box, Center, Text,
} from '@chakra-ui/react'
import ButtonPile from './ButtonPile/ButtonPile.js';

function HelperHeader(props) {

    return (
        <Flex width="100vw" height="7vh" justifyContent="center" alignItems="center" position="relative">
            <Box position="absolute" top="0" left="0" m={4}>
                <ButtonPile hardMode={props.hardMode} setHardMode={props.setHardMode} />
            </Box>
            <Box p={4} borderRadius="md" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                <Center>
                    <Text fontSize="3xl">{props.status }</Text>
                </Center>
            </Box>
        </Flex>
    )
}

export default HelperHeader;