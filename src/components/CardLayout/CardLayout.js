
import './CardLayout.css';
import { lazy } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
// import Card from '../Card/Card.js';
import cardBack from './mtg_back.png';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

const Card = lazy(() => import('../Card/Card.js'));


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
            image: card.cf_image, //"https://d3vjinhen5j20w.cloudfront.net/{uuid}.jpg"
            cardText: card.name,
            cardPrice: centsToDollars(card.cents),
            isFoiled: card.isFoil,
        }
        let cardPropertiesPackage = {
            imageClickHandler: imageClickHandler,
            shake: cardData.shake,
            rarity: card.rarity,
            clicked: cardData.clicked,
            status: cardData.status,
            isPortrait: props.isPortrait,
        }
        function imageClickHandler() {
            if (cardData.status === "NONE") props.updateCardState(index);
        }

        return <Card
                    key={index}
                    {...cardPropertiesPackage}
                    cardDown={cardDown}
                    cardUp={cardUp}
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
