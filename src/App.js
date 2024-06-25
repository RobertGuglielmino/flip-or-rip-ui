import './App.css';
import { Flex, HStack, Select, Button, VStack, useDisclosure, Center, Spinner } from '@chakra-ui/react';
import Results from './components/Results/Results.js';
import HelperHeader from './components/HelperHeader/HelperHeader.js';
// import CardLayout from './components/CardLayout/CardLayout.js';
import { Suspense, lazy, useEffect, useState } from 'react';
import fetchSets from './api/getSetCodes.js';
import getBoosterPack from './api/getBooster.js';
import packTypesJson from './packTypes.json';
import { useMediaQuery } from 'react-responsive'

const CardLayout = lazy(() => import('./components/CardLayout/CardLayout.js'));

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
    nextAction: "Flip Or Rip Dot Com",
    cards: {}
  });
  const [showResults, setShowResults] = useState(false);
  const [hardMode, setHardMode] = useState(false);
  const [loading, setLoading] = useState(false);
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
    onToggle();
  }, []);

  let cardPackage = {
    cards: booster,
    cardState,
    updateCardState,
    isPortrait
  }

  // could rework selects to not be awful
  return (
    <div h="100%" w="100vw" className="App">
      <Flex grow={1} justifyContent="end" direction="column" className="wrapper">
        <HelperHeader status={cardState.nextAction} isLoaded={showResults} hardMode={hardMode} setHardMode={updateHardModeForButton} />
        {/* <Button onClick={onToggle}>Click Me</Button> */}
        <VStack maxWidth="100vw" >
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
              placeholder={isPortrait ? "Booster" : 'Pick a booster type!'}
              maxWidth={isPortrait ? "25vw" : "fit-content"}
              onChange={e => setPackData({ ...packData, boosterType: e.target.value })}>
              {packData.set === "" ? <option key="-" value="-">-</option> : generateSetTypes(packData.set)}
            </Select>
            <Button
              maxWidth="fit-content"
              isDisabled={loading}
              bgColor="green"
              onClick={generatePack}>
              {loading ?
                <Spinner /> :
                isPortrait ?
                  "Open!" :
                  "Open the Pack!"}
            </Button>
          </HStack>
        </VStack>
        <Suspense fallback={<Spinner />}>
          <CardLayout {...cardPackage} />
        </Suspense>
        <Center>
          {showResults && <Results hardMode={hardMode} lostValue={cardState.lostValue} isOpen={isOpen} />}
        </Center>
      </Flex>
    </div>
  );
  // {/* {showResults && <Text>{centsToDollars(cardState.savedValue)}</Text>} */ }

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
    const start = Date.now();
    setLoading(true);
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
      setLoading(false);
    }
    setShowResults(true);
    fetchData();
  }

  // function updateHardMode() {
  //   if (hardMode && (cardState.cardsTouched >= booster.length - 1)) onToggle();
  // }
  function updateHardModeForButton() {
    setHardMode(true);
    // if (hardMode && (cardState.cardsTouched >= booster.length - 1)) onToggle();
  }

  function updateCardState(index) {
    // if (cardState.cardsTouched === 1) onToggle();
    if (hardMode && cardState.cardsTouched === booster.length - 1) onToggle();
    // updateHardMode();

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
