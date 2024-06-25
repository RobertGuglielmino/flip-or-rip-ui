
import './Card.css';
import { useEffect, useState } from 'react';
import { Image, Box, Text } from '@chakra-ui/react';
import CardEffectsContainer from './CardEffectsContainer/CardEffectsContainer';

function Card(props) {
  const [maskPosition, setMaskPosition] = useState('0px 0px');
  const [shake, setShake] = useState("");

  let ripped = props.status === "RIP";
  let cardDown = props.cardDown;
  let cardUp = props.cardUp;

  useEffect(() => {
    async function shakeTime() {
      if (ripped && (props.rarity === "rare" || props.rarity === "mythic")) {
        setShake("shake");
        await timeout(500);
        setShake("");
      }
    }

    shakeTime();
  }, [props.status]);


  return (
    <div onClick={(e) => handleImageClick(e)}>
      {
        props.clicked ?

          <>
            <CardEffectsContainer shake={shake} isDisabled="false" clicked="true" rarity={props.rarity} ripped={ripped} maskPosition={maskPosition}>
              <Box minH="fit-content" className="Card card-package">
                <Image src={cardUp.image} alt="Background" className="background-image" />
                {cardUp.isFoiled && <div className="card_picture_container" />}
              </Box>
            </CardEffectsContainer>
            <Text maxBlockSize="2em" fontSize={props.isPortrait ? "sm" : "lg"} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{cardUp.cardText}</Text>
            <Text maxBlockSize="2em" >{cardUp.cardPrice}</Text></> :

          <>
            <CardEffectsContainer shake={shake} isDisabled="true" clicked="false" rarity={props.rarity} ripped={ripped} maskPosition={maskPosition}>
              <Box minH="fit-content" className="Card card-package">
                <Image src={cardDown.image} alt="Background" className="background-image" />
              </Box>
            </CardEffectsContainer>
            <Box h="3em" />
          </>
      }
    </div>
  );

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  function handleImageClick(event) {
    if (!props.clicked) {
      const { offsetX, offsetY, target } = event.nativeEvent;
      const xPercent = (offsetX / target.clientWidth) * 100;
      const yPercent = 100 - ((offsetY / target.clientHeight) * 100);
      setMaskPosition(`${xPercent}% ${yPercent}%`);

      props.imageClickHandler();
    }
  };
}

export default Card;
