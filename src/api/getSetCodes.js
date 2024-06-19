
async function fetchSets() {

    const response = await fetch('https://api.scryfall.com/sets');
    const data = await response.json();

    const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny','remastered'];
     
    // Filter sets that can be purchased as packs
    const packSets = data.data.filter(set => packSetTypes.includes(set.set_type)).filter(set => set.code.length === 3).map((set) => {
      return {
        setCode: set.code.toUpperCase(),
        setName: set.name
      }
    });

    return packSets;

}

export default fetchSets;