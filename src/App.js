import './App.css';
import { Text, HStack, Select, Button, VStack } from '@chakra-ui/react';
import Results from './components/Results/Results.js';
import CardLayout from './components/CardLayout/CardLayout.js';
import { useEffect, useState } from 'react';
import fetchSets from './api/getSetCodes.js';
import getBoosterPack from './api/getBooster.js';

function App() {

  const [mtgSets, setMtgSets] = useState([]);
  const [set, setSet] = useState();
  const [booster, setBooster] = useState([]);
  const [cardState, setCardState] = useState({
    lostValue: 0,
    cards:{}
  });
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
            {mtgSets.map((set) => (<option key={set.setCode} value={set.setCode}>{set.setCode + " - " + set.setName}</option>))}
          </Select>
          <Button onClick={generatePack}>Let's Play!</Button>
        </HStack>
        <CardLayout {...cardPackage}/>
        {showResults && <Results lostValue={cardState.lostValue}/>}
      </VStack>
    </div>
  );

  function generatePack() {
    let respo;
    console.log(set);
   
    const fetchData = async () => {
      try {
        let initialCardState = {
          ...cardState,
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

      let additionalLostValue = flipNextCard ? 0 : booster[index]['cents'];
      setCardState({
        ...cardState, 
        nextAction: flipNextCard ? "RIP" : "FLIP",
        lostValue: cardState.lostValue + additionalLostValue,
        cards: {
          ...cardState.cards,
          [index]: actionTaken
        }
      })

  }
}

export default App;
