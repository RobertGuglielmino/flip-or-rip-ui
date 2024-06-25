import './App.css';
import { Flex, Text, HStack, Select, Button, VStack, useDisclosure, Image, Center } from '@chakra-ui/react';
import Results from './components/Results/Results.js';
import CardLayout from './components/CardLayout/CardLayout.js';
import HardMode from './components/HardMode/HardMode.js';
import { useEffect, useState } from 'react';
import fetchSets from './api/getSetCodes.js';
import getBoosterPack from './api/getBooster.js';
import packTypesJson from './packTypes.json';
import { useMediaQuery } from 'react-responsive'
import cardBack from './mtg_back.jpg';

// better device ideas
//https://stackoverflow.com/questions/59957272/change-text-depending-on-what-device-its-viewed-from

function App() {

  const [mtgSets, setMtgSets] = useState([]);
  const [packData, setPackData] = useState({
    set: "",
    boosterType: ""
  });
  const [booster, setBooster] = useState([]);
  const [cardState, setCardState] = useState({
    cardsTouched: 0,
    savedValue: 0,
    lostValue: 0,
    cards: {}
  });
  const [showResults, setShowResults] = useState(false);
  const [hardMode, setHardMode] = useState(false);
  const { isOpen, onToggle } = useDisclosure()
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

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
    updateCardState,
    isPortrait
  }

  let hardModePackage = {
    hardMode,
    isOpen,
    lostValue: cardState.lostValue
  }

  // could rework selects to not be awful
  return (
    <div h="100%" w="100vw" className="App">
      <Flex grow={1} justifyContent="end"direction="column" className="wrapper">
        <VStack maxWidth="100vw" >
          <Text fontSize="3xl">Flip Or Rip Dot Com</Text>
          {/* <Button key="hard" isDisabled={hardMode} onClick={() => setHardMode(true)} bgColor="red">Hard Mode</Button> */}
          <HStack>
            <Select
              value={packData.set}
              placeholder='Pick a Magic Set!'
              maxWidth="fit-content"
              onChange={e => setPackData({ ...packData, set: e.target.value })}>
              {mtgSets.map((set) => (<option key={set.setCode} value={set.setCode}>{isPortrait ? set.setCode : set.setCode + " - " + set.setName}</option>))}
            </Select>
            <Select
              isDisabled={packData.set === ""}
              value={packData.boosterType}
              placeholder='Pick a booster type!'
              maxWidth={isPortrait ? "25vw" : "fit-content"}
              onChange={e => setPackData({ ...packData, boosterType: e.target.value })}>
              {packData.set === "" ? <option key="-" value="-">-</option> : generateSetTypes(packData.set)}
            </Select>
            <Button
              maxWidth="fit-content"
              onClick={generatePack}>{isPortrait ? "Open!" : "Open the Pack!"}</Button>
          </HStack>
        </VStack>
        <CardLayout {...cardPackage} />
        {showResults && <Results lostValue={cardState.lostValue} />}
        {/* {showResults && <Results lostValue={cardState.savedValue}/>} */}
        <Center>
          {hardMode && <HardMode {...hardModePackage} />}
        </Center>
      </Flex>
      {/* <footer className="footer">yes</footer> */}
    </div>
  );

  // https://storage.ko-fi.com/cdn/kofi3.png?v=3

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
    onToggle();
    const start = Date.now();
    console.log("started pack generation!");
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
          initialCardState['cards'][index] = {
            status: "NONE",
            clicked: false,
            shake: false
          }
        ))
        console.log(cards);
        setCardState(initialCardState);
        setBooster(cards);
        console.log("fetched");
        console.log((Date.now() - start) + "ms to complete ");

      } catch (error) {
        console.log("failed at generating booster!");
        console.log(error);
      }
    }
    setShowResults(true);
    fetchData();
  }

  function updateCardState(index) {
    if (cardState.cardsTouched === booster.length - 1) onToggle();

    let actionTaken = cardState.nextAction;
    let flipNextCard = cardState.nextAction === "FLIP";
    // if flip, add card to list and show
    // if rip, show name, ripped card, and value

    let additionalLostValue = flipNextCard ? 0 : booster[index]['cents'];
    let additionalSavedValue = !flipNextCard ? 0 : booster[index]['cents'];
    
    setCardState({
      ...cardState,
      cardsTouched: cardState.cardsTouched + 1,
      nextAction: flipNextCard ? "RIP" : "FLIP",
      savedValue: cardState.savedValue + additionalSavedValue,
      lostValue: cardState.lostValue + additionalLostValue,
      cards: {
        ...cardState.cards,
        [index]: {
          status: actionTaken,
          clicked: true,
          shake: true
        }
      }
    })
  }
}

export default App;
