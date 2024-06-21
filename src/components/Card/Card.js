
import './Card.css';
import foiling from './foil layer.png';
import { Image, Box, Text } from '@chakra-ui/react';

function Card(props) {
  return (
    <div className="Card">
        <Box>
          <Box style={{ filter: props.status === "RIP" ? "grayscale(100%)" : "grayscale(0%)" }} className="card-package">
            <Image boxSize = '100px' src={props.image} alt="Background" className="background-image" />
            {props.isFoiled && <Image src={foiling} alt="Overlay" className="background-image overlay-image"/>}
          </Box>
            <Text>{props.name}</Text>
            <Text>{props.price}</Text>
        </Box>
    </div>
  );
}

export default Card;
