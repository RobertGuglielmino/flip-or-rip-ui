
import './Card.css';
import foiling from './foil layer.png';
import { Image, Box, Text } from '@chakra-ui/react';

function Card(props) {

  return (
    <div onClick={props.onClick}>
          <Box minH="fit-content" className="Card card-package" style={{ filter: props.status === "RIP" ? "grayscale(100%) contrast(200%)" : "grayscale(0%)" }} >
            <Image src={props.image} alt="Background" className="background-image" />
            {props.isFoiled && <Image object-fit="fill" src={foiling} alt="Overlay" className="background-image overlay-image"/>}
          </Box>
          <Box h={props.status === "NONE"  ? "3em" : "0em"} />
          <Text maxBlockSize="2em" fontSize={props.isPortrait ? "sm" : "lg"} overflow="hidden" whiteSpace="nowrap" textOverflow= "ellipsis">{props.name}</Text>
          <Text maxBlockSize="2em" >{props.price}</Text>
    </div>
  );
}

export default Card;
