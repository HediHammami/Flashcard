
import { TDeck } from "./getDecks";

export async function getDeck(deckId: string): Promise<TDeck> {
  const response = await fetch(`http://localhost:5000/deck/${deckId}`);
  return response.json();
}