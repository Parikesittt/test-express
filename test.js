import mongoose from "mongoose";

const uri = "mongodb+srv://parikesitwidodo_db_user:M8JPD5g8aJrN6EVv@cluster0.eatljww.mongodb.net/appdb?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("CONNECTED SUCCESS");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILED:", err);
    process.exit(1);
  });