import './App.css';
import { Text, HStack, Select, Button, VStack } from '@chakra-ui/react';
import Results from './components/Results/Results.js';
import CardLayout from './components/CardLayout/CardLayout.js';
import { useEffect, useState } from 'react';
import fetchSets from './api/getSetCodes.js';
import getBoosterPack from './api/getBooster.js';

function App() {

  // const testCards = [{'name': 'Evolving Wilds', 'foil': false, 'dollars': 0, 'cents': 202, 'image': 'https://cards.scryfall.io/png/front/7/e/7e5b3834-2bef-4685-972f-64852dd71aa4.png?1712355006'}, {'name': 'Island', 'foil': false, 'dollars': 0, 'cents': 1220, 'image': 'https://cards.scryfall.io/png/front/6/4/64daf0ac-678b-4683-9351-a6daf9c9f849.png?1717013916'}, {'name': 'Kick in the Door', 'foil': false, 'dollars': 0, 'cents': 3, 'image': 'https://cards.scryfall.io/png/front/2/2/222102d0-fed3-41fd-87b0-f6d22766d7fd.png?1627706518'}, {'name': 'Elturgard Ranger', 'foil': false, 'dollars': 0, 'cents': 2, 'image': 'https://cards.scryfall.io/png/front/f/6/f6898737-957f-44a6-bef7-fb196658176f.png?1627707474'}]

  const [mtgSets, setMtgSets] = useState([]);
  const [set, setSet] = useState();
  const [booster, setBooster] = useState([]);
  const [cardState, setCardState] = useState({cards:{}});
  const [lostValue, setLostValue] = useState(0);
  const [showResults, setShowResults] = useState(false);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSets = await fetchSets();
        setMtgSets(fetchedSets);
      } catch (error) {
        console.log("failed at fetching set names!");
      }
    }

    fetchData();
  }, []);

  
  let cardPackage = {
    cards: booster,
    cardState,
    updateCardState
  }

  return (
    <div className="App">
      <VStack>
        <Text fontSize="3xl">Flip Or Rip Dot Com</Text>
        <HStack>
          <Select value={set} onChange={e => setSet(e.target.value)}>
            {mtgSets.map((set) => (<option key={set} value={set}>{set}</option>))}
          </Select>
          <Button onClick={generatePack}>Let's Play!</Button>
        </HStack>
        <CardLayout {...cardPackage}/>
        {showResults && <Results lostValue={lostValue}/>}
      </VStack>
    </div>
  );

  function generatePack() {
    let respo;
    console.log(set);
   
    const fetchData = async () => {
      try {
        let initialCardState = {
          nextAction: "FLIP",
          cards: {}
        };
        respo = await getBoosterPack(set);
        let cards = respo['body']['cards'];
        cards.forEach((_, index) => (
            initialCardState['cards'][index] = "NONE"
        ))
        console.log(cards);
        setCardState(initialCardState);
        setBooster(cards);
        console.log("fetched");
      } catch (error) {
        console.log("failed at generating booster!");
        console.log(error);
      }
    }
    setShowResults(true);
    fetchData();
  }

  function updateCardState(index) {
    
      let actionTaken = cardState.nextAction;
      let flipNextCard = cardState.nextAction === "FLIP";
      // if flip, add card to list and show
      // if rip, show name, ripped card, and value
      setCardState({
        ...cardState, 
        nextAction: flipNextCard ? "RIP" : "FLIP",
        cards: {
          ...cardState.cards,
          [index]: actionTaken
        }
      })

      if (!flipNextCard) updateRippedCards(index);
  }

  function updateRippedCards(index) {
    setLostValue(lostValue + booster[index]['cents']);
  }
}

export default App;
