
import './CardLayout.css';
import { lazy } from 'react';
import { GridItem, Grid } from '@chakra-ui/react';
// import Card from '../Card/Card.js';
import cardBack from './mtg_back.jpg';
import redX from './redX.png';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

const Card = lazy(() => import('../Card/Card.js'));

function CardLayout(props) {

    // get each card
    let formattedBooster = props.cards.map((card, index) => {
        
        const status = props.cardState['cards'][index];
        let image;
        let cardText;
        let cardPrice;

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
                image = status === "RIP" ? redX : card.image;
                cardText = card.name;
                cardPrice = centsToDollars(card.cents);
          }

        return <GridItem 
                    onClick = {imageClickHandler}
                    key={index} rowSpan={1} colSpan={1} w='100%' h='100%'>
                    <Card image={image}
                        name={cardText}
                        price={cardPrice}
                        w = '100%'
                        h = '100%'
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

export default CardLayout;
