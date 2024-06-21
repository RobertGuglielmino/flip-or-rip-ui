import './App.css';
import { Text, HStack, Select, Button, VStack } from '@chakra-ui/react';
import Results from './components/Results/Results.js';
import CardLayout from './components/CardLayout/CardLayout.js';
import { useEffect, useState } from 'react';
import fetchSets from './api/getSetCodes.js';
import getBoosterPack from './api/getBooster.js';
import packTypesJson from './packTypes.json';

//https://www.npmjs.com/package/react-native-color-matrix-image-filters

function App() {

  const [mtgSets, setMtgSets] = useState([]);
  const [packData, setPackData] = useState({
    set: "",
    boosterType: ""
  });
  const [booster, setBooster] = useState([]);
  const [cardState, setCardState] = useState({
    cardsTouched: 0,
    lostValue: 0,
    cards:{}
  });
  const [showResults, setShowResults] = useState(false);
  const [hardMode, setHardMode] = useState(false);
    
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
        {/* <Button key="hard" isDisabled={hardMode} onClick={() => setHardMode(true)} bgColor="red">Hard Mode</Button> */}
        <HStack>
          <Select
            value={packData.set}
            onChange={e => setPackData({...packData, set: e.target.value})}>
            {mtgSets.map((set) => (<option key={set.setCode} value={set.setCode}>{set.setCode + " - " + set.setName}</option>))}
          </Select>
          <Select
            isDisabled={packData.set === ""}
            value={packData.boosterType}
            placeholder='Pick a booster type!'
            onChange={e => setPackData({...packData, boosterType: e.target.value})}>
            {packData.set === "" ? <option key="-" value="-">-</option> : generateSetTypes(packData.set)}
          </Select>
          <Button onClick={generatePack}>Let's Play!</Button>
        </HStack>
        <CardLayout {...cardPackage}/>
        {showResults && <Results lostValue={cardState.lostValue}/>}
        {/* {hardMode && cardState.cardsTouched === cardState.cards.length && <a href='https://ko-fi.com/Y8Y0ZKQZ1' target='_blank'><img height='36' className='kofi' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>} */}
      </VStack>
    </div>
  );

  function generateSetTypes(set) {
    return packTypesJson[set].map(type => (<option key={type} value={type}>{formatBoosterType(type)}</option>))
  }

  function formatBoosterType(type) {
    const words = type.split("-");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    words.join(" ");

    return words;
  }

  function generatePack() {
    let respo;

    const fetchData = async () => {
      try {
        let initialCardState = {
          ...cardState,
          cardsTouched: 0,
          nextAction: "FLIP",
          cards: {}
        };
        respo = await getBoosterPack(packData);
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
        cardsTouched: cardState.cardsTouched+1,
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
