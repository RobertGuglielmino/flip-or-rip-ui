
import './CardLayout.css';
import { lazy, memo } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
// import Card from '../Card/Card.js';
import cardBack from './mtg_back.png';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

const Card = lazy(() => import('../Card/Card.js'));

const memoCard = memo(Card);

function CardLayout(props) {

    const mcwFromViewport = props.isPortrait ? "20vw" : "10vw"

    // get each card
    let formattedBooster = props.cards.map((card, index) => {
        
        const cardData = props.cardState['cards'][index];
        let cardDown = {
            image: cardBack,
            cardText:"",
            cardPrice: "",
            isFoiled: false,
        }
        let cardUp = {
            image: card.image, //"https://d3vjinhen5j20w.cloudfront.net/{uuid}.jpg"
            cardText: card.name,
            cardPrice: centsToDollars(card.cents),
            isFoiled: card.isFoil,
        }
        function imageClickHandler() {
            if (cardData.status === "NONE") props.updateCardState(index);
        }

          //absolutey grooss
        return <Card
                    key={index}
                    imageClickHandler = {imageClickHandler}
                    shake={cardData.shake}
                    cardDown={cardDown}
                    cardUp={cardUp}
                    clicked={cardData.clicked}
                    status={cardData.status}
                    isPortrait={props.isPortrait}
                    />;
    })

    return (
        <div className="CardLayout">
            <Box paddingTop="1em" paddingX="2vw">
                <SimpleGrid spacingY="0px" minChildWidth={mcwFromViewport} gap="1vw">
                    {formattedBooster}
                </SimpleGrid>
            </Box>
        </div>
    );
}

export default CardLayout;
