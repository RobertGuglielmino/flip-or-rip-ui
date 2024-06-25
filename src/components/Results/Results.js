import './Results.css';
import { LinkBox, LinkOverlay, Heading, ScaleFade, Text } from '@chakra-ui/react';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

function Results(props) {

    const sizeScaling = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]

    function lostValueSize(amount) {
        let index = Math.floor(Math.log(amount)) >= sizeScaling.length ? sizeScaling.length - 1 : Math.floor(Math.log(amount));
        return sizeScaling[index]
    }


    return (
        <div className="Results">
            <ScaleFade initialScale={0.9} in={props.isOpen}>
                <LinkBox className="lost-money-results" paddingTop="0px" >
                    <Text>u lost this much money 😔 :</Text>
                    <Text as={props.lostValue > 20000 ? 'b' : ''} fontSize={lostValueSize(props.lostValue)}>{centsToDollars(props.lostValue)}</Text>
                    {/* <a href='https://ko-fi.com/Y8Y0ZKQZ1' target='_blank'><img height='36' className='kofi' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> */}
                </LinkBox>
            </ScaleFade>
            {
                props.hardMode &&
                <ScaleFade initialScale={0.9} in={!props.isOpen}>
                    <LinkBox className="HardModeButton" paddingX="1em" borderWidth='1px' bgColor="red" rounded='md'>
                        <Heading size='md' my='2'>
                            <LinkOverlay target="_blank" href='https://ko-fi.com/Y8Y0ZKQZ1'>
                                <Text>u lost this much money 😔 :</Text>
                                <Text as={props.lostValue > 20000 ? 'b' : ''} fontSize={lostValueSize(props.lostValue)}>{centsToDollars(props.lostValue)}</Text>
                                click here for your punishment
                            </LinkOverlay>
                        </Heading>
                    </LinkBox>
                </ScaleFade>}
        </div>
    );
}

export default Results;