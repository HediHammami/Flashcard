import { TDeck } from "./getDecks";

export async function deleteCard(
  deckId: string,
  index: number
): Promise<TDeck> {
  const response = await fetch(`http://localhost:5000/decks/${deckId}/cards/${index}`, {
    method: "DELETE",
  });
  return response.json();
}