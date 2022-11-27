import Deck from "../models/Deck.js"


export async function deleteCardOnDeckController(req, res) {
  const deckId = req.params.deckId;
  const index = req.params.index;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("no deck of this id exists");
  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}