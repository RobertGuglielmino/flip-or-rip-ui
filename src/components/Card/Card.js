
import './Card.css';
import { Image, Box, Text } from '@chakra-ui/react';

function Card(props) {
  return (
    <div className="Card">
        <Box>
            <Image h = '100%' src={props.image}/>
            <Text>{props.name}</Text>
            <Text>{props.price}</Text>
        </Box>
    </div>
  );
}

export default Card;
