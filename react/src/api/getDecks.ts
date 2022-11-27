
export type TDeck = {
    title: string;
    cards: string[];
    _id: string;
  };

 export  async function getDecks() : Promise<TDeck> {
    const response = await fetch('http://localhost:5000/alldecks')
    return response.json()
}