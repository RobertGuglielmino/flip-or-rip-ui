
import './Card.css';
import foiling from './foil layer.png';
import { Image, Box, Text } from '@chakra-ui/react';

function Card(props) {
  return (
    <div className="Card">
        <Box>
          <Box>
            <Image h = '100%' src={props.image} alt="Background" className="background-image" />
            {props.isFoiled && <Image h = '100%' src={foiling} alt="Overlay" className="overlay-image"/>}
          </Box>
            <Text>{props.name}</Text>
            <Text>{props.price}</Text>
        </Box>
    </div>
  );
}

export default Card;
