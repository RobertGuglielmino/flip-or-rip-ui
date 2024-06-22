import './Results.css';
import { Box, Text } from '@chakra-ui/react';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

function Results(props) {

    const sizeScaling= ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]

    function lostValueSize(amount) {
        let index = Math.floor(Math.log(amount)) >= sizeScaling.length ? sizeScaling.length-1 : Math.floor(Math.log(amount));
        return sizeScaling[index]
    }
    

    return (
        <div className="Results">
            <Box paddingTop="0px" >
                <Text>u lost this much money 😔 :</Text>
                <Text as={props.lostValue > 20000 ? 'b' : ''} fontSize={lostValueSize(props.lostValue)}>{centsToDollars(props.lostValue)}</Text>
                {/* <a href='https://ko-fi.com/Y8Y0ZKQZ1' target='_blank'><img height='36' className='kofi' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> */}
            </Box>
        </div>
    );
}

// as='b' as 'u'
// ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]

export default Results;