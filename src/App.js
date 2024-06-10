import logo from './logo.svg';
import './App.css';
import { Text, HStack, Select, Button, GridItem } from '@chakra-ui/react';
import Card from './components/Card/Card.js';
import CardLayout from './components/CardLayout/CardLayout.js';
import { useState, useEffect } from 'react';

function App() {

  const testCards = [{'name': 'Evolving Wilds', 'foil': false, 'dollars': 0, 'cents': 8, 'image': 'https://cards.scryfall.io/png/front/7/e/7e5b3834-2bef-4685-972f-64852dd71aa4.png?1712355006'}, {'name': 'Island', 'foil': false, 'dollars': 0, 'cents': 0, 'image': 'https://cards.scryfall.io/png/front/6/4/64daf0ac-678b-4683-9351-a6daf9c9f849.png?1717013916'}, {'name': 'Kick in the Door', 'foil': false, 'dollars': 0, 'cents': 3, 'image': 'https://cards.scryfall.io/png/front/2/2/222102d0-fed3-41fd-87b0-f6d22766d7fd.png?1627706518'}, {'name': 'Elturgard Ranger', 'foil': false, 'dollars': 0, 'cents': 2, 'image': 'https://cards.scryfall.io/png/front/f/6/f6898737-957f-44a6-bef7-fb196658176f.png?1627707474'}]

  const [set, setSet] = useState();
  const [booster, setBooster] = useState(testCards);
  const [formattedBooster, setFormattedBooster] = useState();

  console.log(booster);


  let setOptions = ["KTK", "AFR"];

  let setValuesFormatted = setOptions.map((set) => (<option value={set}>{set}</option>))

  return (
    <div className="App">
      <Text>Flip Or Rip Dot Com</Text>
      <form></form>
      <HStack>
        <Select value={set} onChange={e => setSet(e.target.value)} placeholder='Select option'>
          {setValuesFormatted}
        </Select>
        <Button onClick={generatePack}>Let's Play!</Button>
      </HStack>
      <CardLayout cards={booster}/>
    </div>
  );

  function generatePack() {

    setBooster(testCards);
  
  }
}

export default App;
