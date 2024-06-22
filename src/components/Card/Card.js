
import './Card.css';
import foiling from './foil layer.png';
import { useState } from 'react';
import { Image, Box, Text } from '@chakra-ui/react';

function Card(props) {

  const [wasClicked, setWasClicked] = useState(false);

  function onClick() {
    setWasClicked(true);
    props.onClick();
  }

  return (
    <div onClick={onClick}>
          <Box className="Card card-package" style={{ filter: props.status === "RIP" ? "grayscale(100%) contrast(200%)" : "grayscale(0%)" }} >
            <Image paddingBottom={wasClicked ? "0em" : "3em"} src={props.image} alt="Background" className="background-image" />
            {props.isFoiled && <Image style={{filter: "opacity(65%)"}} src={foiling} alt="Overlay" className="background-image overlay-image"/>}
          </Box>
          <Text maxBlockSize="2em" textOverflow= "ellipsis">{props.name}</Text>
          <Text max-block-size="2em" >{props.price}</Text>
    </div>
  );
}

export default Card;
