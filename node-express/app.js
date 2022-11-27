import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import Deck from "./models/Deck.js";
import { createCardForDeckController } from "./controllers/createCard.js";
import { deleteCardOnDeckController } from "./controllers/deleteCard.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

//Create a deck
app.post('/deck' , async (req,res) => {
    try{
       const newDeck = new Deck({
           title:req.body.title,
           body:req.body.body,
           data: Date.now()
       })
         const response = await newDeck.save()
         res.json(response)
    }catch(err){
       res.status(500).json({ error: err.message });
    }
})

//Get all decks
app.get("/alldecks", async (req, res) => {
      try {
        const deck = await Deck.find()
        res.json(deck)
      }catch(err){
        res.status(500).json({ error: err.message });
      }
});

//Get by id
app.get('/deck/:id' , async (req,res) => {
    try{
        const deck = await Deck.findById(req.params.id);
        res.json(deck)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update a deck
app.patch("/deck/:id" , async (req,res) => {
       try {
          const deck = await Deck.findByIdAndUpdate(req.params.id , req.body ,{
            new : true
          })
          res.json(deck)
       }catch(err){
        res.status(500).json({ error: err.message });
       }
})

//Delete a deck
app.delete("/deck/:id" , async (req,res) => {
    try {
       const deck = await Deck.findByIdAndDelete(req.params.id)
       res.json(`${deck} has been deleted`)
    }catch(err){
     res.status(500).json({ error: err.message });
    }
})

app.post("/decks/:deckId/cards" , createCardForDeckController)
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected To DB"))
  .then(() => {
    app.listen(port, () => console.log(`server in running on port ${port}...`));
  })
  .catch((error) => console.log(error));
