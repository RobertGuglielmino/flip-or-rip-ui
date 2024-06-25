
import './Card.css';
import foiling from './foil layer.png';
import { useEffect, useState } from 'react';
import rip from './rip1.jpg';
import back from './mtg_back.jpg';
import { Image, Box, Text } from '@chakra-ui/react';
import CardEffectsContainer from './CardEffectsContainer/CardEffectsContainer';

function Card(props) {
  let cardData = props.cardData;
  let untouched = props.status === "NONE"
  let ripped = props.status === "RIP";
  let flipped = props.status === "FLIP";
  let cardDown = props.cardDown;
  let cardUp = props.cardUp;

  const [maskPosition, setMaskPosition] = useState('0px 0px');

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  useEffect(() => {
  }, [props.clicked]);

  const handleImageClick = async (event) => {
    if (!props.clicked) {
      const { offsetX, offsetY, target } = event.nativeEvent;
      const xPercent = (offsetX / target.clientWidth) * 100;
      const yPercent = 100 - ((offsetY / target.clientHeight) * 100);
      setMaskPosition(`${xPercent}% ${yPercent}%`);

      props.imageClickHandler(0);
      if (props.rarity === "rare") {
        // setShake("shake");
        // await timeout(100);
        // setShake("");
      }
    }
  };


  return (
    <div className={props.shake} isdisabled={props.clicked} onClick={(e) => handleImageClick(e)}>
      {
        props.clicked ?

          <>
            <CardEffectsContainer clicked={props.clicked} ripped={ripped} maskPosition={maskPosition}>
              <Box minH="fit-content" className="Card card-package">
                <Image src={cardUp.image} alt="Background" className="background-image" />
                {cardUp.isFoiled && <div className="card_picture_container" />}
              </Box>
            </CardEffectsContainer>
            <Text maxBlockSize="2em" fontSize={props.isPortrait ? "sm" : "lg"} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{cardUp.cardText}</Text>
            <Text maxBlockSize="2em" >{cardUp.cardPrice}</Text></> :

          <>
            <CardEffectsContainer clicked={props.clicked} ripped={ripped} maskPosition={maskPosition}>
              <Box minH="fit-content" className="Card card-package">
                <Image src={cardDown.image} alt="Background" className="background-image" />
              </Box>
            </CardEffectsContainer>
            <Box h="3em" />
          </>
      }
    </div>
  );
}

export default Card;
