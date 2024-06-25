import './ButtonPile.css';
import {
    useDisclosure, Tooltip, IconButton, Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box
} from '@chakra-ui/react'
import {QuestionOutlineIcon, HamburgerIcon } from '@chakra-ui/icons'
import { React, useRef } from 'react';

const helperText = 
<>
  <b>What?</b> Flip It Or Rip It is played by opening a pack of trading cards, placing them face down, alternating between Flipping a card face up (where you keep the card) and Ripping a card, so that it is destroyed forever.<br /><br />
  <b>Why?</b> Someone thought that the rush of opening packs wasn't enough, so they adding in the potential of "losing money".<br /><br />
  <b>How?</b> Pick some options from the drop down menus, generate the booster pack, and start clicking! The first card we will FLIP.
</>;


function ButtonPile(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <div>
            <Box>
                <IconButton onClick={onOpen} icon={<HamburgerIcon />}></IconButton>
                <Tooltip label={helperText} aria-label='A tooltip'>
                    <QuestionOutlineIcon marginLeft="0.5em" padding="2px" h="1.5em" w="1.5em" />
                </Tooltip>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    {/* <DrawerHeader>Create your account</DrawerHeader> */}

                    <DrawerBody>
                        wow! think of all the potential that could go here. 
                    </DrawerBody>

                    <DrawerFooter>
                        <Button key="hard" isDisabled={props.hardMode} onClick={props.setHardMode} bgColor="red">Hard Mode</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div >
    );
}


export default ButtonPile;