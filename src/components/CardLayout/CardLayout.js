
import './CardLayout.css';
import { GridItem, Grid } from '@chakra-ui/react';
import Card from '../Card/Card.js';
import { useState } from 'react';

function CardLayout(props) {

    console.log("yes");
    console.log(props.cards)



    
    const testCards = [{'name': 'Evolving Wilds', 'foil': false, 'dollars': 0, 'cents': 8, 'image': 'https://cards.scryfall.io/png/front/7/e/7e5b3834-2bef-4685-972f-64852dd71aa4.png?1712355006'}, {'name': 'Island', 'foil': false, 'dollars': 0, 'cents': 0, 'image': 'https://cards.scryfall.io/png/front/6/4/64daf0ac-678b-4683-9351-a6daf9c9f849.png?1717013916'}, {'name': 'Kick in the Door', 'foil': false, 'dollars': 0, 'cents': 3, 'image': 'https://cards.scryfall.io/png/front/2/2/222102d0-fed3-41fd-87b0-f6d22766d7fd.png?1627706518'}, {'name': 'Elturgard Ranger', 'foil': false, 'dollars': 0, 'cents': 2, 'image': 'https://cards.scryfall.io/png/front/f/6/f6898737-957f-44a6-bef7-fb196658176f.png?1627707474'}]

    let initialCardState = {};
    testCards.forEach((_, index) => (
        initialCardState[index] = "NONE"
    ))

    const [cardState, setCardState] = useState(initialCardState);

    console.log(cardState);

    //pass to each 

    function updateCardState(ia, status) {
        setCardState({...cardState, ia: status})
    }

    // get each card
    let formattedBooster = testCards.map((card, index) => (
      <GridItem key={index} rowSpan={1} colSpan={1} w='100%' h='100%'>
        <Card image={card.image}
              name={card.name}
              price={card.cents}/>
      </GridItem>
    ))

    console.log(formattedBooster);

    return (
        <div className="CardLayout">
            <Grid h='200px' templateRows='repeat(2, 1fr)'templateColumns='repeat(8, 1fr)' gap={6}>
                {formattedBooster}
            </Grid>
        </div>
    );
    }

export default CardLayout;
