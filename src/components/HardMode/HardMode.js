import './HardMode.css';
import { Box, Text, ScaleFade, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

function HardMode(props) {

    return (
      <ScaleFade initialScale={0.9} in={props.isOpen}>
        <LinkBox className="HardModeButton"  maxW='lg' borderWidth='1px' rounded='md'>
          <Heading size='md' my='2'>
            <LinkOverlay target="_blank" href='https://ko-fi.com/Y8Y0ZKQZ1'>
                Want to REALLY feel the pain of losing {centsToDollars(props.lostValue)}? Click this box.
            </LinkOverlay>
          </Heading>
        </LinkBox>
      </ScaleFade>
    );
}


export default HardMode;