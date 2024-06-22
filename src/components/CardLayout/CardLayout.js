
import './CardLayout.css';
import { lazy } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
// import Card from '../Card/Card.js';
import cardBack from './mtg_back.jpg';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

const Card = lazy(() => import('../Card/Card.js'));

function CardLayout(props) {

    const mcwFromViewport = props.isPortrait ? "20vw" : "10vw"

    // get each card
    let formattedBooster = props.cards.map((card, index) => {
        
        const status = props.cardState['cards'][index];
        let image;
        let cardText = "";
        let cardPrice = "";
        let isFoiled = false;

        function imageClickHandler() {
            if (status === "NONE") props.updateCardState(index);
        }

        switch(status) {
            case "NONE":
                image = cardBack;
                cardText = "";
                cardPrice = "";
                break;
            default:
                image = card.image;
                isFoiled = card.isFoil;
                cardText = card.name;
                cardPrice = centsToDollars(card.cents);
          }

        return <Card
                    key={index}
                    onClick = {imageClickHandler}
                    status={status}
                    name={cardText}
                    price={cardPrice}
                    image={image}
                    isFoiled={isFoiled}
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
