
import './CardLayout.css';
import { Suspense, lazy } from 'react';
import { GridItem, Grid, Spinner } from '@chakra-ui/react';
// import Card from '../Card/Card.js';
import cardBack from './mtg_back.jpg';
import ripCommon from './ripCommon.png';
import ripUncommon from './ripUncommon.png';
import ripRare from './ripRare.png';
import ripMythic from './ripMythic.png';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

const Card = lazy(() => import('../Card/Card.js'));

function CardLayout(props) {

    // get each card
    let formattedBooster = props.cards.map((card, index) => {
        
        const status = props.cardState['cards'][index];
        let image;
        let cardText;
        let cardPrice;
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
                image = status === "RIP" ? chooseDeadRarityImage(card) : card.image;
                isFoiled = card.isFoiled;
                cardText = card.name;
                cardPrice = centsToDollars(card.cents);
          }

        return <GridItem 
                    onClick = {imageClickHandler}
                    key={index} rowSpan={1} colSpan={1} w='100%' h='100%'>
                    <Card h = '100%' w = '100%'
                        name={cardText}
                        price={cardPrice}
                        image={image}
                        isFoiled={isFoiled}
                        />
                </GridItem>;
    })

    return (
        <div className="CardLayout">
                <Grid templateRows='repeat(2, 1fr)'templateColumns='repeat(8, 1fr)' gap={6}>
                    {formattedBooster}
                </Grid>
        </div>
    );
}

function chooseDeadRarityImage(card) {
    switch (card.rarity) {
        case "common":
            return ripCommon;
        case "uncommon":
            return ripUncommon;
        case "rare":
            return ripRare;
        case "mythic":
            return ripMythic;
        default:
            return ripCommon;
    }
}

export default CardLayout;
