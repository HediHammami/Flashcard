import mongoose from "mongoose"

const deckSchema = mongoose.Schema( {
   
    title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      cards : [String]

}, { timestamps : true})

const Deck = mongoose.model("Deck" , deckSchema)
export default Deck